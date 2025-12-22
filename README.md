Holistic Healing - Professional Next.js Naturopathic Treatments Info and Booking Platform

## ✨ **About This Project**

This is my **graduation project** from **Spiced Academy** in Berlin.

**Originally inspired** by my wife's need for a professional booking system on her wellness practice website.

**Note**: This is a **learning project** - not the official production site. Features like MongoDB backend + API fetching were implemented to meet a full-stack final project requirements.

**Full Stack Architecture**:

Frontend: Next.js 14.2 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + OKLCH CSS Variables
Backend: MongoDB + Next.js API Routes (/api/treatments, /api/doctors)

📁 Project Structure

app/
├── treatments/[slug]/ # Dynamic treatment pages w/ carousel
├── booking/ # Multi-step booking flow
├── globals.css # OKLCH theme system
├── layout.tsx # Root layout + providers
components/
├── ui/ # shadcn/ui + custom glassmorphism
│ ├── icons.tsx # Heroicons exports (tree-shaken)
│ └── skeletons/ # Loading states
lib/
├── utils.ts # cn() class merger
└── swr.ts # API fetcher config

🚀 Quick Start

bash

# Clone & Install

git clone <repo> holistic-healing
cd holistic-healing
npm install

# Environment (optional)

cp .env.example .env.local

# Development

npm run dev

# Production Build

npm run build && npm start

🔧 API Endpoints

GET /api/treatments # All treatments + slugs
GET /api/doctors # Doctor availability
POST /api/bookings # Create booking (TBD)

🎯 User Flows

    Browse Treatments → /treatments/[slug] → Hero image + symptoms → Book

    Book Treatment → /booking → Step 1 (Treatment) → Step 2 (Doctor/Time) → Step 3 (Details) → Confirm

    Mobile Optimized → Swipe carousel, touch-friendly buttons, responsive grids

⚡ Performance Optimizations

    Tree-shaken Heroicons (0KB unused icons)

    Next.js Image (automatic optimization)

    SWR Caching (stale-while-revalidate)

    CSS Variables (no duplicate color definitions)

    Tailwind JIT (purge unused styles)

🌟 Professional Standards

    TypeScript Everywhere - Full interfaces, no any

    Accessibility - ARIA labels, keyboard nav, focus states

    SEO Ready - Dynamic metadata, semantic HTML

    Dark Mode - Native prefers-color-scheme

    Production CSS - OKLCH color space, consistent tokens

Built with ❤️ | December 2025 | Ready for Vercel/Netlify deployment
