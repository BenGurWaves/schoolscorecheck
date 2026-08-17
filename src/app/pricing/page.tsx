'use client';

import { useState } from 'react';
import Cursor from '@/components/Cursor';
import TopographicTexture from '@/components/TopographicTexture';

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(priceId: string) {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  }

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
            <a href="/dashboard" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              Dashboard
            </a>
            <a href="/about" className="text-deep-slate/60 hover:text-copper-accent transition-colors">
              About
            </a>
          </nav>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-deep-slate mb-4">
              Simple Pricing
            </h2>
            <p className="font-body text-lg text-deep-slate/70 mb-12">
              Start free, upgrade when you need deeper analysis.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Tier */}
              <div className="p-8 border border-deep-slate/20">
                <h3 className="font-display font-bold text-2xl text-deep-slate mb-2">
                  Free
                </h3>
                <p className="font-display font-bold text-4xl text-deep-slate mb-6">
                  $0
                  <span className="text-lg font-body text-deep-slate/60">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Unlimited address searches
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Up to 3 watched schools/districts
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Data update alerts
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Basic comparison badges
                  </li>
                </ul>
                <a
                  href="/"
                  className="block w-full px-6 py-3 text-center border border-deep-slate/30 text-deep-slate font-display font-semibold tracking-wide hover:bg-deep-slate hover:text-registry-cream transition-colors"
                >
                  Get Started
                </a>
              </div>

              {/* Paid Tier */}
              <div className="p-8 border-2 border-copper-accent relative">
                <div className="absolute -top-3 left-8 px-3 py-1 bg-copper-accent text-white text-xs font-display font-semibold tracking-wide">
                  POPULAR
                </div>
                <h3 className="font-display font-bold text-2xl text-deep-slate mb-2">
                  Pro
                </h3>
                <p className="font-display font-bold text-4xl text-deep-slate mb-6">
                  $6.99
                  <span className="text-lg font-body text-deep-slate/60">/month</span>
                </p>
                <p className="font-body text-sm text-deep-slate/60 mb-6">
                  or $59/year (save 30%)
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Everything in Free
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Unlimited watched schools/districts
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Side-by-side comparison (up to 4)
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Downloadable PDF reports
                  </li>
                  <li className="font-body text-deep-slate/80 flex items-start">
                    <span className="text-above-green mr-2">✓</span>
                    Priority data updates
                  </li>
                </ul>
                <button
                  onClick={() => handleSubscribe('price_monthly')}
                  disabled={loading}
                  className="block w-full px-6 py-3 bg-copper-accent text-white font-display font-semibold tracking-wide hover:bg-deep-slate transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Start Free Trial'}
                </button>
                <p className="font-body text-xs text-deep-slate/60 mt-3 text-center">
                  7-day free trial, cancel anytime
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <h3 className="font-display font-semibold text-2xl text-deep-slate mb-8">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-semibold text-lg text-deep-slate mb-2">
                    What payment methods do you accept?
                  </h4>
                  <p className="font-body text-deep-slate/70">
                    We accept all major credit cards via Stripe. Your payment information is never stored on our servers.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-deep-slate mb-2">
                    Can I cancel my subscription?
                  </h4>
                  <p className="font-body text-deep-slate/70">
                    Yes, you can cancel your Pro subscription at any time from your dashboard. You'll continue to have access until the end of your billing period.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-deep-slate mb-2">
                    Is the school data always up to date?
                  </h4>
                  <p className="font-body text-deep-slate/70">
                    NCES publishes updated data annually. We refresh our cache within 24 hours of new data being released. Pro users get priority notification when updates are available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
