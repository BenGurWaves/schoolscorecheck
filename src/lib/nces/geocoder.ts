// U.S. Census Geocoder - Free API for address geocoding
// https://geocoding.geo.census.gov/geocoder/

export interface GeocodeResult {
  address: string;
  latitude: number;
  longitude: number;
  state: string;
  county: string;
  censusTract?: string;
}

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  try {
    const params = new URLSearchParams({
      benchmark: 'Public_AR_Current',
      format: 'json',
      address: address,
    });

    const response = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${params}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!response.ok) {
      throw new Error(`Census geocoder failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.result?.addressMatches?.[0]) {
      return null;
    }

    const match = data.result.addressMatches[0];
    const coordinates = match.coordinates;
    
    return {
      address: match.matchedAddress,
      latitude: parseFloat(coordinates.y),
      longitude: parseFloat(coordinates.x),
      state: match.addressComponents.state,
      county: match.addressComponents.county,
      censusTract: match.addressComponents.censusTract,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}
