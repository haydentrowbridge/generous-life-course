# CLAUDE.md

## Project Overview
This is a spiritual formation learning path prototype for Austin Stone Community Church. It transforms sermon content into an interactive, self-paced experience with embedded pause-point questions, Holy Habits activities, and prayer prompts.

## Tech Stack
- React 18 (Create React App)
- No external UI libraries — all custom components
- Deployed on Vercel

## Design System
The design uses warm, natural colors — parchment backgrounds, sage greens, golden accents, and earthy tones. Typography uses Cormorant Garamond (serif) for content and DM Sans for UI. The experience should feel calm, unhurried, and distraction-free.

## Key Design Tokens (in src/App.js)
- `T.bg` — parchment background (#F5F0E8)
- `T.sage` — primary accent, sage green (#6B8F71)
- `T.gold` — Holy Habits accent (#C4943A)
- `T.spirit` — prayer/spiritual accent (#8B7BA0)
- `T.serif` — Cormorant Garamond
- `T.sans` — DM Sans

## Content Architecture
Module 1 is fully built. The path has 5 modules total:
1. Vision — John Manning (done)
2. Foundation — Ross Lester
3. Heart — Halim Suh
4. Practice — Ross Lester
5. Joy — Kevin Peck

All content mapped in the Zettelkasten (see project docs).

## Commands
- `npm start` — dev server
- `npm run build` — production build
- `npx vercel --prod` — deploy
