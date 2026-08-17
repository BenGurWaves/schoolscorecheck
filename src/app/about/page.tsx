'use client';

import Cursor from '@/components/Cursor';
import TopographicTexture from '@/components/TopographicTexture';

export default function About() {
  return (
    <>
      <Cursor />
      <TopographicTexture />
      
      <div className="relative z-10 min-h-screen">
        {/* Datum Line */}
        <div className="datum-line absolute top-[35vh] left-0 right-0 h-px bg-deep-slate/30" />
        
        <div className="relative pt-[35vh] px-6 md:px-12 lg:px-24 pb-24">
          {/* Header */}
          <div className="absolute top-8 left-6 md:left-12 lg:left-24">
            <h1 className="font-display font-bold text-xl tracking-tight text-deep-slate">
              SchoolScoreCheck
            </h1>
          </div>

          {/* Navigation */}
          <nav className="absolute top-8 right-6 md:right-12 lg:right-24 flex gap-8 text-sm font-body">
            <a href="/" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Home
            </a>
            <a href="/pricing" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Pricing
            </a>
            <a href="/dashboard" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Dashboard
            </a>
          </nav>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-deep-slate mb-8">
              About SchoolScoreCheck
            </h2>
            
            <div className="font-body text-lg text-deep-slate/80 space-y-6 leading-relaxed">
              <p>
                SchoolScoreCheck provides instant access to official school performance data for any address in the United States. We pull our data directly from the National Center for Education Statistics (NCES), part of the U.S. Department of Education—the authoritative source for public education data nationwide.
              </p>
              <p>
                Unlike other platforms that rely on crowdsourced ratings, proprietary scores, or user reviews, SchoolScoreCheck shows you the actual metrics that matter: enrollment numbers, student-teacher ratios, free/reduced lunch percentages, state test proficiency rates, and graduation rates. We also compare each school and district to state averages, so you can understand performance in context.
              </p>
              <p>
                Our mission is to make education data transparent and accessible. Whether you're a parent researching schools for a move, a real estate agent helping clients understand neighborhood quality, or an education researcher analyzing district performance, SchoolScoreCheck gives you the data you need without the noise.
              </p>
            </div>

            {/* Data Source */}
            <div className="mt-12 p-8 border-l-2 border-state-blue bg-state-blue/5">
              <h3 className="font-display font-semibold text-xl text-deep-slate mb-4">
                Data Source
              </h3>
              <p className="font-body text-deep-slate/70">
                All data displayed on SchoolScoreCheck comes from the National Center for Education Statistics (NCES) Common Core of Data (CCD) and EDFacts programs. These datasets are collected annually from every public school and school district in the United States. We cache this data for 24 hours to ensure performance while maintaining freshness.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-8 border-l-2 border-below-amber bg-below-amber/5">
              <h3 className="font-display font-semibold text-xl text-deep-slate mb-4">
                Important Disclaimer
              </h3>
              <p className="font-body text-deep-slate/70">
                School performance data reflects the most recently published NCES figures and may not capture recent changes in staff, programs, or performance. This is one input for a decision, not a complete picture — visit schools directly when possible. Test scores and graduation rates are important metrics, but they don't capture everything about a school's culture, teaching quality, or fit for your child's specific needs.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-12">
              <h3 className="font-display font-semibold text-xl text-deep-slate mb-4">
                Contact
              </h3>
              <p className="font-body text-deep-slate/70 mb-4">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <a
                href="mailto:contact@calyvent.com?subject=SchoolScoreCheck%20Inquiry"
                className="inline-block px-6 py-3 bg-copper-accent text-white font-display font-semibold tracking-wide hover:bg-deep-slate transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
