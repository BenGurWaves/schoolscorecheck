import { US_STATES } from '@/lib/data/states';
import { Metadata } from 'next';
import Cursor from '@/components/Cursor';
import TopographicTexture from '@/components/TopographicTexture';
import SearchForm from '@/components/SearchForm';

interface StatePageProps {
  params: { state: string };
}

export async function generateStaticParams() {
  return US_STATES.map((state) => ({
    state: state.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const stateCode = params.state.toUpperCase();
  const state = US_STATES.find((s) => s.code === stateCode);
  
  if (!state) {
    return {
      title: 'State Not Found',
    };
  }

  return {
    title: `${state.name} School District Ratings & Performance Data | SchoolScoreCheck`,
    description: `Compare school districts in ${state.name} using official NCES data. View test scores, graduation rates, student-teacher ratios, and state averages for every district.`,
    keywords: `${state.name} school districts, ${state.name} school ratings, ${state.name} education data, ${state.name} test scores`,
    openGraph: {
      title: `${state.name} School District Ratings | SchoolScoreCheck`,
      description: `Official NCES education data for all ${state.name} school districts.`,
      type: 'website',
    },
  };
}

export default function StatePage({ params }: StatePageProps) {
  const stateCode = params.state.toUpperCase();
  const state = US_STATES.find((s) => s.code === stateCode);
  
  if (!state) {
    return <div>State not found</div>;
  }

  return (
    <>
      <Cursor />
      <TopographicTexture />
      
      <div className="relative z-10 min-h-screen">
        <div className="datum-line absolute top-[35vh] left-0 right-0 h-px bg-deep-slate/30" />
        
        <div className="relative pt-[35vh] px-6 md:px-12 lg:px-24 pb-24">
          <div className="absolute top-8 left-6 md:left-12 lg:left-24">
            <h1 className="font-display font-bold text-xl tracking-tight text-deep-slate">
              SchoolScoreCheck
            </h1>
          </div>

          <nav className="absolute top-8 right-6 md:right-12 lg:right-24 flex gap-8 text-sm font-body">
            <a href="/" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Home
            </a>
            <a href="/pricing" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Pricing
            </a>
            <a href="/about" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              About
            </a>
          </nav>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-deep-slate mb-4">
              {state.name} School Districts
            </h2>
            
            <p className="font-body text-lg text-deep-slate/70 mb-8">
              Search any address in {state.name} to see the assigned school district, individual schools, test scores, graduation rates, and how they compare to state averages. All data comes from the National Center for Education Statistics.
            </p>

            <div className="mb-12">
              <SearchForm onSearch={() => {}} />
            </div>

            <div className="font-body text-deep-slate/80 space-y-4 leading-relaxed mb-12">
              <p>
                {state.name} has hundreds of school districts serving millions of students across urban, suburban, and rural communities. Understanding district-level performance data is essential for families making relocation decisions, education researchers analyzing trends, and policymakers evaluating resource allocation.
              </p>
              <p>
                The data displayed on SchoolScoreCheck for {state.name} includes student-teacher ratios, free/reduced lunch percentages (an economic indicator), state test proficiency rates in reading and mathematics, and graduation rates for high schools. Each metric is compared against the {state.name} state average to provide context for performance.
              </p>
              <p>
                When evaluating {state.name} school districts, consider that test scores and graduation rates are important but incomplete measures. School culture, teaching quality, extracurricular programs, and fit for your child's specific needs all matter. Use this data as one input in your decision-making process, complemented by school visits and conversations with administrators.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="font-display font-semibold text-2xl text-deep-slate mb-6">
                Major Cities in {state.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* This would be dynamically populated with actual cities from the state */}
                <a href={`/schools/${state.code.toLowerCase()}/major-city`} className="font-body text-deep-slate/70 hover:text-copper-accent transition-colors">
                  Search by city
                </a>
              </div>
            </div>

            <div className="p-8 border-l-2 border-state-blue bg-state-blue/5">
              <h3 className="font-display font-semibold text-xl text-deep-slate mb-4">
                Data Source for {state.name}
              </h3>
              <p className="font-body text-deep-slate/70">
                All {state.name} school data comes from the National Center for Education Statistics (NCES) Common Core of Data (CCD) and EDFacts programs. These datasets are collected annually from every public school and school district in {state.name} and the United States.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
