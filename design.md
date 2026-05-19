# FILE 1 — design.md

````md
# GitHub Xray — Technical Design Document

Version: 1.0
Status: MVP Execution
Owner: Product + Engineering

---

# 1. Executive Summary

GitHub Xray is an AI-powered GitHub profile analysis platform.

The product allows developers to enter a GitHub username and receive:
- developer score
- recruiter-style review
- strengths and weaknesses
- improvement suggestions
- developer archetype
- project analysis
- shareable profile report

The product is intentionally designed as:
- stateless
- fast
- lightweight
- highly shareable
- optimized for first 1K users

The goal is NOT to create another analytics dashboard.

The goal is:

```txt
GitHub Username → AI recruiter-style profile review
````

---

# 2. Product Goals

## Primary Goal

Build and launch a functional MVP within 10 days.

---

## Secondary Goals

* Reach first 1K users
* Build highly shareable developer reports
* Create reusable architecture for future AI utility products
* Keep infrastructure simple and cheap

---

# 3. Product Philosophy

The product should feel like:

```txt
A recruiter reviewing your GitHub profile.
```

NOT:

```txt
A statistics dashboard.
```

The experience should feel:

* emotional
* insightful
* useful
* visually polished
* fast
* modern

---

# 4. Core User Flow

```txt
User enters GitHub username
↓
Frontend calls /api/analyze
↓
Backend fetches GitHub data
↓
Backend extracts developer signals
↓
Backend computes scores
↓
Backend generates AI insights
↓
Frontend renders final report
↓
User shares report
```

---

# 5. Product Features

## MVP Features

### Profile Analysis

* GitHub profile fetch
* Repository analysis
* README analysis
* Tech stack detection
* Project quality scoring

---

### AI Review

* Recruiter-style review
* Strengths
* Weaknesses
* Improvement suggestions
* Developer archetype

---

### Scoring System

* Overall score
* Technical depth
* Professionalism
* Consistency
* Open source contribution quality

---

### Shareability

* Share cards
* LinkedIn sharing
* X/Twitter sharing
* Copy report link

---

# 6. Non-Goals (Avoid in MVP)

DO NOT BUILD:

* authentication
* social feed
* real-time collaboration
* complex dashboards
* browser extensions
* microservices
* contribution heatmap engine
* team systems

The first version must remain:

```txt
Simple, focused, fast.
```

---

# 7. Technical Architecture

# High-Level Architecture

```txt
Frontend (Next.js)
↓
API Route
↓
GitHub Fetch Layer
↓
Signal Extraction Engine
↓
Scoring Engine
↓
AI Review Engine
↓
Final Report Generator
↓
Frontend Renderer
```

---

# 8. Frontend Architecture

## Stack

* Next.js
* TailwindCSS
* shadcn/ui
* Framer Motion

---

## Frontend Goals

The frontend should:

* feel premium
* load quickly
* animate smoothly
* work on mobile
* feel emotional and modern

---

## Pages

### Landing Page

Contains:

* hero section
* GitHub username input
* CTA button
* preview cards

---

### Scanning Page

Animated progress states:

```txt
Fetching repositories...
Analyzing projects...
Computing scores...
Generating recruiter review...
```

---

### Results Page

Contains:

* score card
* archetype
* strengths
* weaknesses
* recruiter review
* improvement suggestions
* top repositories

---

# 9. Backend Architecture

## Initial Backend Strategy

Use:

```txt
Next.js API Routes
```

Do NOT create separate backend initially.

Reason:

* faster shipping
* simpler deployment
* easier debugging
* reduced infrastructure complexity

---

# 10. GitHub Data Pipeline

# Step 1 — Fetch Profile

Endpoint:

```http
GET /users/{username}
```

Used For:

* bio
* followers
* account age
* branding quality
* portfolio presence

---

# Step 2 — Fetch Repositories

Endpoint:

```http
GET /users/{username}/repos
```

Params:

```txt
sort=updated
per_page=100
```

---

# Step 3 — Filter Repositories

Ignore:

* forks
* archived repos
* empty repos

Analyze only:

```txt
Top 5–10 meaningful repositories
```

---

# Step 4 — Fetch README

Endpoint:

```http
GET /repos/{owner}/{repo}/readme
```

Purpose:

* documentation quality
* professionalism
* architecture depth
* setup quality

---

# 11. Signal Extraction Engine

This is the MOST IMPORTANT system.

The product intelligence comes from:

```txt
Signal extraction
```

NOT raw AI.

---

# Signal Categories

## Profile Signals

```ts
{
  hasBio,
  hasPortfolio,
  hasAvatar,
  accountAge,
}
```

---

## Technical Signals

```ts
{
  frontendProjects,
  backendProjects,
  aiProjects,
  systemsProjects,
}
```

---

## Quality Signals

```ts
{
  readmeQuality,
  deploymentScore,
  documentationScore,
  professionalism,
}
```

---

## Consistency Signals

```ts
{
  activeRepos,
  inactiveRepos,
  recentActivity,
}
```

---

# 12. Scoring Engine

The scoring engine must be deterministic.

AI must NOT compute scores.

---

# Score Categories

```ts
{
  overall,
  consistency,
  technicalDepth,
  professionalism,
  projectQuality,
  openSource,
}
```

---

# Archetypes

Examples:

* AI Builder
* Frontend Craftsman
* Hackathon Builder
* Systems Engineer
* Open Source Explorer

---

# 13. AI Review Engine

## AI Model

Use:

```txt
Gemini 2.0 Flash
```

---

# AI Responsibilities

AI should ONLY:

* interpret signals
* generate human-like review
* generate recruiter feedback
* generate improvements
* generate archetype summary

---

# AI Must NOT

* compute scores
* analyze raw GitHub JSON
* receive all repositories directly

---

# Expected AI Output

```json
{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "recruiterReview": ""
}
```

---

# 14. Database Strategy

Use:

```txt
Supabase
```

Purpose:

* analytics
* caching
* rate limiting

---

# Cached Reports

```txt
username → generated report
```

TTL:

```txt
24 hours
```

---

# 15. Analytics

Use:

```txt
PostHog
```

Track:

* visits
* analyze clicks
* report generation
* shares
* traffic source

---

# 16. Deployment

## Platform

Deploy using:

```txt
Vercel
```

---

# Environment Variables

```env
GITHUB_TOKEN=
GEMINI_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

# 17. Folder Structure

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

---

# 18. Existing Project Structure Rules

IMPORTANT:

The project already exists.

DO NOT:

* create nested Next.js apps
* create duplicate project folders
* scaffold new root apps

Work ONLY inside the existing root directory.

---

# 19. Existing Frontend Assets

Use:

```txt
/files/github-xray-v2-improved.html
```

as the frontend prototype reference.

Also use:

* screen-1-landing.svg
* screen-2-scanning.svg
* screen-3-results.svg

for:

* spacing
* UX flow
* visual quality
* animations

---

# 20. Final Engineering Goal

The final product should feel like:

```txt
A polished AI developer profile reviewer.
```

The system should prioritize:

* speed
* clarity
* UX
* shareability
* emotional usefulness

NOT infrastructure complexity.

````

---

# FILE 2 — engineering-rules.md

```md
# GitHub Xray — Engineering Rules

Version: 1.0

---

# 1. Core Rule

The goal is:

```txt
Ship fast.
Keep architecture clean.
Do not overengineer.
````

---

# 2. Existing Root Folder Rule

IMPORTANT:

DO NOT create a new Next.js project.

DO NOT create nested folders like:

```txt
/github-xray/github-xray
```

All implementation MUST happen inside the existing root folder.

---

# 3. Before Writing Code

ALWAYS:

1. inspect current folder structure
2. inspect package.json
3. inspect existing dependencies
4. inspect existing frontend assets
5. inspect design.md
6. inspect engineering-rules.md

DO NOT hallucinate missing files.

---

# 4. Phase-by-Phase Execution

Implement ONLY one phase at a time.

After each phase:

1. run project
2. verify logs
3. verify frontend
4. test APIs
5. test TypeScript
6. fix errors
7. commit changes

ONLY THEN continue.

---

# 5. Testing Account

Always test using:

```txt
Durgaprasad-Developer
```

Verify:

* GitHub profile fetch
* repo fetch
* scoring
* AI review
* frontend rendering

---

# 6. Logging Rules

Every important system MUST log:

* request lifecycle
* GitHub fetches
* scoring
* signal extraction
* AI calls
* errors
* cache usage

---

# Required Log Format

```ts
console.log("[GitHub Fetch] Fetching profile:", username)
console.log("[Signal Engine] Signals:", signals)
console.error("[AI Engine Error]", error)
```

---

# 7. Error Handling Rules

Every async operation MUST:

* use try/catch
* return structured errors
* log readable errors

Never swallow errors silently.

---

# 8. AI Rules

AI should ONLY:

* interpret signals
* generate insights
* generate recruiter review

AI must NEVER:

* compute scores
* receive raw GitHub JSON
* analyze all repositories directly

---

# 9. Repository Analysis Rules

Analyze ONLY:

```txt
Top 5–10 repositories
```

Prioritize:

1. pinned repos
2. starred repos
3. recently active repos

Ignore:

* forks
* archived repos
* empty repos

---

# 10. TypeScript Rules

Avoid:

```ts
any
```

Use proper interfaces and types.

---

# 11. Code Quality Rules

Code must be:

* modular
* typed
* readable
* testable
* extensible

Avoid:

* giant files
* duplicated logic
* magic numbers
* deeply nested logic

---

# 12. Frontend Rules

Frontend MUST:

* be mobile responsive
* preserve smooth animations
* feel premium
* match prototype flow

Convert prototype into:

```txt
Reusable React components
```

DO NOT embed raw HTML.

---

# 13. Backend Rules

Use:

```txt
Next.js API routes
```

DO NOT create separate backend initially.

---

# 14. Infrastructure Rules

DO NOT:

* create microservices
* add Docker unnecessarily
* add Kubernetes
* create message queues
* add authentication initially

Keep infrastructure lightweight.

---

# 15. Debugging Rules

Before moving phases verify:

* no TypeScript errors
* no runtime errors
* frontend works
* APIs respond correctly
* loading states work
* mobile responsive

---

# 16. Final Product Standard

The product should feel:

```txt
Fast.
Smart.
Human.
Shareable.
Polished.
```

NOT like a developer admin dashboard.

````

---

# FILE 3 — INITIAL_EXECUTION_PROMPT.md

```md
# GitHub Xray — Initial Execution Prompt

Read these files FIRST before writing any code:

1. design.md
2. engineering-rules.md

These are the implementation source of truth.

---

# Current Situation

The project already exists.

IMPORTANT:

DO NOT create another Next.js app.

DO NOT create nested project folders.

The mistakenly created nested `github-xray` folder is being deleted.

Implementation must happen ONLY inside the existing root directory.

---

# Existing Assets

Frontend prototype exists inside:

```txt
/files/github-xray-v2-improved.html
````

Use it as:

* UI reference
* layout reference
* animation reference
* UX flow reference

Also use:

* screen-1-landing.svg
* screen-2-scanning.svg
* screen-3-results.svg

for visual quality reference.

---

# FIRST TASK

Before writing ANY code:

1. inspect root folder
2. inspect package.json
3. inspect dependencies
4. inspect existing frontend assets
5. inspect TypeScript config
6. inspect Tailwind config
7. inspect design.md
8. inspect engineering-rules.md

Then:

* print folder structure
* print migration plan
* print files to create
* print files to modify

ONLY THEN begin implementation.

---

# PHASE EXECUTION RULE

Implement ONLY one phase at a time.

After every phase:

* run project
* verify frontend
* verify API
* verify logs
* fix errors
* explain changes

DO NOT continue with broken phases.

---

# REQUIRED TEST USER

Always test with:

```txt
Durgaprasad-Developer
```

---

# IMPORTANT PRODUCT PHILOSOPHY

This product is:

```txt
A recruiter-style GitHub profile reviewer.
```

NOT:

```txt
A statistics dashboard.
```

The output should feel:

* insightful
* emotional
* useful
* polished
* human

---

# MVP PRIORITIES

Priority order:

1. UX
2. Useful insights
3. Smooth frontend
4. Reliable GitHub analysis
5. Shareability
6. Speed
7. Infrastructure

---

# FINAL GOAL

Build a polished MVP capable of reaching first 1K users quickly with:

* fast shipping
* clean architecture
* simple infrastructure
* high-quality frontend
* useful AI analysis

```
```


# Existing Frontend Prototype Reference

IMPORTANT:

A complete frontend prototype and UX flow reference already exists at:

```txt
/home/durga-prasad/Git-XRay/files/github-xray-v2-improved.html
```

This file should be treated as:

* the primary frontend reference
* UX flow reference
* animation flow reference
* component structure inspiration
* layout reference
* visual direction for MVP

DO NOT ignore this file.

Before building frontend components:

1. inspect the HTML structure
2. inspect sections and layouts
3. inspect animations and transitions
4. inspect loading flow
5. inspect result rendering structure

Then:

* convert the prototype into reusable React components
* migrate into Next.js App Router architecture
* upgrade responsiveness
* improve maintainability
* preserve the existing UX philosophy

IMPORTANT:
DO NOT simply embed the raw HTML file.

The frontend must be:

* properly componentized
* modular
* Tailwind-based
* responsive
* production-ready

Use the prototype as the implementation and UX foundation, not merely as inspiration.

Also use these SVG references for maintaining UI quality and consistency:

* screen-1-landing.svg
* screen-2-scanning.svg
* screen-3-results.svg

These SVGs represent:

* landing experience
* loading/scanning state
* final results experience

The final frontend should preserve:

* the premium feel
* smooth transitions
* visual hierarchy
* emotional UX
* modern developer-tool aesthetic
