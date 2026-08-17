// NCES School District Locator API
// https://nces.ed.gov/programs/edge/Geographic/DistrictLocator

export interface DistrictMatch {
  ncesId: string;
  name: string;
  state: string;
  leaType: string;
  boundaryUrl?: string;
}

export async function findDistrictByCoordinates(
  latitude: number,
  longitude: number
): Promise<DistrictMatch | null> {
  try {
    // NCES EDGE API for point-in-polygon district lookup
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      year: '2023', // Most recent available
    });

    const response = await fetch(
      `https://nces.ed.gov/programs/edge/Geographic/DistrictLocator?${params}`,
      { next: { revalidate: 86400 } }
    );

    if (!response.ok) {
      throw new Error(`NCES district locator failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.results?.[0]) {
      return null;
    }

    const district = data.results[0];
    
    return {
      ncesId: district.LEAID,
      name: district.LEA_NAME,
      state: district.STATE,
      leaType: district.LEA_TYPE,
      boundaryUrl: district.BOUNDARY_URL,
    };
  } catch (error) {
    console.error('District lookup error:', error);
    return null;
  }
}
