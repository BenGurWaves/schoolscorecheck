# Deployment Guide - SchoolScoreCheck

## Pre-Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Supabase project created
- [ ] Supabase schema migrated (`supabase/schema.sql`)
- [ ] Stripe account created
- [ ] Environment variables documented
- [ ] Cloudflare account ready

## Step 1: Cloudflare Pages Setup

### 1.1 Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create Application** → **Pages**
3. Select **Connect to Git**
4. Choose the `schoolscorecheck` repository
5. Click **Begin Setup**

### 1.2 Configure Build Settings

```
Build command: npm run build
Build output directory: .next
Node.js version: 18
```

### 1.3 Configure Environment Variables

Add these in **Settings** → **Environment Variables**:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_BASE_URL=https://schoolscorecheck.calyvent.com
```

### 1.4 Configure Custom Domain

1. In **Settings** → **Custom Domains**
2. Add: `schoolscorecheck.calyvent.com`
3. Cloudflare will automatically configure DNS
4. Wait for SSL certificate provisioning

## Step 2: Supabase Configuration

### 2.1 Enable Email Auth

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Email** provider
3. Disable **Confirm email** (per requirements)
4. Set site URL: `https://schoolscorecheck.calyvent.com`
5. Set redirect URLs:
   - `https://schoolscorecheck.calyvent.com/auth/callback`
   - `https://schoolscorecheck.calyvent.com/dashboard`

### 2.2 Run Schema Migration

1. Go to **SQL Editor**
2. Create new query
3. Paste contents of `supabase/schema.sql`
4. Run the query

### 2.3 Get Environment Variables

From Supabase Dashboard → **Project Settings** → **API**:

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Stripe Configuration

### 3.1 Get API Keys

From Stripe Dashboard → **Developers** → **API keys**:

- `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `Secret key` → `STRIPE_SECRET_KEY`

### 3.2 Configure Webhook

1. Go to **Developers** → **Webhooks**
2. Add endpoint: `https://schoolscorecheck.calyvent.com/api/webhook/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.deleted`
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 3.3 Create Product

In Stripe Dashboard → **Products**:

1. Create product: "SchoolScoreCheck Pro"
2. Price: $6.99/month
3. Note the price ID for the checkout session

## Step 4: GitHub Repository Secrets

Add these in GitHub repository → **Settings** → **Secrets and variables** → **Actions**:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Step 5: DNS Configuration

The subdomain `schoolscorecheck.calyvent.com` requires:

1. **CNAME record** pointing to Cloudflare Pages:
   - Name: `schoolscorecheck`
   - Type: `CNAME`
   - Target: `[your-cloudflare-pages-domain].pages.dev`

2. Cloudflare will handle this automatically when you add the custom domain in Pages.

## Step 6: Verify Deployment

After deployment, verify these URLs are accessible:

- **Homepage**: `https://schoolscorecheck.calyvent.com`
- **Sitemap**: `https://schoolscorecheck.calyvent.com/sitemap.xml`
- **Robots.txt**: `https://schoolscorecheck.calyvent.com/robots.txt`
- **llms.txt**: `https://schoolscorecheck.calyvent.com/llms.txt`
- **Favicon**: `https://schoolscorecheck.calyvent.com/favicon.ico`

## Step 7: Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://schoolscorecheck.calyvent.com`
3. Verify via DNS (Cloudflare will add verification TXT record)
4. Submit sitemap: `https://schoolscorecheck.calyvent.com/sitemap.xml`

## Environment Variables Summary

| Variable | Location | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Cloudflare Pages + GitHub | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cloudflare Pages + GitHub | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Cloudflare Pages + GitHub | Supabase service role (private) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Cloudflare Pages + GitHub | Stripe publishable key (public) |
| `STRIPE_SECRET_KEY` | Cloudflare Pages + GitHub | Stripe secret key (private) |
| `STRIPE_WEBHOOK_SECRET` | Cloudflare Pages + GitHub | Stripe webhook secret (private) |
| `NEXT_PUBLIC_BASE_URL` | Cloudflare Pages | Site URL for redirects |
| `NCES_API_KEY` | Cloudflare Pages (optional) | NCES API rate limiting |

## Troubleshooting

### Build Fails

- Check Node.js version is 18+
- Verify all environment variables are set
- Check build logs for specific errors

### Auth Not Working

- Verify Supabase email auth is enabled
- Check redirect URLs match deployment domain
- Ensure email confirmation is disabled

### Stripe Checkout Fails

- Verify API keys are correct
- Check webhook endpoint is accessible
- Ensure product/price exists in Stripe

### SEO Files Not Accessible

- Verify `public/` folder files are deployed
- Check Cloudflare Pages build output
- Ensure `sitemap.ts` is generating correctly

## Post-Deployment Tasks

- [ ] Test address search functionality
- [ ] Test user signup/login
- [ ] Test Stripe checkout flow
- [ ] Verify all SEO files are accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Cloudflare Analytics
- [ ] Set up error tracking (optional)
