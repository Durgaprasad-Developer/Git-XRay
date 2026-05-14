# 🕵️‍♂️ Git-XRay: The 7-Second Recruiter First-Opinion Engine

## 🛑 The Problem Statement

### The Macro Context
In the modern tech hiring pipeline, entry-level Software Engineering (SWE) and internship postings are completely flooded. A single job opening can receive over 2,000 applicants within 48 hours. 

While automated Applicant Tracking Systems (ATS) filter out the bottom 80% based on keyword matching, hundreds of resumes still land on a human recruiter's desk.

### The Core Friction (The 7-Second Bottleneck)
Non-technical corporate recruiters spend an average of **6 to 7 seconds** scanning a single resume. To stand out, every student uses the exact same buzzwords: *"Built a scalable e-commerce API using Node.js, Express, and React."* 

Recruiters face two massive hurdles when trying to validate these claims:
1. **The AI/Tutorial Clone Epidemic:** Recruiters cannot tell if a student actually designed the system architecture themselves, copied a 4-hour step-by-step YouTube tutorial, or simply generated the application code using an AI model.
2. **The Technical Jargon Barrier:** Non-technical recruiters want to cross-reference the resume with the student's GitHub link, but clicking it redirects them to a confusing file directory layout (`/src`, `/public`, `package.json`, `tsconfig.json`). They do not have the engineering background, the command-line tools, or the time to audit raw repositories.

### The Systemic Gap
There is an absolute lack of a **"First-Opinion Triage Tool"** in the hiring pipeline. 

Recruiters are forced to make a blind gamble—either rejecting high-potential silent builders because their resumes look generic, or advancing candidates who look great on paper but merely copy-pasted a template code without understanding it.

---

## ✨ The Solution

**Git-XRay** is a lightweight, zero-setup developer intelligence utility that translates complex GitHub repository metadata into a **30-second scannable digest** for non-technical recruiters. 

Instead of replacing the technical interview or reading line-by-line source code, it acts as a primary verification engine. By pasting a single GitHub URL, recruiters get a clean, high-fidelity report card detailing a candidate's true **Builder Persona, Project Authenticity, and Coding Consistency**.

---

## 🔄 Core User Scenarios

### 🕵️‍♂️ Scenario A: The Recruiter Triage (Main Usecase)
* **Goal:** Validate a candidate before sending them to the expensive technical interview round.
* **Flow:** The recruiter copies the GitHub link from a candidate's resume, pastes it into Git-XRay, and immediately views a clean breakdown explaining what the student's top project actually does in plain English, alongside an originality/template score.

### 🚀 Scenario B: The Student Self-Audit (Viral Traffic Loop)
* **Goal:** Optimize a GitHub profile to look corporate-ready.
* **Flow:** A student pastes their own GitHub link into the tool before applying for a job. The engine generates their public scorecard and highlights critical gaps (e.g., *"Warning: Your top backend repo is missing an architecture diagram or README description. Recruiters will see this as an incomplete project."*).

---

## 🛠️ High-Level Feature Architecture

* **The Input:** A single, dead-simple landing page with one text box requiring a GitHub profile handle or repository URL.
* **The REST Extraction:** A lightweight backend that pings the public GitHub API to extract user metrics, repository `updated_at` timestamps, and raw `README.md` markdown text.
* **The Recruiter Dashboard:** Displays 3 simple widgets:
  * **The Builder Persona Tag:** (e.g., *Backend Orchestrator*, *Frontend Craftsperson*, *Automation Scraper*).
  * **The 2-Sentence Plain-English Blueprint:** A distilled summary explaining the operational complexity of their top original project.
  * **The Activity Pulse:** A timeline metric mapping the candidate's active coding frequency over the last 90 days.
