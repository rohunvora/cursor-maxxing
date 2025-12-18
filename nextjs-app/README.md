# prompt.gallery

**The first marketplace for prompt journeys.** See what's possible with AI, pay to learn exactly how.

## What is this?

prompt.gallery is a marketplace where creators can monetize their AI prompt histories. Instead of selling single prompts, creators sell their complete conversation histories—every prompt, response, iteration, and debug session.

### For Learners
- Browse real projects built entirely with AI
- See free previews before purchasing
- Learn from the iteration process, not just the final result
- Download full histories for offline reference

### For Creators
- Export your Cursor/ChatGPT/Claude histories
- Set your own prices ($2.99 - $99)
- Keep 85% of every sale
- Get paid via Stripe Connect

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (light mode, Kinsta-inspired design)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Email, GitHub, Magic Links)
- **Payments:** Stripe + Stripe Connect
- **Hosting:** Vercel

## Live Site

**Production:** [https://prmpt-hstry.vercel.app](https://prmpt-hstry.vercel.app)

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase project
- A Stripe account

### Setup

1. **Clone and install:**
   ```bash
   cd nextjs-app
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file:
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

3. **Run the database schema:**
   
   Copy the contents of `supabase/schema.sql` and run it in your Supabase SQL Editor.

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Prompts gallery
│   ├── showcases/page.tsx    # Showcase marketplace
│   ├── showcase/[id]/page.tsx # Showcase detail + purchase
│   ├── export/page.tsx       # Export wizard
│   ├── dashboard/page.tsx    # Creator dashboard
│   ├── auth/page.tsx         # Sign in/up
│   ├── about/page.tsx        # About page
│   ├── terms/page.tsx        # Terms of Service
│   ├── privacy/page.tsx      # Privacy Policy
│   └── api/
│       ├── checkout/route.ts     # Stripe Checkout
│       ├── connect/route.ts      # Stripe Connect
│       └── webhooks/stripe/route.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PromptCard.tsx
│   └── ShowcaseCard.tsx
└── lib/
    ├── supabase/             # Supabase clients
    ├── stripe.ts             # Stripe helpers
    ├── types.ts              # TypeScript types
    ├── prompts-data.ts       # Curated prompts
    └── seed-showcases.ts     # Demo showcases
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Set these in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` (use live key)
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (use live key)
- `NEXT_PUBLIC_APP_URL` (your production URL)

## Features

### ✅ Implemented
- [x] Curated prompts gallery with filtering
- [x] Showcase marketplace
- [x] Export wizard with client-side processing
- [x] Sensitive data redaction
- [x] User authentication (Email, GitHub)
- [x] Creator dashboard
- [x] Stripe Checkout integration
- [x] Stripe Connect for payouts
- [x] Row-level security in database
- [x] Legal pages (Terms, Privacy)
- [x] **Light mode redesign** - Clean, Kinsta-inspired aesthetic
- [x] **Search functionality** on prompts page
- [x] **Hero sections** with improved typography

### 🚧 Coming Soon
- [ ] Mobile navigation hamburger menu
- [ ] User ratings/reviews
- [ ] Creator profiles
- [ ] Bundle discounts
- [ ] API for Cursor plugin

## License

MIT - See LICENSE for details.

## Credits

Built with [Cursor](https://cursor.com) + [Claude](https://anthropic.com).
