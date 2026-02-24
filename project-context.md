# DNV ES - AI-Powered Project Risk Assessment Tool

## Project Goal
Build a sophisticated, visually appealing HTML-based tool that uses AI to assist project managers with project risk assessment, following DNV Energy Systems' risk framework.

---

## Case Project (Example Input)

### Project Description
A client currently undertakes audits of their high-pressure pipelines to assess their compliance with a named standard and to identify any infringements. To demonstrate compliance, all infringements are assessed to determine the tolerability of the associated risk.

### Contract & Client
- **Fixed price:** 600,000 Euros
- **Client status:** Gold customer
- **Terms:** Client's contractual T&Cs with high liability and fines for late deliveries

### Project Tasks
1. Screen against previous results from locations
2. Perform a site-specific risk assessment for the remaining two locations (in France and Algeria)

### Timeline
- Starts: First day of next month
- Duration: 5 months
- All final deliverables/reports must be submitted by end of 5 months

### Team & Resources
- 5 team members from different countries
- Only 2 resources with required high-pressure competence in Energy Systems
- Project Sponsor secured commitment from line manager of one specialist
- Resources from Malaysia and Australia
- Work involves sub-contractor expertise outside DNV ES
- London office responsible but has never worked for this client (client is known to DNV Energy System overall)

---

## DNV Opportunity & Project Categories

### Opportunity Categories (Sales)
| Category | Financial Threshold | Risk Level | Track |
|----------|-------------------|------------|-------|
| **A** | Amount >= 15 MNOK | HIGH | Executive Track (standard track + senior leadership/executive review) |
| **B** | Amount >= 2.5 MNOK and < 15 MNOK | MEDIUM | Standard Track (extensive ORA, financial review, sales review, contract/tax review) |
| **C** | Amount < 2.5 MNOK and margin >= 15% | LOW | Fast Track (short ORA, no review or only financial review) |

### Project Categories (Production)
- **Complex** - High financial / high risk
- **Regular** - Medium financial / medium risk
- **Simple or Very Simple** - Low financial / low risk

---

## DNV Risk Matrix (Threshold Values)

### Consequence Definitions

| Severity | Cost | Time | Performance |
|----------|------|------|-------------|
| **High** | Impact > 500K NOK | More than one month delay on finish date | Major faults requiring shutdown for revision causing unacceptable delays for customers |
| **Medium** | Impact 50K NOK - 500K NOK | Delay on major milestones but no impact on finish date | Faults with minor impact on system performance causing minor delays for some customers |
| **Low** | Impact < 50K NOK | Delay in individual activities without impact on major milestone or finish date | Minor faults without effect on system performance |

### Likelihood Definitions
| Level | Probability |
|-------|------------|
| **Low** | < 30% |
| **Medium** | 30% - 70% |
| **High** | > 70% |

### Risk Matrix (Severity x Likelihood)
|  | Low (<30%) | Medium (30-70%) | High (>70%) |
|--|-----------|----------------|-------------|
| **High** | YELLOW | RED | RED |
| **Medium** | GREEN | YELLOW | RED |
| **Low** | GREEN | GREEN | YELLOW |

---

## Risk Assessment Fields (per XLS template)
- Risk description
- Risk level (manually set)
  - Likelihood
  - Consequence
- Risk level last period (manually entered)
- Mitigating action
- Responsible (to be defined)
- Mitigating risk level (calculated)

---

## Tool Requirements (from Wilhelm's Brief)

### Inputs
1. Example project - specify category and size
2. Project context (case description)
3. DNV threshold values (risk matrix)

### Outputs
1. Overview of possible risks with suggested scores (overridable by project manager)
2. Suggested mitigating actions for each risk/uncertainty
3. Focus on flagging **risks/threats only** - do NOT focus on opportunities

### Development Phases
- **Phase 1:** Prompting that produces a good risk matrix and good mitigating actions
- **Phase 2:** Reusable agent for DNV projects

### Architecture
- **Single-page HTML app** - easy to share, easy to set up
- Showcase tool only (not exposing the AI/logic under the hood)
- Interactive dashboard for visualizing project risks
- Must have a solid **risk identification and scoring framework** underneath
- Framework must be grounded and reputable to back the Metier brand with quality

### Presentation
- Everything packaged in HTML
- **Metier brand styling** (see metier-brand-guide.md): Work Sans font, Primary Blue #00205B, Primary Beige #FFEAE4, clean and professional
- Nice layout is critical - the client should want more

---

## Reference: Wilhelm's Draft Risk Table (from Copilot)

### Threats
| # | Risk Type | Description | Probability | Consequence | Consequence Description | Mitigating Actions |
|---|-----------|-------------|-------------|-------------|------------------------|-------------------|
| 1 | Scope Creep | Additional work requested beyond contract scope without extra budget | Medium | Medium | Increased costs, delayed delivery | Clear scope definition, change control procedures, regular scope reviews |
| 2 | Expertise Gaps | Challenges coordinating with sub-contractor expertise outside DNV ES | Medium | High | Miscommunication, errors, rework, increased cost | Detailed subcontractor agreements, joint planning sessions, quality checks |
| 3 | Schedule Delays | Delays due to unforeseen technical or resource issues | Low | Low | Contractual penalties, client dissatisfaction | Contingency planning, buffer time in schedule, close monitoring |

### Opportunities
| # | Risk Type | Description | Probability | Consequence | Consequence Description | Mitigating Actions |
|---|-----------|-------------|-------------|-------------|------------------------|-------------------|
| 1 | Efficiency Gains | Streamlining audit processes through team collaboration and technology | Medium | Medium | Reduced time and cost, improved quality | Implement project management tools, regular team meetings, and training |
| 2 | Enhanced Expertise | Leveraging sub-contractor expertise outside DNV ES to improve audit quality | Medium | Medium | Higher accuracy and compliance, client satisfaction | Clear communication of expectations, integration workshops |
| 3 | Client Relationship Strengthening | Delivering value beyond compliance, e.g., risk insights | Low | Low | Repeat business, referrals, enhanced reputation | Proactive reporting, additional recommendations, regular client updates |

---

## Notes
- The tool should produce a **more sophisticated** output than the Copilot draft above
- Must be in **English**
- Risk process follows DNV ES stages: Context -> Identify -> Assess -> Plan -> Implement (with Communicate running throughout)
