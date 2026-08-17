-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- District cache table
CREATE TABLE district_cache (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nces_district_id TEXT NOT NULL UNIQUE,
  district_data JSONB NOT NULL,
  last_fetched TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- School cache table
CREATE TABLE school_cache (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nces_school_id TEXT NOT NULL UNIQUE,
  school_data JSONB NOT NULL,
  last_fetched TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Watched items table
CREATE TABLE watched_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('district', 'school')),
  nces_id TEXT NOT NULL,
  label TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alert log table
CREATE TABLE alert_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  watched_item_id UUID NOT NULL REFERENCES watched_items(id) ON DELETE CASCADE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_district_cache_nces_id ON district_cache(nces_district_id);
CREATE INDEX idx_school_cache_nces_id ON school_cache(nces_school_id);
CREATE INDEX idx_watched_items_user_id ON watched_items(user_id);
CREATE INDEX idx_watched_items_nces_id ON watched_items(nces_id);
CREATE INDEX idx_alert_log_watched_item_id ON alert_log(watched_item_id);

-- Row Level Security policies
ALTER TABLE district_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE watched_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_log ENABLE ROW LEVEL SECURITY;

-- Public read access for cache tables (data is public NCES data)
CREATE POLICY "Public read access for district_cache" ON district_cache
  FOR SELECT USING (true);

CREATE POLICY "Public read access for school_cache" ON school_cache
  FOR SELECT USING (true);

-- Users can only access their own watched items
CREATE POLICY "Users can read own watched items" ON watched_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own watched items" ON watched_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own watched items" ON watched_items
  FOR DELETE USING (auth.uid() = user_id);

-- Users can only read their own alert logs
CREATE POLICY "Users can read own alert logs" ON alert_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM watched_items 
      WHERE watched_items.id = alert_log.watched_item_id 
      AND watched_items.user_id = auth.uid()
    )
  );

-- Service role can write to cache tables
CREATE POLICY "Service role can write district_cache" ON district_cache
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can write school_cache" ON school_cache
  FOR ALL USING (auth.role() = 'service_role');
