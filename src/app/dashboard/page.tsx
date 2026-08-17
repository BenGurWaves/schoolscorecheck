'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Cursor from '@/components/Cursor';
import TopographicTexture from '@/components/TopographicTexture';

export const dynamic = 'force-dynamic';

interface WatchedItem {
  id: string;
  type: 'district' | 'school';
  nces_id: string;
  label: string;
  added_at: string;
}

export default function Dashboard() {
  const [watchedItems, setWatchedItems] = useState<WatchedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    // Only create Supabase client on client side
    const client = createClient();
    setSupabase(client);

    async function loadWatchedItems() {
      const { data: { user } } = await client.auth.getUser();
      
      if (!user) {
        window.location.href = '/';
        return;
      }

      setUser(user);

      const { data, error } = await client
        .from('watched_items')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) {
        console.error('Error loading watched items:', error);
      } else {
        setWatchedItems(data || []);
      }

      setLoading(false);
    }

    loadWatchedItems();
  }, []);

  async function handleRemove(id: string) {
    if (!supabase) return;
    const { error } = await supabase
      .from('watched_items')
      .delete()
      .eq('id', id);

    if (!error) {
      setWatchedItems(watchedItems.filter(item => item.id !== id));
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  if (loading) {
    return (
      <>
        <Cursor />
        <TopographicTexture />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <p className="font-body text-deep-slate/60">Loading...</p>
        </div>
      </>
    );
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
          <div className="absolute top-8 left-6 md:left-12 lg:left-24 flex items-center justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] lg:w-[calc(100%-12rem)]">
            <h1 className="font-display font-bold text-xl tracking-tight text-deep-slate">
              SchoolScoreCheck
            </h1>
            <button
              onClick={handleSignOut}
              className="text-sm font-body text-deep-slate/60 hover:text-copper-accent transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Navigation */}
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
              My Watched Districts & Schools
            </h2>
            <p className="font-body text-lg text-deep-slate/70 mb-8">
              You'll receive alerts when new NCES data is published for any of your watched items.
            </p>

            {watchedItems.length === 0 ? (
              <div className="p-12 border border-deep-slate/20 text-center">
                <p className="font-body text-deep-slate/60 mb-4">
                  You haven't saved any districts or schools yet.
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-copper-accent text-white font-display font-semibold tracking-wide hover:bg-deep-slate transition-colors"
                >
                  Search Schools
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {watchedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 border border-deep-slate/10 hover:border-copper-accent/30 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-display font-semibold text-lg text-deep-slate mb-1">
                        {item.label}
                      </h3>
                      <div className="flex items-center gap-4 text-sm font-mono text-deep-slate/60">
                        <span className="uppercase">{item.type}</span>
                        <span>NCES ID: {item.nces_id}</span>
                        <span>Added {new Date(item.added_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm font-body text-deep-slate/60 hover:text-below-amber transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Alert Info */}
            <div className="mt-12 p-6 border-l-2 border-state-blue bg-state-blue/5">
              <h4 className="font-display font-semibold text-lg text-deep-slate mb-2">
                Data Update Alerts
              </h4>
              <p className="font-body text-deep-slate/70 text-sm">
                NCES publishes updated school data annually. When new figures are released for any of your watched districts or schools, you'll receive a notification with a summary of the changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
