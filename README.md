# The Generous Life — Module 1 Prototype

Interactive learning path prototype for Austin Stone's generosity formation pathway.

## Setup

```bash
npm install
npm start
```

## Deploy to Vercel

```bash
npx vercel --prod
```

## What This Is

A proof-of-concept for how sermon content can be transformed into an interactive spiritual formation experience:

- **Sermon with embedded pause points** — video pauses at key moments with check-in questions
- **Holy Habits Activity** — interactive reflection and study exercises after the sermon
- **Prayer prompts** — woven throughout, not tacked on at the end
- **Self-paced** — the learner moves at their own speed

## Module 1: What Is Generosity?
- **Speaker**: John Manning
- **Scripture**: 2 Corinthians 8:1-5, 9:6-8
- **Formation Arc**: Vision → awareness of what biblical generosity looks like

## Architecture

Single-page React app. No backend. All content is in `src/App.js`.

In production, this would connect to:
- Video player with actual sermon recordings
- User authentication and progress tracking
- Daily touchpoint notification system
- Data persistence for journal responses
