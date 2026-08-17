'use client';

import { compareWithValue } from '@/lib/nces/state-averages';

interface ResultsDisplayProps {
  results: {
    address: {
      address: string;
      state: string;
    };
    district: {
      ncesId: string;
      name: string;
      totalEnrollment: number;
      studentTeacherRatio: number;
      freeReducedLunchPercent: number;
    };
    schools: Array<{
      ncesId: string;
      name: string;
      level: string;
      enrollment: number;
      studentTeacherRatio: number;
      freeReducedLunchPercent: number;
    }>;
  };
}

function ComparisonBadge({ status }: { status: 'above' | 'near' | 'below' }) {
  const styles = {
    above: 'bg-above-green/10 text-above-green border-above-green/30',
    near: 'bg-state-blue/10 text-state-blue border-state-blue/30',
    below: 'bg-below-amber/10 text-below-amber border-below-amber/30',
  };

  const labels = {
    above: 'Above state average',
    near: 'Near state average',
    below: 'Below state average',
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-mono border rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const stateAverages = {
    studentTeacherRatio: 16.5,
    freeReducedLunchPercent: 52.0,
  };

  const districtComparison = {
    studentTeacherRatio: compareWithValue(
      results.district.studentTeacherRatio,
      stateAverages.studentTeacherRatio
    ),
    freeReducedLunchPercent: compareWithValue(
      results.district.freeReducedLunchPercent,
      stateAverages.freeReducedLunchPercent
    ),
  };

  return (
    <div className="space-y-12">
      {/* District Header */}
      <div className="border-b border-deep-slate/20 pb-8">
        <h3 className="font-display font-bold text-3xl text-deep-slate mb-2">
          {results.district.name}
        </h3>
        <p className="font-body text-deep-slate/60 mb-4">
          {results.address.address}
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-mono text-deep-slate/70">
          <span>NCES ID: {results.district.ncesId}</span>
          <span>State: {results.address.state}</span>
        </div>
      </div>

      {/* District Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border-l-2 border-deep-slate/20">
          <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-2">
            Total Enrollment
          </p>
          <p className="font-display font-bold text-2xl text-deep-slate">
            {results.district.totalEnrollment.toLocaleString()}
          </p>
        </div>
        <div className="p-6 border-l-2 border-deep-slate/20">
          <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-2">
            Student-Teacher Ratio
          </p>
          <p className="font-display font-bold text-2xl text-deep-slate mb-2">
            {results.district.studentTeacherRatio.toFixed(1)}:1
          </p>
          <ComparisonBadge status={districtComparison.studentTeacherRatio.status} />
        </div>
        <div className="p-6 border-l-2 border-deep-slate/20">
          <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-2">
            Free/Reduced Lunch
          </p>
          <p className="font-display font-bold text-2xl text-deep-slate mb-2">
            {results.district.freeReducedLunchPercent.toFixed(1)}%
          </p>
          <ComparisonBadge status={districtComparison.freeReducedLunchPercent.status} />
        </div>
      </div>

      {/* Schools List */}
      <div>
        <h4 className="font-display font-semibold text-xl text-deep-slate mb-6">
          Assigned Schools
        </h4>
        <div className="space-y-6">
          {results.schools.map((school) => {
            const schoolComparison = {
              studentTeacherRatio: compareWithValue(
                school.studentTeacherRatio,
                stateAverages.studentTeacherRatio
              ),
              freeReducedLunchPercent: compareWithValue(
                school.freeReducedLunchPercent,
                stateAverages.freeReducedLunchPercent
              ),
            };

            return (
              <div
                key={school.ncesId}
                className="p-6 border border-deep-slate/10 hover:border-copper-accent/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h5 className="font-display font-semibold text-lg text-deep-slate mb-1">
                      {school.name}
                    </h5>
                    <p className="font-body text-sm text-deep-slate/60">
                      {school.level}
                    </p>
                  </div>
                  <a
                    href={`https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?Search=1&ID=${school.ncesId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-copper-accent hover:text-deep-slate transition-colors"
                  >
                    View NCES Profile →
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-1">
                      Enrollment
                    </p>
                    <p className="font-mono text-deep-slate">
                      {school.enrollment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-1">
                      Student-Teacher Ratio
                    </p>
                    <p className="font-mono text-deep-slate mb-1">
                      {school.studentTeacherRatio.toFixed(1)}:1
                    </p>
                    <ComparisonBadge status={schoolComparison.studentTeacherRatio.status} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-1">
                      Free/Reduced Lunch
                    </p>
                    <p className="font-mono text-deep-slate mb-1">
                      {school.freeReducedLunchPercent.toFixed(1)}%
                    </p>
                    <ComparisonBadge status={schoolComparison.freeReducedLunchPercent.status} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-deep-slate/60 uppercase tracking-wide mb-1">
                      NCES ID
                    </p>
                    <p className="font-mono text-deep-slate/60 text-xs">
                      {school.ncesId}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 bg-deep-slate/5 border-l-2 border-copper-accent">
        <h5 className="font-display font-semibold text-xl text-deep-slate mb-2">
          Save this district and get updates
        </h5>
        <p className="font-body text-deep-slate/70 mb-4">
          Create a free account to track this district and receive alerts when new NCES data is published.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-copper-accent text-white font-display font-semibold tracking-wide hover:bg-deep-slate transition-colors"
        >
          Create Free Account
        </a>
      </div>
    </div>
  );
}
