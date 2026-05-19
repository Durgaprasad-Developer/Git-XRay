# engineering-rules.md

# GitHub Xray — Engineering Rules & Execution Plan

Version: 1.0

This document is the implementation source of truth for engineering execution.

All implementation decisions, architecture, coding standards, debugging, and execution flow must follow this document.

---

# 1. Core Product Goal

GitHub Xray is an AI-powered GitHub profile reviewer.

The goal is:

```txt
GitHub Username → AI recruiter-style developer review
```

This is NOT:

* a GitHub analytics dashboard
* a contribution graph viewer
* a metrics-heavy platform

The product should feel like:

```txt
A recruiter reviewing your GitHub profile.
```

The experience should feel:

* fast
* modern
* insightful
* emotional
* shareable
* polished

---

# 2. Core Engineering Philosophy

Priority order:

1. Ship fast
2. Keep architecture clean
3. Keep frontend polished
4. Keep logic modular
5. Avoid overengineering
6. Iterate after launch

The first goal is:

```txt
Working MVP in under 10 days.
```

NOT:

* enterprise architecture
* distributed systems
* perfect scalability
* complex infrastructure

---

# 3. Existing Root Folder Rule

IMPORTANT:

The project already exists.

DO NOT:

* create another Next.js app
* create nested project folders
* scaffold a new root application

DO NOT run:

```bash
npx create-next-app github-xray
```

DO NOT create:

```txt
/github-xray/github-xray
```

All implementation MUST happen inside the existing root directory.

---

# 4. Existing Frontend Prototype

A complete frontend prototype already exists at:

```txt
/files/github-xray-v2-improved.html
```

This file is the:

* primary frontend reference
* UX flow reference
* visual direction reference
* layout structure reference
* animation reference

Before building frontend:

1. inspect the prototype carefully
2. inspect sections and layouts
3. inspect animations
4. inspect result flow
5. inspect loading flow

Then:

* convert into reusable Next.js React components
* migrate into App Router architecture
* improve responsiveness
* preserve UX philosophy

IMPORTANT:
DO NOT embed raw HTML directly.

The frontend must be:

* modular
* reusable
* Tailwind-based
* responsive
* production-ready

---

# 5. UI Quality References

Use:

* screen-1-landing.svg
* screen-2-scanning.svg
* screen-3-results.svg

as visual quality references.

These represent:

* landing experience
* scanning/loading state
* final results state

Preserve:

* premium feel
* visual hierarchy
* spacing quality
* smooth animations
* emotional UX

DO NOT redesign the product completely.

Upgrade while preserving intent.

---

# 6. Required Tech Stack

## Frontend

* Next.js
* TypeScript
* TailwindCSS
* Framer Motion
* shadcn/ui

---

## Backend

Use:

```txt
Next.js API routes
```

DO NOT create separate backend initially.

---

## AI

Use:

```txt
Gemini 2.0 Flash
```

---

## Database

Use:

* Supabase

ONLY for:

* caching
* analytics
* rate limiting

---

## Analytics

Use:

* PostHog

---

# 7. Required Folder Structure

```txt
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts
│   ├── page.tsx
│
├── components/
│   ├── landing/
│   ├── loading/
│   ├── report/
│
├── services/
│   ├── github/
│   ├── signals/
│   ├── scoring/
│   ├── ai/
│
├── lib/
├── types/
├── utils/
```

Keep code modular.

Avoid giant files.

---

# 8. Before Writing Any Code

ALWAYS:

1. inspect root folder
2. inspect package.json
3. inspect dependencies
4. inspect TypeScript config
5. inspect Tailwind config
6. inspect existing frontend assets
7. inspect design.md
8. inspect engineering-rules.md

THEN:

* print migration strategy
* print files to create
* print files to modify

DO NOT hallucinate missing files.

DO NOT assume structure without verification.

---

# 9. Logging Rules

Every important system MUST log:

* request lifecycle
* GitHub fetches
* signal extraction
* scoring
* AI requests
* errors
* cache usage

Required log format:

```ts
console.log("[GitHub Fetch] Fetching profile:", username)

console.log("[Signal Engine] Signals:", signals)

console.error("[AI Engine Error]", error)
```

Logs must make debugging easy.

---

# 10. Error Handling Rules

Every async operation MUST:

* use try/catch
* return structured errors
* log readable messages

Never swallow errors silently.

Frontend MUST handle:

* invalid usernames
* GitHub rate limits
* AI failures
* invalid JSON
* timeout issues
* empty repositories

Gracefully.

---

# 11. TypeScript Rules

Avoid:

```ts
any
```

Use:

* interfaces
* types
* proper schemas

Code must remain strongly typed.

---

# 12. AI Rules

AI should ONLY:

* interpret signals
* generate recruiter review
* generate strengths
* generate weaknesses
* generate improvements
* generate archetype summary

AI must NEVER:

* compute scores
* analyze raw GitHub JSON
* analyze all repositories directly

Before AI:

* preprocess repositories
* compute signals
* compute scores
* summarize repositories

AI receives ONLY structured data.

---

# 13. Repository Analysis Rules

Analyze ONLY:

```txt
Top 5–10 meaningful repositories
```

Prioritize:

1. pinned repositories
2. starred repositories
3. recently active repositories

Ignore:

* forks
* archived repos
* empty repos

---

# 14. Scoring Rules

Scoring MUST be deterministic.

DO NOT use AI for scores.

Score categories:

* overall
* technical depth
* professionalism
* consistency
* project quality
* open source quality

Archetypes examples:

* AI Builder
* Hackathon Builder
* Frontend Craftsman
* Systems Engineer
* Open Source Explorer

---

# 15. Frontend Rules

Frontend MUST:

* be responsive
* work on mobile
* preserve smooth animations
* feel premium
* feel modern
* preserve prototype flow

Convert prototype into:

* reusable React components
* modular sections
* scalable UI architecture

---

# 16. Infrastructure Rules

DO NOT:

* create microservices
* create Kubernetes setup
* add Docker unnecessarily
* create queues initially
* add authentication initially
* overengineer infra

Keep infrastructure lightweight.

This is an MVP for first 1K users.

---

# 17. Required Environment Variables

```env
GITHUB_TOKEN=
GEMINI_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

DO NOT hardcode secrets.

---

# 18. Phase-by-Phase Execution Plan

IMPORTANT:

Implement ONLY one phase at a time.

After every phase:

1. run project
2. verify frontend
3. verify logs
4. verify APIs
5. verify TypeScript
6. verify responsiveness
7. fix issues
8. explain changes

ONLY THEN continue.

---

# PHASE 0 — Project Inspection

Goals:

* inspect existing root structure
* inspect frontend prototype
* inspect dependencies
* inspect configs

Deliverables:

* migration plan
* implementation strategy
* folder verification

Verification:

* project runs successfully
* no TypeScript issues

---

# PHASE 1 — Frontend Migration

Goals:

* convert HTML prototype into components
* create landing page
* create scanning page
* create results page

Deliverables:

* responsive UI
* modular components
* smooth animations

Verification:

* mobile responsive
* no hydration issues
* animations work
* frontend matches prototype flow

---

# PHASE 2 — GitHub Fetch Layer

Create:

```txt
src/services/github/github.service.ts
```

Implement:

* fetch profile
* fetch repositories
* fetch README

Use:

* axios
* GitHub REST API

Verification:

* test with:

```txt
Durgaprasad-Developer
```

* logs visible
* invalid usernames handled
* rate limits handled

---

# PHASE 3 — Signal Extraction Engine

Create:

```txt
src/services/signals/signal-engine.ts
```

Extract:

* professionalism
* documentation quality
* deployment presence
* AI projects
* consistency
* project quality

IMPORTANT:
NO AI in this phase.

Verification:

```ts
console.log(signals)
```

Signals must feel meaningful and stable.

---

# PHASE 4 — Scoring Engine

Create:

```txt
src/services/scoring/scoring-engine.ts
```

Generate:

* overall score
* technical depth
* professionalism
* consistency
* archetype

Verification:

* strong profiles score higher
* weak profiles score lower
* scoring feels realistic

---

# PHASE 5 — AI Review Engine

Create:

```txt
src/services/ai/gemini.service.ts
```

Generate:

* recruiter review
* strengths
* weaknesses
* improvements
* archetype explanation

IMPORTANT:
Request JSON-only output.

Use:

```txt
responseMimeType: "application/json"
```

Verification:

* output valid JSON
* responses feel human
* no hallucinations

---

# PHASE 6 — API Integration

Create:

```txt
POST /api/analyze
```

Pipeline:

```txt
Fetch GitHub
↓
Extract Signals
↓
Compute Scores
↓
Generate AI Review
↓
Return Final Report
```

Verification:

* valid JSON response
* frontend integration works
* loading states smooth

---

# PHASE 7 — Frontend Integration

Connect frontend with backend.

Implement:

* loading states
* progress animations
* error states
* final report rendering

Verification:

* polished UX
* mobile responsive
* smooth transitions

---

# PHASE 8 — Analytics & Cache

Implement:

* PostHog analytics
* Supabase caching

Cache:

```txt
username → report
```

TTL:

```txt
24 hours
```

Track:

* analysis_started
* analysis_completed
* report_shared

Verification:

* cache works
* analytics visible

---

# PHASE 9 — Polish & Deployment

Deploy using:

* Vercel

Verify:

* production build
* environment variables
* frontend performance
* API stability
* mobile UX

---

# 19. Required Test Account

Always test using:

```txt
Durgaprasad-Developer
```

Verify:

* GitHub fetch
* signals
* scores
* AI review
* frontend rendering

---

# 20. Final Product Standard

The final product should feel:

```txt
Fast.
Human.
Polished.
Useful.
Shareable.
Modern.
```

NOT like:

* a raw analytics dashboard
* an admin panel
* a developer debugging tool

The final experience should feel:

```txt
Like an AI recruiter reviewing a developer profile.
```
