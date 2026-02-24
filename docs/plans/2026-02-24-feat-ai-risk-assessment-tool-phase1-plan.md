---
title: "feat: Build AI-Powered Project Risk Assessment Tool (Phase 1)"
type: feat
status: active
date: 2026-02-24
---

# Build AI-Powered Project Risk Assessment Tool (Phase 1)

## Overview

Build a single-page HTML application that uses the Anthropic Claude API to generate project risk assessments following DNV Energy Systems' risk framework. The tool takes a project description as input and produces a structured risk register with likelihood/consequence scoring, a visual 3x3 risk matrix, and suggested mitigating actions --- all styled with Metier branding.

The tool is a **showcase/demo** for DNV ES project managers, demonstrating how AI can accelerate the risk identification phase of project risk management. It follows a "Bring Your Own Key" (BYOK) model where users provide their own Anthropic API key.

## Problem Statement / Motivation

DNV ES project managers currently perform risk identification manually or with basic Copilot prompts that produce unsophisticated, generic output (see Wilhelm's draft in `project-context.md`). A well-engineered prompt system combined with a polished UI can:

1. Produce significantly more comprehensive and relevant risk identification
2. Ground the output in ISO 31000 / IEC 31010 methodology, lending credibility
3. Provide an interactive visualization that makes risk communication clearer
4. Demonstrate Metier/Tetra Tech's AI capabilities to DNV ES stakeholders

## Proposed Solution

A **single self-contained HTML file** (with embedded CSS and JS) that implements the following workflow:

```
User enters API key → User describes project → AI generates risks → User reviews/edits → Risk matrix updates live
```

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                  index.html                         │
│                                                     │
│  ┌──────────────┐  ┌────────────────────────────┐  │
│  │  Input Panel  │  │     Output Dashboard       │  │
│  │              │  │                            │  │
│  │ - API Key    │  │  ┌──────────┐ ┌─────────┐ │  │
│  │ - Project    │  │  │ 3x3 Risk │ │  Risk   │ │  │
│  │   Category   │  │  │  Matrix  │ │  Table  │ │  │
│  │ - Project    │  │  │ (visual) │ │ (editable│ │  │
│  │   Context    │  │  └──────────┘ │  list)  │ │  │
│  │ - Generate   │  │               └─────────┘ │  │
│  │   Button     │  │                            │  │
│  └──────────────┘  └────────────────────────────┘  │
│                                                     │
│  Claude API  ◄──── BYOK (in-memory only) ────►     │
│  (via CORS)                                         │
└─────────────────────────────────────────────────────┘
```

### Key Components

**1. Input Panel (Left/Top)**
- API key field (password input, stored in JS variable only, never persisted)
- Project category selector (dropdown: Complex / Regular / Simple)
- Project context textarea (free-text project description)
- "Generate Risk Assessment" button
- Loading state with spinner during API call

**2. AI Risk Engine (JavaScript)**
- Structured prompt that includes:
  - Expert risk consultant persona grounded in ISO 31000 / IEC 31010
  - DNV's 3x3 risk matrix definitions (likelihood + consequence thresholds from `project-context.md`)
  - Project category and context from user input
  - Instructions to output structured JSON with risk ID, category, description, likelihood, consequence, risk level, root cause, and mitigation
  - Guard rails against hallucination and generic output
- Calls Claude API directly from browser using `anthropic-dangerous-direct-browser-access: true` header
- Parses JSON response and populates the dashboard

**3. Risk Matrix Visualization (CSS Grid)**
- 3x3 grid matching DNV's matrix:
  ```
                     Consequence
                  Low      Medium     High
  Likelihood
  High          | YELLOW | RED    | RED    |
  Medium        | GREEN  | YELLOW | RED    |
  Low           | GREEN  | GREEN  | YELLOW |
  ```
- Color-coded cells (green/yellow/red)
- Risk "chips" positioned in the appropriate cell showing risk number
- Click on chip to highlight the corresponding row in the risk table
- Responsive layout

**4. Risk Register Table (Editable)**
- Columns: #, Category, Description, Likelihood, Consequence, Risk Level, Mitigating Action, Responsible
- Likelihood and Consequence are **editable dropdowns** (Low/Medium/High) so the PM can override AI suggestions
- When scores change, the risk level recalculates and the matrix visualization updates live
- "Responsible" column is a text input for the PM to fill in
- Row color-coding matching risk level (green/yellow/red accent)

**5. Export Functionality**
- "Export to CSV" button that downloads the risk register as a CSV file
- "Print / Save as PDF" button using `window.print()` with a print-optimized CSS stylesheet

**6. Metier Brand Styling**
- Work Sans font (Google Fonts)
- Primary Blue (#00205B) for headers, text, and primary UI elements
- Primary Beige (#FFEAE4) for soft backgrounds and accents
- White (#FFFFFF) for content areas
- UI Greys for borders and secondary text
- Color ratio approximately 70% blue / 20% beige / 10% white
- Clean, professional layout with generous whitespace
- CSS custom properties from `metier-brand-guide.md`

## Technical Considerations

### Claude API Integration
- Uses the Messages API endpoint: `https://api.anthropic.com/v1/messages`
- Required headers: `x-api-key`, `anthropic-version: 2023-06-01`, `content-type: application/json`, `anthropic-dangerous-direct-browser-access: true`
- Model: `claude-sonnet-4-20250514` (good balance of quality and speed for structured risk generation)
- Max tokens: ~4000 (sufficient for 8-12 risks with full detail)
- Temperature: 0.3 (lower temperature for more consistent, grounded output)

### Security
- API key stored in JavaScript variable only (in-memory) --- never written to localStorage, sessionStorage, cookies, or the DOM
- Key field uses `type="password"` to prevent shoulder surfing
- Clear disclaimer shown to users: "Your API key is held in browser memory for this session only and is sent only to Anthropic's API."
- No analytics, tracking, or external requests beyond the Claude API call
- Content Security Policy meta tag restricting connections to `api.anthropic.com` only

### Performance
- Single HTML file, no build step, no dependencies beyond Google Fonts CDN
- The Claude API call is the only network-dependent operation (typically 3-8 seconds)
- Risk matrix rendering and score recalculation are instant (pure DOM manipulation)
- Total file size target: under 50KB

### Accessibility
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on interactive elements (dropdowns, buttons, matrix cells)
- Keyboard navigation for the risk table and matrix
- Color is not the sole indicator --- risk levels also shown as text labels (GREEN/YELLOW/RED)
- Sufficient color contrast ratios for all text

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge --- last 2 versions)
- No IE11 support needed
- Uses CSS Grid, Fetch API, and ES6+ --- all widely supported

## Acceptance Criteria

### Core Functionality
- [ ] User can enter an Anthropic API key that is validated with a test call
- [ ] User can select a project category (Complex / Regular / Simple)
- [ ] User can enter a free-text project description
- [ ] Clicking "Generate" calls the Claude API and produces 8-12 categorized risks
- [ ] Each risk includes: category, description, likelihood, consequence, risk level, root cause, and mitigating action
- [ ] Risks are displayed in an editable table with dropdown selectors for likelihood/consequence
- [ ] Changing a risk's likelihood or consequence recalculates the risk level and updates the matrix
- [ ] The 3x3 risk matrix displays all risks as positioned chips with correct color coding
- [ ] Clicking a risk chip in the matrix highlights the corresponding table row (and vice versa)

### Quality & Polish
- [ ] Metier brand styling is applied consistently (colors, fonts, spacing per `metier-brand-guide.md`)
- [ ] Loading state with spinner and "Generating risk assessment..." message during API call
- [ ] Error handling: clear user-facing messages for invalid API key, network errors, malformed AI response
- [ ] The generated output is noticeably more sophisticated than the Wilhelm Copilot draft (more risks, better categorization, clearer mitigations)
- [ ] ISO 31000 / IEC 31010 methodology is referenced in the tool's footer or info section

### Export & Sharing
- [ ] "Export to CSV" produces a well-formatted CSV download of the risk register
- [ ] "Print" renders a clean, print-optimized version of the risk assessment

### Security
- [ ] API key is never persisted to storage or visible in the DOM
- [ ] Content Security Policy restricts external connections
- [ ] Disclaimer about API key handling is visible to users

### Delivery
- [ ] Entire tool is a single `index.html` file (with embedded CSS and JS)
- [ ] File can be opened directly in a browser (no server required)
- [ ] Works offline after initial Google Fonts load (fonts can fall back to Arial)
- [ ] The case project from `project-context.md` is included as a pre-filled example the user can run immediately

## Success Metrics

- **DNV PM reaction**: The tool produces a risk assessment that a project manager considers useful as a starting point (not just a generic list)
- **Output quality**: Generated risks are specific to the project context, not boilerplate
- **Usability**: A user unfamiliar with the tool can generate their first risk assessment within 60 seconds
- **Presentation quality**: The visual output is polished enough to include in a client-facing presentation

## Dependencies & Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Claude API CORS access changes or breaks | Low | The `anthropic-dangerous-direct-browser-access` header is documented and supported. Fallback: switch to a serverless proxy. |
| AI generates irrelevant or low-quality risks | Medium | Invest in prompt engineering with specific DNV context, ISO 31000 grounding, and explicit scoring criteria. Include the case project as a test benchmark. |
| Single HTML file becomes unwieldy at scale | Low | For Phase 1 this is fine. Phase 2 can split into modules if needed. |
| Metier brand fonts fail to load (offline use) | Low | Arial fallback specified. Optionally base64-encode a subset of Work Sans. |

## Implementation Approach

### File: `index.html`

The single file will be organized in this order:

1. **`<head>`**: Meta tags, CSP, Google Fonts link, `<style>` block with all CSS
2. **`<body>`**: Semantic HTML structure
   - Header with Metier logo/title
   - Input panel (API key, category, context, generate button)
   - Output dashboard (risk matrix + risk table side by side on desktop, stacked on mobile)
   - Footer with methodology note and disclaimer
3. **`<script>`**: All JavaScript at the end of body
   - API key management (in-memory)
   - Prompt construction function
   - Claude API call function (fetch with streaming optional)
   - Risk data model and state management
   - Matrix rendering function
   - Table rendering with edit handlers
   - Score recalculation logic
   - CSV export function
   - Print handler
   - Pre-filled example data from the case project

### Prompt Structure (Embedded in JS)

```
SYSTEM: You are a senior risk management consultant specializing in energy
infrastructure and industrial projects. You follow ISO 31000:2018 and
IEC 31010:2019 methodologies. You work for DNV Energy Systems.

USER: [Project category] [Project context] [DNV risk matrix definitions]
      Generate 8-12 project risks as JSON...
```

The full prompt will include the DNV threshold definitions from `project-context.md` and explicit instructions for JSON output format.

### Pre-filled Example

The case project (high-pressure pipeline audit, 600K EUR, Gold customer, 5 months) from `project-context.md` will be pre-loaded so users can click "Generate" immediately to see the tool in action.

## Sources & References

### Internal References
- Project specification: `project-context.md`
- Brand guidelines: `metier-brand-guide.md`

### External References
- [ISO 31000:2018 Risk Management Guidelines](https://www.iso.org/obp/ui/#iso:std:iso:31000:ed-2:v1:en)
- [IEC 31010:2019 Risk Assessment Techniques](https://www.iso.org/standard/72140.html)
- [Claude API CORS / Browser Access (Simon Willison)](https://simonwillison.net/2024/Aug/23/anthropic-dangerous-direct-browser-access/)
- [Anthropic API Messages Reference](https://docs.anthropic.com/en/api/messages)
- [DNV Project Risk Management Services](https://www.dnv.com/services/project-risk-management-2556/)
