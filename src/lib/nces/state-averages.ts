// State average data for comparison
// In production, this would be fetched from state education departments or NCES aggregates

export interface StateAverages {
  state: string;
  studentTeacherRatio: number;
  freeReducedLunchPercent: number;
  readingProficiency: number;
  mathProficiency: number;
  graduationRate: number;
  lastUpdated: string;
}

// Cache of state averages (would be fetched from database in production)
const stateAveragesCache: Record<string, StateAverages> = {
  'CA': {
    state: 'CA',
    studentTeacherRatio: 21.5,
    freeReducedLunchPercent: 59.0,
    readingProficiency: 47.0,
    mathProficiency: 40.0,
    graduationRate: 84.0,
    lastUpdated: '2023-09-01',
  },
  'TX': {
    state: 'TX',
    studentTeacherRatio: 14.5,
    freeReducedLunchPercent: 60.0,
    readingProficiency: 42.0,
    mathProficiency: 41.0,
    graduationRate: 89.0,
    lastUpdated: '2023-09-01',
  },
  'NY': {
    state: 'NY',
    studentTeacherRatio: 13.8,
    freeReducedLunchPercent: 50.0,
    readingProficiency: 45.0,
    mathProficiency: 44.0,
    graduationRate: 86.0,
    lastUpdated: '2023-09-01',
  },
  'FL': {
    state: 'FL',
    studentTeacherRatio: 16.0,
    freeReducedLunchPercent: 55.0,
    readingProficiency: 52.0,
    mathProficiency: 55.0,
    graduationRate: 87.0,
    lastUpdated: '2023-09-01',
  },
};

export function getStateAverages(state: string): StateAverages | null {
  return stateAveragesCache[state] || null;
}

export function compareWithValue(value: number, stateAverage: number, threshold: number = 5): {
  status: 'above' | 'near' | 'below';
  difference: number;
} {
  const difference = value - stateAverage;
  
  if (difference >= threshold) {
    return { status: 'above', difference };
  } else if (difference <= -threshold) {
    return { status: 'below', difference };
  } else {
    return { status: 'near', difference };
  }
}
