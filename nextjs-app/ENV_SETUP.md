# Environment Variables Setup

Create a `.env.local` file in the root of the `nextjs-app` directory with the following variables:

## Required Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Your Keys

### Supabase
1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Settings → API
3. Copy the "Project URL" and "anon public" key

### Stripe
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your API keys from Developers → API keys
3. For webhooks:
   - Set up a webhook endpoint at `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `account.updated`
     - `transfer.created`

## Running the Database Schema

After setting up Supabase, run the SQL schema:

1. Go to your Supabase project → SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Run the query

This will create:
- `profiles` table (extends auth.users)
- `showcases` table
- `purchases` table
- Row Level Security policies
- Storage bucket for showcase content

