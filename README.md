# Vishwaa Shah — Portfolio

Personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

🌐 **Live** → [vishwaashah.vercel.app](https://vishwaashah.vercel.app)

---

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v3
- **Animations** — CSS transitions + IntersectionObserver
- **Canvas** — HTML5 Canvas (particle network hero)
- **Email** — Resend (contact form)
- **Deployment** — Vercel

## Features

- Particle network hero animation
- Scroll-triggered reveal animations
- Interactive terminal with portfolio commands
- Animated counter metrics
- Responsive across all devices
- Resume PDF served at `/resume.pdf`

## Project Structure
src/
├── app/              # Next.js App Router pages & API routes
├── components/
│   ├── layout/       # Nav, Footer
│   ├── sections/     # Hero, Story, Experience, Projects, Signals, Contact
│   └── canvas/       # Three.js & canvas components
├── content/          # All copy — projects, experience, skills, timeline
├── hooks/            # useInView, useCountUp
├── lib/              # utils, github, email helpers
├── styles/           # globals.css
└── types/            # TypeScript interfaces

## Getting Started

```bash
# Clone
git clone https://github.com/Vswashah/portfolio.git
cd portfolio

# Install
npm install

# Set up environment
cp .env.example .env.local

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```bash
RESEND_API_KEY=        # Resend API key for contact form
GITHUB_TOKEN=          # GitHub token for live stats
NEXT_PUBLIC_SITE_URL=  # Your production URL
```

## Deployment

Deployed on Vercel. Every push to `main` triggers an automatic deploy.

---

Built by [Vishwaa Shah](https://vishwaashah.vercel.app)
Then push:
bashcd ~/portfolio
git add README.md
git commit -m "docs: add README"
git push origin main
