import { US_STATES, TOP_CITIES } from '@/lib/data/states';
import { Metadata } from 'next';
import Cursor from '@/components/Cursor';
import TopographicTexture from '@/components/TopographicTexture';
import SearchForm from '@/components/SearchForm';

interface CityPageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];
  
  TOP_CITIES.forEach((city) => {
    params.push({
      state: city.state.toLowerCase(),
      city: city.name.toLowerCase().replace(/\s+/g, '-'),
    });
  });

  return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { state, city } = await params;
  const stateCode = state.toUpperCase();
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
  const stateData = US_STATES.find((s) => s.code === stateCode);
  
  if (!stateData) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `${cityName} School District Ratings & Best Schools | SchoolScoreCheck`,
    description: `Find the best school districts and schools in ${cityName}, ${stateData.name}. Compare test scores, graduation rates, and student-teacher ratios using official NCES data.`,
    keywords: `${cityName} schools, ${cityName} school district, best schools in ${cityName}, ${cityName} education data`,
    openGraph: {
      title: `${cityName} School District Ratings | SchoolScoreCheck`,
      description: `Official NCES education data for ${cityName}, ${stateData.name} schools.`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { state, city } = await params;
  const stateCode = state.toUpperCase();
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
  const stateData = US_STATES.find((s) => s.code === stateCode);
  
  if (!stateData) {
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
              {cityName} Schools
            </h2>
            
            <p className="font-body text-lg text-deep-slate/70 mb-8">
              Search any address in {cityName}, {stateData.name} to see the assigned school district, individual schools, test scores, graduation rates, and how they compare to {stateData.name} state averages.
            </p>

            <div className="mb-12">
              <SearchForm onSearch={() => {}} />
            </div>

            <div className="font-body text-deep-slate/80 space-y-4 leading-relaxed mb-12">
              <p>
                {cityName} serves students across multiple school districts, each with distinct performance characteristics. Understanding which district serves a specific address is the first step in evaluating school options. SchoolScoreCheck uses official NCES data to provide accurate district assignments based on geographic boundaries.
              </p>
              <p>
                When evaluating schools in {cityName}, key metrics include student-teacher ratios (lower ratios often indicate more individualized attention), free/reduced lunch percentages (an economic indicator that helps contextualize performance), state test proficiency rates in reading and mathematics, and graduation rates for high schools. Each metric is compared against {stateData.name} state averages to provide meaningful context.
              </p>
              <p>
                The best school district for your family depends on your specific needs—some districts excel in college preparation, others in arts programs, still others in career and technical education. Use the data on SchoolScoreCheck as a starting point, then visit schools directly, talk to administrators and teachers, and consider your child's unique learning style and interests.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="font-display font-semibold text-2xl text-deep-slate mb-6">
                How {cityName} Schools Compare to {stateData.name} Averages
              </h3>
              <div className="p-6 border border-deep-slate/10">
                <p className="font-body text-deep-slate/70">
                  Search a specific address in {cityName} to see detailed performance data for the assigned schools and how they compare to {stateData.name} state averages across all key metrics.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="font-display font-semibold text-2xl text-deep-slate mb-6">
                Nearby Cities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* This would be dynamically populated with nearby cities */}
                <a href={`/schools/${stateData.code.toLowerCase()}`} className="font-body text-deep-slate/70 hover:text-copper-accent transition-colors">
                  All {stateData.name} cities
                </a>
              </div>
            </div>

            <div className="p-8 border-l-2 border-state-blue bg-state-blue/5">
              <h3 className="font-display font-semibold text-xl text-deep-slate mb-4">
                What is the best school district in {cityName}?
              </h3>
              <p className="font-body text-deep-slate/70 mb-4">
                The "best" district depends on what matters most to your family—test scores, graduation rates, programs offered, school culture, or fit for your child's specific needs. Search addresses in {cityName} to compare districts across multiple metrics and make an informed decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
