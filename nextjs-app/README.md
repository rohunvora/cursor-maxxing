# cursorhabits Website

The landing page for [cursorhabits](https://prmpt-hstry.vercel.app) — a CLI tool that extracts patterns from your Cursor chat history and generates personalized rules.

## Live Site

**Production:** [https://prmpt-hstry.vercel.app](https://prmpt-hstry.vercel.app)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Fraunces (display) + General Sans (body) + JetBrains Mono (code)
- **Hosting:** Vercel

## Local Development

```bash
cd nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── privacy/page.tsx      # Privacy policy
│   ├── terms/page.tsx        # Terms of service
│   ├── globals.css           # Design system (colors, fonts, components)
│   └── layout.tsx            # Root layout with fonts
│
├── components/
│   ├── Header.tsx            # Minimal header (logo + GitHub link)
│   ├── Footer.tsx            # Minimal footer
│   ├── PromptCard.tsx        # Prompt display card
│   ├── TerminalMockup.tsx    # CLI output preview
│   └── InstallCommand.tsx    # Copyable install command
│
└── lib/
    └── prompts-data.ts       # "Prompts I Like" collection
```

## Page Sections

1. **Hero** — "Your chat history writes your rules" + install command
2. **Terminal Mockup** — Shows pattern detection output
3. **Problem** — "Sound familiar?" with common repeated phrases
4. **How It Works** — Run → Review → Paste
5. **Example Output** — Real `suggested_rules.md` content
6. **Privacy** — "100% local" trust signal
7. **CTA** — GitHub links + requirements
8. **Prompts I Like** — Personal prompt collection (secondary)

## Design

Warm, illustrated aesthetic inspired by Duna/collaboration tools with developer functionality inspired by Claude Code/Cursor CLI.

**Colors:**
- `--bg-primary: #FFF8F3` (warm cream)
- `--accent-primary: #E07A5F` (coral)
- `--accent-secondary: #81B29A` (sage)

**Fonts:**
- Headlines: Fraunces (serif with personality)
- Body: General Sans (friendly sans-serif)
- Code: JetBrains Mono

## Deployment

Push to `main` branch → auto-deploys to Vercel.

## License

MIT
