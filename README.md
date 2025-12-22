Wellness Haven - Professional Next.js Treatment Booking Platform

[
[
[
[
✨ Production-Ready Features

    Dynamic Treatment Pages (/treatments/[slug]) with image galleries, symptom matchers, and carousel navigation

    Multi-Step Booking Flow with doctor selection, time slots, and patient details

    Responsive Design - Mobile-first, accessible, dark mode support

    OKLCH Color System - Sophisticated wellness palette (linen, olive, slate) with CSS custom properties

    Heroicons Integration - Tree-shaken, theme-aware stroke icons

    SWR Data Fetching - Optimized API calls with loading states and skeletons

    Glassmorphism UI - Backdrop blur, subtle shadows, micro-animations

🏗️ Tech Stack

text
Frontend: Next.js 14.2 (App Router) + TypeScript 5.5
Styling: Tailwind CSS 3.4 + shadcn/ui + OKLCH CSS Variables
Icons: @heroicons/react 2.1 (outline stroke system)
Data: SWR 2.2 + TypeScript interfaces
Routing: Next.js App Router + Dynamic Segments
UI: Custom glassmorphism components + Tailwind animations

🎨 Design System

CSS Custom Properties (globals.css):

text
Primary: --surface (linen/charcoal), --white (off-white), --dark (contrast)
Accents: --emphasis (dusty olive), --accent (blue slate), --neutral (pale oak)
Usage: bg-[hsl(var(--surface))], text-[hsl(var(--dark))], stroke-[hsl(var(--emphasis))]

Theme Features:

    ✅ Automatic dark mode (prefers-color-scheme)

    ✅ Consistent spacing (p-4/8/12/16, gap-4/8/12/16)

    ✅ Rounded components (rounded-xl/2xl/3xl)

    ✅ Subtle shadows (shadow-md/lg/xl/2xl)

    ✅ Smooth transitions (duration-200/300/400/500)

📁 Project Structure

text
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

git clone <repo> wellness-haven
cd wellness-haven
npm install

# Environment (optional)

cp .env.example .env.local

# Development

npm run dev

# Production Build

npm run build && npm start

🔧 API Endpoints

text
GET /api/treatments # All treatments + slugs
GET /api/doctors # Doctor availability
POST /api/bookings # Create booking (TBD)

🎯 User Flows

    Browse Treatments → /treatments/[slug] → Hero image + symptoms → Book

    Book Treatment → /booking → Step 1 (Treatment) → Step 2 (Doctor/Time) → Step 3 (Details) → Confirm

    Mobile Optimized → Swipe carousel, touch-friendly buttons, responsive grids

📱 Responsive Breakpoints
Screen Classes Features
Mobile sm: 2-col symptoms → 1-col, smaller nav
Tablet md: Side-by-side layout, larger text
Desktop lg: 2-col main content, expanded spacing
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

🤝 Contributing

    Fork → Branch (feat/treatment-carousel)

    npm run dev → Test changes

    Lint: npm run lint

    PR with screenshots

📄 License

MIT - Built for production wellness clinics and spas.

Built with ❤️ | December 2025 | Ready for Vercel/Netlify deployment
