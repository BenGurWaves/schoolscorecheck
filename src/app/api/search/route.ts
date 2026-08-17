import { NextRequest, NextResponse } from 'next/server';
import { geocodeAddress } from '@/lib/nces/geocoder';
import { findDistrictByCoordinates } from '@/lib/nces/district-locator';
import { fetchDistrictData, fetchSchoolsInDistrict } from '@/lib/nces/ccd-api';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    
    if (!address || typeof address !== 'string') {
      return NextResponse.json(
        { error: 'Valid address is required' },
        { status: 400 }
      );
    }

    // Step 1: Geocode the address
    const geocodeResult = await geocodeAddress(address);
    if (!geocodeResult) {
      return NextResponse.json(
        { error: 'Could not geocode address. Please check the address and try again.' },
        { status: 404 }
      );
    }

    // Step 2: Find school district by coordinates
    const district = await findDistrictByCoordinates(
      geocodeResult.latitude,
      geocodeResult.longitude
    );
    if (!district) {
      return NextResponse.json(
        { error: 'Could not find school district for this address.' },
        { status: 404 }
      );
    }

    // Step 3: Check cache for district data
    const supabase = await createClient();
    const { data: cachedDistrict, error: cacheError } = await supabase
      .from('district_cache')
      .select('*')
      .eq('nces_district_id', district.ncesId)
      .single();

    let districtData;
    const now = new Date();
    const cacheAge = cachedDistrict 
      ? (now.getTime() - new Date(cachedDistrict.last_fetched).getTime()) / (1000 * 60 * 60 * 24)
      : Infinity;

    if (cachedDistrict && cacheAge < 1) {
      // Use cached data (less than 24 hours old)
      districtData = cachedDistrict.district_data;
    } else {
      // Fetch fresh data
      districtData = await fetchDistrictData(district.ncesId);
      if (!districtData) {
        return NextResponse.json(
          { error: 'Could not fetch district data from NCES.' },
          { status: 500 }
        );
      }

      // Update cache
      if (cachedDistrict) {
        await supabase
          .from('district_cache')
          .update({ district_data: districtData, last_fetched: now.toISOString() })
          .eq('nces_district_id', district.ncesId);
      } else {
        await supabase
          .from('district_cache')
          .insert({
            nces_district_id: district.ncesId,
            district_data: districtData,
            last_fetched: now.toISOString(),
          });
      }
    }

    // Step 4: Fetch schools in district
    const schools = await fetchSchoolsInDistrict(district.ncesId);

    return NextResponse.json({
      address: geocodeResult,
      district: {
        ...district,
        ...districtData,
      },
      schools,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching for school data.' },
      { status: 500 }
    );
  }
}
