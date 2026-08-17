'use client';

import { useState } from 'react';
import Cursor from '@/components/Cursor';
import TopographicTexture from '@/components/TopographicTexture';
import SearchForm from '@/components/SearchForm';
import ResultsDisplay from '@/components/ResultsDisplay';

export default function Home() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (address: string) => {
    setIsLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setSearchResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Cursor />
      <TopographicTexture />
      
      <div className="relative z-10 min-h-screen">
        {/* Datum Line */}
        <div className="datum-line absolute top-[35vh] left-0 right-0 h-px bg-deep-slate/30" />
        
        {/* Main Content */}
        <div className="relative pt-[35vh] px-6 md:px-12 lg:px-24 pb-24">
          {/* Brand */}
          <div className="absolute top-8 left-6 md:left-12 lg:left-24">
            <h1 className="font-display font-bold text-xl tracking-tight text-deep-slate">
              SchoolScoreCheck
            </h1>
          </div>

          {/* Navigation */}
          <nav className="absolute top-8 right-6 md:right-12 lg:right-24 flex gap-8 text-sm font-body">
            <a href="/pricing" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Pricing
            </a>
            <a href="/about" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              About
            </a>
            <a href="/dashboard" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Dashboard
            </a>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-deep-slate leading-tight mb-4">
              See the real data behind any school district.
            </h2>
            <p className="font-body text-lg md:text-xl text-deep-slate/70 max-w-2xl">
              Official education data from the National Center for Education Statistics, not crowdsourced ratings.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-16">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-16 p-4 border-l-2 border-below-amber bg-below-amber/10">
              <p className="font-body text-deep-slate">{error}</p>
            </div>
          )}

          {/* Results */}
          {searchResults && !isLoading && (
            <div className="max-w-4xl mx-auto mb-24">
              <ResultsDisplay results={searchResults} />
            </div>
          )}

          {/* Trust Section */}
          <div className="max-w-4xl mx-auto mb-24 px-6 py-8 border-l border-deep-slate/20">
            <p className="font-body text-sm text-deep-slate/60 italic">
              Live data pulled from the National Center for Education Statistics, part of the U.S. Department of Education.
            </p>
          </div>

          {/* SEO Content Block */}
          <div className="max-w-4xl mx-auto mb-24 px-6">
            <h3 className="font-display font-semibold text-2xl text-deep-slate mb-6">
              How to Read School Performance Data
            </h3>
            <div className="font-body text-deep-slate/80 space-y-4 leading-relaxed">
              <p>
                School performance data provides critical insights into educational outcomes, but understanding what the numbers mean is essential for making informed decisions. The key metrics displayed here come directly from the National Center for Education Statistics (NCES), which collects data from every public school in the United States.
              </p>
              <p>
                <strong>Student-Teacher Ratio</strong> indicates the average number of students per teacher in a school or district. Lower ratios often suggest more individualized attention, though the quality of teaching matters more than the quantity. State averages typically range from 14:1 to 22:1, with significant variation between urban and rural districts.
              </p>
              <p>
                <strong>Free/Reduced-Price Lunch Percentage</strong> serves as an economic indicator, showing the proportion of students from families qualifying for federal meal assistance. This metric helps contextualize other performance data, as schools serving higher-need populations may face different challenges. State averages vary widely from 30% to over 70% depending on the region.
              </p>
              <p>
                <strong>Test Proficiency Rates</strong> show the percentage of students meeting or exceeding state standards in reading and mathematics. These figures come from state-administered assessments and are aggregated at the school and district level. When comparing schools, look at both the absolute proficiency rate and how it compares to the state average—some schools consistently outperform despite serving similar student populations.
              </p>
              <p>
                <strong>Graduation Rate</strong> tracks the percentage of students who complete high school within four years. This is a key outcome metric, though it doesn't capture college readiness or post-secondary success. State averages typically range from 80% to 90%, with significant gaps between demographic groups in many districts.
              </p>
              <p>
                Remember that these metrics represent snapshots in time, typically from the most recently completed school year. Educational performance can change due to leadership transitions, program changes, or demographic shifts. Use this data as one input in your decision-making process, complemented by school visits, conversations with administrators and teachers, and consideration of your child's specific needs.
              </p>
            </div>
          </div>

          {/* Pricing Teaser */}
          <div className="max-w-4xl mx-auto mb-24 px-6 py-12 border-t border-deep-slate/20">
            <h3 className="font-display font-semibold text-2xl text-deep-slate mb-4">
              Save districts and get detailed comparisons
            </h3>
            <p className="font-body text-deep-slate/70 mb-6 max-w-2xl">
              Create a free account to save up to 3 schools or districts and receive alerts when new data is published. Upgrade to compare up to 4 districts side-by-side and download detailed PDF reports.
            </p>
            <a
              href="/pricing"
              className="inline-block px-8 py-3 bg-copper-accent text-white font-display font-semibold tracking-wide hover:bg-deep-slate transition-colors"
            >
              View Pricing
            </a>
          </div>

          {/* Footer */}
          <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-deep-slate/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h4 className="font-display font-semibold text-deep-slate mb-2">SchoolScoreCheck</h4>
                <p className="font-body text-sm text-deep-slate/60">
                  Official NCES education data for informed decisions.
                </p>
              </div>
              <div className="flex gap-6 text-sm font-body">
                <a href="/" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
                  Home
                </a>
                <a href="/pricing" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
                  Pricing
                </a>
                <a href="/about" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
                  About
                </a>
                <a
                  href="mailto:contact@calyvent.com?subject=SchoolScoreCheck%20Inquiry"
                  className="text-deep-slate/60 hover:text-copper-accent transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-deep-slate/10">
              <p className="font-body text-xs text-deep-slate/40">
                School performance data reflects the most recently published NCES figures and may not capture recent changes in staff, programs, or performance. This is one input for a decision, not a complete picture — visit schools directly when possible.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
