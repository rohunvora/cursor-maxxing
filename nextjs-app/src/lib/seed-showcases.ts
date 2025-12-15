import type { Showcase } from './types'

// Seed data for development - will be replaced by Supabase data
export const seedShowcases: Showcase[] = [
  {
    id: '1',
    creator_id: 'seed-user-1',
    title: 'This Entire Website',
    description: 'A fully functional prompt gallery with filtering, copy-to-clipboard, keyboard shortcuts, and beautiful UI. Built start to finish with Cursor + Claude.',
    category: 'web',
    price_cents: 499,
    preview_messages: [
      { role: 'user', content: 'I want to create a beautiful prompt gallery website. It should have a dark theme, show curated prompts for AI like Claude and GPT-4, and let users copy prompts with one click. Think minimal but premium aesthetic.' },
      { role: 'assistant', content: "I'll create a sleek prompt gallery. Key decisions:\n\n1. Dark theme with orange accents for warmth\n2. Card-based layout for scanability\n3. One-click copy with visual feedback..." },
      { role: 'user', content: 'The cards look good but I want filter buttons so people can browse by category - coding, writing, analysis, creative, system prompts. Also add a subtle noise texture overlay to make it feel more premium.' }
    ],
    full_content_path: 'showcases/seed-1.json',
    stats: { prompts: 52, iterations: 18, hours: 2.5 },
    is_published: true,
    created_at: new Date().toISOString(),
    creator: {
      id: 'seed-user-1',
      username: 'satoshi',
      display_name: 'Satoshi',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '2',
    creator_id: 'seed-user-2',
    title: 'SaaS Analytics Dashboard',
    description: 'Full dashboard with charts, real-time data, dark mode, and responsive design. React + Tailwind.',
    category: 'web',
    price_cents: 999,
    preview_messages: [
      { role: 'user', content: 'Build me a SaaS analytics dashboard with React and Tailwind. I want charts showing revenue, users, and engagement metrics. Dark theme, clean modern design.' },
      { role: 'assistant', content: "I'll create a comprehensive analytics dashboard. Starting with the layout structure and then adding the chart components..." }
    ],
    full_content_path: 'showcases/seed-2.json',
    stats: { prompts: 127, iterations: 34, hours: 6 },
    is_published: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-2',
      username: 'alex_dev',
      display_name: 'Alex',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '3',
    creator_id: 'seed-user-3',
    title: 'Complete Brand Identity',
    description: 'Logo, color palette, typography system, and brand guidelines. From concept to final assets.',
    category: 'design',
    price_cents: 799,
    preview_messages: [
      { role: 'user', content: 'I need a complete brand identity for a fintech startup called "FlowPay". Modern, trustworthy, but not boring. Target audience is millennials who want better financial tools.' },
      { role: 'assistant', content: "Let me design a brand identity for FlowPay. I'll start with the core values and visual direction, then move to specific elements..." }
    ],
    full_content_path: 'showcases/seed-3.json',
    stats: { prompts: 89, iterations: 42, hours: 4 },
    is_published: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-3',
      username: 'maya_creates',
      display_name: 'Maya',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '4',
    creator_id: 'seed-user-4',
    title: 'E-commerce Price Scraper',
    description: 'Python script that scrapes competitor prices, cleans data, and auto-updates Google Sheets daily.',
    category: 'automation',
    price_cents: 599,
    preview_messages: [
      { role: 'user', content: 'I need a Python script to scrape prices from 3 competitor websites, clean the data, and push it to a Google Sheet. Should run daily via cron.' },
      { role: 'assistant', content: "I'll build this price scraper in stages: first the scraping logic, then data cleaning, then Google Sheets integration..." }
    ],
    full_content_path: 'showcases/seed-4.json',
    stats: { prompts: 38, iterations: 12, hours: 1.5 },
    is_published: true,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-4',
      username: 'jake_automates',
      display_name: 'Jake',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '5',
    creator_id: 'seed-user-5',
    title: '10-Part Technical Blog Series',
    description: 'Complete technical writing series on system design. Research, outlines, drafts, and SEO optimization.',
    category: 'content',
    price_cents: 1299,
    preview_messages: [
      { role: 'user', content: 'Help me plan and write a 10-part blog series on system design fundamentals. Target audience is mid-level developers preparing for interviews. Each post should be ~2000 words with diagrams.' },
      { role: 'assistant', content: "I'll help you create this comprehensive series. Let's start with the overall structure and then work through each article..." }
    ],
    full_content_path: 'showcases/seed-5.json',
    stats: { prompts: 156, iterations: 28, hours: 8 },
    is_published: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-5',
      username: 'ryan_writes',
      display_name: 'Ryan',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '6',
    creator_id: 'seed-user-6',
    title: 'Chrome Extension from Scratch',
    description: 'Tab management extension with grouping, search, and keyboard shortcuts. Published on Chrome Web Store.',
    category: 'web',
    price_cents: 699,
    preview_messages: [
      { role: 'user', content: 'I want to build a Chrome extension for tab management. Features: group tabs by domain, search across all tabs, keyboard shortcuts, dark mode. Help me build it from manifest.json to published.' },
      { role: 'assistant', content: "I'll guide you through building this Chrome extension. We'll start with the manifest.json and basic structure, then add features incrementally..." }
    ],
    full_content_path: 'showcases/seed-6.json',
    stats: { prompts: 73, iterations: 21, hours: 3 },
    is_published: true,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-6',
      username: 'kim_builds',
      display_name: 'Kim',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '7',
    creator_id: 'seed-user-7',
    title: 'CLI Tool in Rust',
    description: 'A fast, cross-platform CLI for file organization with async operations and beautiful output.',
    category: 'automation',
    price_cents: 899,
    preview_messages: [
      { role: 'user', content: 'Help me build a CLI tool in Rust that organizes files by type. It should be fast, support recursive scanning, and have pretty colored output. I want to learn Rust patterns along the way.' },
      { role: 'assistant', content: "Let's build this together! I'll explain Rust concepts as we go. First, let's set up the project structure with cargo..." }
    ],
    full_content_path: 'showcases/seed-7.json',
    stats: { prompts: 94, iterations: 31, hours: 5 },
    is_published: true,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-7',
      username: 'rust_enthusiast',
      display_name: 'Marcus',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '8',
    creator_id: 'seed-user-8',
    title: 'Full-Stack Todo App',
    description: 'Complete CRUD app with Next.js, Prisma, PostgreSQL. Authentication, realtime updates, and deployment.',
    category: 'web',
    price_cents: 599,
    preview_messages: [
      { role: 'user', content: "I'm learning full-stack development. Build a todo app with me using Next.js and Prisma. I want auth, drag-and-drop, and real-time sync between tabs." },
      { role: 'assistant', content: "Perfect learning project! We'll build this incrementally. Starting with the database schema and Prisma setup..." }
    ],
    full_content_path: 'showcases/seed-8.json',
    stats: { prompts: 67, iterations: 19, hours: 4 },
    is_published: true,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-8',
      username: 'fullstack_finn',
      display_name: 'Finn',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '9',
    creator_id: 'seed-user-9',
    title: 'AI-Powered Resume Builder',
    description: 'React app that generates tailored resumes using OpenAI. Multiple templates, PDF export, ATS optimization.',
    category: 'web',
    price_cents: 1199,
    preview_messages: [
      { role: 'user', content: 'Build a resume builder that uses AI to tailor content. Users paste a job description and their experience, and it generates an optimized resume. Must export to PDF.' },
      { role: 'assistant', content: "Great project idea! I'll architect this with React for the frontend and OpenAI for content generation. Let's start with the data model..." }
    ],
    full_content_path: 'showcases/seed-9.json',
    stats: { prompts: 112, iterations: 38, hours: 7 },
    is_published: true,
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-9',
      username: 'ai_sara',
      display_name: 'Sara',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '10',
    creator_id: 'seed-user-10',
    title: 'Discord Bot for Community Management',
    description: 'Full-featured Discord bot with moderation, welcome messages, role assignment, and custom commands.',
    category: 'automation',
    price_cents: 499,
    preview_messages: [
      { role: 'user', content: 'I need a Discord bot for my 5000-member server. Auto-moderation, welcome messages with role selection, and custom commands. Use discord.js.' },
      { role: 'assistant', content: "I'll build this bot step by step. Starting with the bot setup and basic event handlers, then adding each feature module..." }
    ],
    full_content_path: 'showcases/seed-10.json',
    stats: { prompts: 58, iterations: 16, hours: 3 },
    is_published: true,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-10',
      username: 'bot_builder',
      display_name: 'Carlos',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '11',
    creator_id: 'seed-user-11',
    title: 'Landing Page Copywriting Pack',
    description: 'Full conversion-focused copy for a SaaS landing page. Headlines, features, testimonials, and CTA optimization.',
    category: 'content',
    price_cents: 799,
    preview_messages: [
      { role: 'user', content: 'Write conversion-focused copy for my SaaS landing page. The product is a time-tracking tool for freelancers. I need headlines, feature descriptions, testimonial prompts, and 5 CTA variations.' },
      { role: 'assistant', content: "I'll create compelling copy that speaks to freelancer pain points. Starting with research into what drives freelancer conversions..." }
    ],
    full_content_path: 'showcases/seed-11.json',
    stats: { prompts: 45, iterations: 22, hours: 3 },
    is_published: true,
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-11',
      username: 'copy_queen',
      display_name: 'Emma',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  },
  {
    id: '12',
    creator_id: 'seed-user-12',
    title: 'Mobile App UI Kit Design',
    description: 'Complete Figma UI kit for a fitness app. 40+ screens, component library, and design system documentation.',
    category: 'design',
    price_cents: 1499,
    preview_messages: [
      { role: 'user', content: 'Design a UI kit for a fitness tracking app in Figma. I need onboarding, dashboard, workout tracking, nutrition logging, and social features. Dark theme, energetic feel.' },
      { role: 'assistant', content: "I'll design a comprehensive UI kit with a consistent design system. Starting with the color palette and typography scale..." }
    ],
    full_content_path: 'showcases/seed-12.json',
    stats: { prompts: 134, iterations: 52, hours: 10 },
    is_published: true,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      id: 'seed-user-12',
      username: 'ui_master',
      display_name: 'David',
      avatar_url: null,
      stripe_account_id: null,
      stripe_customer_id: null,
      created_at: new Date().toISOString()
    }
  }
]
