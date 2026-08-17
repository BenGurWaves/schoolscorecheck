# SchoolScoreCheck

See the real data behind any school district. Instant school performance lookup by address using official NCES (National Center for Education Statistics) data from the U.S. Department of Education.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database/Auth**: Supabase
- **Payments**: Stripe
- **Fonts**: Space Grotesk (display), Outfit (body), Source Code Pro (data)

## Getting Started

### Prerequisites

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a Stripe account at [stripe.com](https://stripe.com)
3. Copy `.env.example` to `.env` and fill in the required values

### Environment Variables

Required environment variables (see `.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# NCES API (optional, for rate limiting)
NCES_API_KEY=your_nces_api_key
```

### Database Setup

Run the Supabase schema migration:

```bash
# In Supabase dashboard, go to SQL Editor and run the contents of:
supabase/schema.sql
```

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Deployment

### Cloudflare Pages

1. Push this repository to GitHub
2. In Cloudflare dashboard, create a new Pages project
3. Connect to the GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Node.js version: `18` or later
5. Set environment variables in Cloudflare Pages settings
6. Configure custom domain: `schoolscorecheck.calyvent.com`

### Environment Variables Location

- **GitHub Repository Secrets** (for CI/CD): `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Cloudflare Pages Environment Variables**: All variables from `.env.example`
- **Supabase Project Settings**: Configure auth providers (email/password only, no confirmation required)

## Features

- Address geocoding via U.S. Census Geocoder
- School district boundary resolution via NCES API
- NCES Common Core of Data integration
- State average comparisons with badges
- 24-hour data caching
- Email/password authentication (no confirmation)
- Watched districts/schools with alerts
- Stripe Checkout for subscriptions
- 50 state + 100 city static SEO pages

## SEO & Discoverability

- `robots.txt` - Allows search engines, GPTBot, ClaudeBot, PerplexityBot
- `llms.txt` - LLM-readable site summary
- `sitemap.xml` - Auto-generated for all pages
- JSON-LD structured data
- OpenGraph and Twitter cards

## Important URLs (Post-Deployment)

After deployment to `schoolscorecheck.calyvent.com`:

- Sitemap: `https://schoolscorecheck.calyvent.com/sitemap.xml`
- Robots.txt: `https://schoolscorecheck.calyvent.com/robots.txt`
- llms.txt: `https://schoolscorecheck.calyvent.com/llms.txt`

## License

Proprietary - Calyvent
