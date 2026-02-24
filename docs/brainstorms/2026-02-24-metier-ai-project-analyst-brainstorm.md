# Brainstorm: Metier AI Project Analyst -- Status Report Generator

**Date:** 2026-02-24
**Status:** Draft
**Participants:** Brainstorm session with Claude

---

## What We're Building

An AI-powered **project status report generator** branded as a Metier tool. Users upload project data (Excel exports, MS Project XML, CSV, or free-text notes) and the AI produces professional, structured status reports aligned with Metier's Project Excellence framework.

**The core value proposition:** Replace 4-8 hours of manual analyst work per project per week with an AI that reads raw project data and writes the status reports, executive summaries, and steering committee briefs that consultants and PMO teams produce today.

### Target Users

1. **Metier consultants** -- Use during client engagements to produce analyses faster, freeing time for higher-value advisory work.
2. **Client PMO teams** -- Use independently after Metier sets them up; ongoing license/subscription model.

### Why This First

- Status reporting is the #1 time sink in prosjektstyring (project control)
- Clients already have the data (Excel, MS Project, SharePoint) -- no new data collection needed
- Builds on the existing DNV risk assessment tool's architecture and Metier branding
- Clear, measurable ROI: hours saved per week per project
- Natural expansion point into schedule analysis, cost/EVM, and risk modules later

---

## Why This Approach

### Approach chosen: Focused Status Report Generator (with modular expansion roadmap)

We evaluated three approaches:

| Approach | Description | Verdict |
|----------|-------------|---------|
| **1. Status Report Generator** | Single-purpose tool for automated status reports | **Selected** -- focused, fast to ship, proves value |
| 2. Multi-Module Suite | Broad platform covering status, schedule, cost, risk | Deferred -- long-term vision, build modules incrementally |
| 3. Conversational AI Advisor | ChatGPT-like interface for ad-hoc project questions | Rejected for now -- too unstructured, harder to productize |

**Rationale:** Ship something valuable fast. Learn from real client usage. Expand into modules (schedule health, EVM, risk) based on demand. The modular architecture should be designed from day one even though only one module ships first.

---

## Key Decisions

### 1. Input format: File upload + paste
Users upload Excel (.xlsx), MS Project XML (.xml/.mpp export), CSV, or paste free-text project notes. The tool parses structured data and uses AI to interpret unstructured text. No direct integrations with Primavera, SharePoint, or MS Project in v1 -- that comes later.

### 2. Output format: Multiple report types
The AI generates different report styles depending on audience:
- **Executive summary** (1 page): Traffic light status, key risks, headline metrics
- **Steering committee brief** (2-3 pages): Progress vs plan, cost summary, top risks with mitigations, decisions needed
- **Detailed project report** (5+ pages): Full analysis with schedule status, cost breakdown, risk register update, resource utilization, trend analysis

### 3. Framework alignment: Metier Project Excellence
Reports are structured around Metier's prosjektstyring methodology:
- Progress against baseline (schedule)
- Cost performance (budget vs actual, forecast)
- Risk status (top risks, new risks, closed risks)
- Decision gate readiness
- Recommended actions

### 4. Bilingual: Norwegian and English
Full support for both languages, following the pattern established in the DNV risk tool.

### 5. Delivery: Standalone web app
Start as a self-contained web application (like the DNV tool). Later phases add integrations (SharePoint connector, MS Project plugin, Teams bot, API).

### 6. Dual-user design
- **Consultant mode:** Metier branding, white-label output for client delivery
- **Client mode:** Simpler interface, Metier branding as "powered by"

Both modes use the same fixed report templates in v1. The distinction is primarily branding and output formatting, not feature gating.

---

## Scope -- What's In v1

- File upload for project data (Excel, CSV, XML, free text)
- AI analysis using Claude API (structured prompts grounded in Metier methodology)
- Three report output types (executive summary, steering committee brief, detailed report)
- Export as PDF (via print) and copy-paste; Word export is a stretch goal for v1
- Norwegian and English language support
- Metier branding
- Example project data for demo/training

## Scope -- What's NOT in v1

- Direct integrations with MS Project, Primavera, SharePoint, or any external system
- Real-time monitoring or scheduled analysis
- Multi-project / portfolio view
- User accounts, authentication, or multi-tenancy
- Historical trend analysis (comparing reports over time)
- Schedule health checker module
- Cost/EVM analyst module
- Risk register module (existing DNV tool covers this separately)

---

## Long-Term Vision (Module Roadmap)

The status report generator is Module 1 of a broader **Metier Prosjektstyring AI Suite**:

| Module | Function | Phase |
|--------|----------|-------|
| **1. Status Reporter** | AI-generated status reports from project data | v1 (this project) |
| 2. Schedule Analyst | Schedule quality checks, critical path analysis, float erosion detection | v2 |
| 3. Cost/EVM Analyst | Earned value calculations, cost forecasting, variance analysis | v2 |
| 4. Risk Analyst | Risk identification, Monte Carlo input prep, risk reporting (evolves DNV tool) | v3 |
| 5. Portfolio Viewer | Cross-project analysis, resource conflicts, strategic alignment | v3 |
| 6. Integrations | SharePoint, MS Project, Primavera P6, Teams connectors | v2-v3 |

---

## Resolved Questions

1. **Data parsing complexity:** Client data is **messy and varied** -- every client uses different Excel layouts, column names, and formats. The AI must be robust at interpreting inconsistent data. This is where LLMs excel: they can make sense of varied column names and structures better than rule-based parsers. Implication: the tool should accept flexible input and use the AI itself to normalize/interpret data before analysis.

2. **Report customization:** **Fixed templates in v1, customizable later.** Metier provides three standard "best practice" report formats (executive, steering committee, detailed). Client customization deferred to a future version based on real usage feedback.

3. **API key management:** **Metier pays, bundles cost.** Metier holds the API key and bundles AI usage into client subscription/engagement pricing. Simpler for clients, Metier controls the experience and quality. No BYOK in v1.

## Open Questions

1. **Architecture: frontend-only vs. backend required.** The DNV tool runs entirely in the browser with a hardcoded API key. This product uses Metier-managed API keys for paying clients, which means the key cannot be exposed in client-side code. Options: (a) add a lightweight backend/proxy to hold the key, (b) use a serverless function (e.g., Cloudflare Workers, Vercel Edge) as an API proxy, or (c) accept frontend-only with per-client key provisioning. This must be decided before planning.

2. **Insufficient data handling.** When uploaded project data is incomplete (e.g., schedule data but no cost data), should the tool: (a) generate a partial report covering only available dimensions, (b) flag gaps and ask the user for more data, or (c) both? This affects the prompt design and UX.

3. **Pricing model.** Per-report fee, monthly subscription, bundled with consulting engagements, or a combination? To be decided before commercial launch -- does not block the technical build.

4. **Competitive positioning.** How does this differentiate from Microsoft Copilot in Project? Metier's methodology and Norwegian governance expertise is the differentiator, but this needs validation with clients.

---

## Market Context

- **55% of enterprise PM tool buyers** cite AI as the top trigger for purchase (Capterra 2025)
- Only **14% of organizations** have deployed agentic AI in production; **38% are piloting**
- Major platforms (Monday.com, Asana, Smartsheet) are all adding AI status reporting -- but none are grounded in Norwegian project governance methodology
- **Metier's competitive moat:** 40 years of project data across 300+ major projects (1,000B+ NOK), Project Excellence framework, Norwegian public governance expertise (KS1/KS2/KSK), and trusted brand in the Norwegian market
