# Reyco Electric — V4 Copy Update Plan

**Date:** 2026-03-30
**Scope:** Full site update to match v4 copy direction
**Status:** Planning only — no code changes in this document

---

## Overview

This document maps every change needed to bring the Jekyll site in line with the v4 copy document. It is organized by phase, with detailed file-by-file breakdowns, new frontmatter schemas, and a list of blocked items that require input from Dave before implementation.

---

## Table of Contents

1. [Pending / Blocked Items](#pending--blocked-items)
2. [Priority Order](#priority-order)
3. [Phase 1 — Layout & Architecture](#phase-1--layout--architecture)
4. [Phase 2 — High-Impact Content](#phase-2--high-impact-content)
5. [Phase 3 — Supporting Pages](#phase-3--supporting-pages)
6. [Phase 4 — Data & New Content](#phase-4--data--new-content)

---

## Pending / Blocked Items

Resolve these with Dave before starting the relevant sections. Do not write placeholder copy for these — leave marked `[PENDING]`.

| Item | Used In | Notes |
|------|---------|-------|
| Founding story (2–3 sentences from Dave about why he started Reyco) | `about.html` | Marked `[PENDING]` in v4 |
| Named employee example ("So-and-so started as a Helper and is now a Foreman") | `careers/field.html` | Marked `[PENDING]` in v4 |
| Phone number | All pages, nav, footer | v4 shows `(301) XXX-XXXX` — confirm whether to keep existing `(301) 843-1848` |
| 401(k) match rate | `careers/why-reyco.html`, `careers/field.html`, `careers/office.html` | v4 says 5%, current `why-reyco.html` says 7% — confirm with Dave |
| Vision / STD / LTD benefits | Why Reyco, Field, Office pages | v4 notes these are being added — do NOT add until confirmed |

---

## Priority Order

### Phase 1 — Layout & Architecture (do first — unblocks all content work)
1. Update `_layouts/service.html` — new `who_its_for` schema, quote block, 4-step grid
2. Update `_layouts/industry.html` — quote block, `why_reyco_heading`, `cta_label`
3. Create `careers/field.html` (new page)
4. Create `careers/office.html` (new page)
5. Update `_includes/nav.html` — careers dropdown

### Phase 2 — High-Impact Content (revenue pages)
6. Rewrite `_services/emergency.md`
7. Rewrite `_services/small-projects.md`
8. Rewrite `_services/construction.md`
9. Update `_industries/restaurants.md`
10. Update `careers/index.html`

### Phase 3 — Supporting Pages
11. Update `about.html`
12. Update `_industries/multifamily.md`
13. Update `_industries/government.md`
14. Update `_industries/retail.md`
15. Update `_industries/healthcare.md`
16. Update `careers/why-reyco.html`
17. Update `safety.html`
18. Update `service-area.html`

### Phase 4 — Data & New Content
19. Update `_data/stats.yml`
20. Update `_data/clients.yml`
21. Update `index.html` — careers teaser, services copy, about teaser
22. Write 4 new blog posts in `_posts/`

---

## Phase 1 — Layout & Architecture

### 1. `_layouts/service.html`

Three distinct changes to this layout:

#### 1a. New `who_its_for` schema

The current layout renders `who_its_for` as a flat tag/chip list. v4 replaces this with structured buyer callouts — each audience gets a titled block with their situation and Reyco's specific response.

**New frontmatter schema:**

```yaml
who_its_for:
  - type: "Audience Name"
    context: "Their situation or pain point."
    reyco_response: "What Reyco specifically does for this audience."
  - type: "Second Audience"
    context: "Their situation."
    reyco_response: "Reyco's response."
```

**Layout rendering:** Each item in `who_its_for` should render as a card or callout block with three parts:
- Heading: `type` value (e.g., "Facility Managers & Building Engineers")
- Body line 1 (labeled "The situation" or similar): `context`
- Body line 2 (labeled "What we do" or similar): `reyco_response`

Remove all chip/tag rendering logic. Replace with a loop over the new schema.

#### 1b. New `quote` field

If `page.quote` is set, render a styled pull quote block. Place it **before** the related services section at the bottom of the page.

**Frontmatter:**
```yaml
quote: "Quote text here. — Attribution, Company"
```

**Layout logic:**
```liquid
{% if page.quote %}
  <!-- render pull quote block -->
{% endif %}
```

#### 1c. 4-step `how_it_works` grid

The current grid layout assumes 3 steps. v4 adds a 4th step to the Construction service. The grid should handle both 3 and 4 steps gracefully:

- **3 steps:** render as 3-column row (current behavior)
- **4 steps:** render as 2×2 grid on mobile, 4-column row on desktop

No frontmatter schema change needed — the steps array already supports arbitrary length. Only the CSS/grid template needs updating.

---

### 2. `_layouts/industry.html`

Three additions:

#### 2a. Optional `quote` field

Same pattern as service layout. If `page.quote` is set, render a pull quote block after the `why_reyco` section.

```yaml
quote: "Quote text. — Attribution, Company"
```

#### 2b. Optional `why_reyco_heading` field

Some industry pages use a custom heading for the "Why Reyco" section (e.g., "Experience That Matters", "Why It Matters"). Add support for this optional override.

```yaml
why_reyco_heading: "Experience That Matters"
```

**Layout logic:**
```liquid
{% assign why_heading = page.why_reyco_heading | default: "Why Reyco" %}
<h2>{{ why_heading }}</h2>
```

#### 2c. Optional `cta_label` field

Some industry pages need a custom CTA label (e.g., "Discuss an Institutional Project" instead of the default).

```yaml
cta_label: "Discuss an Institutional Project"
```

**Layout logic:**
```liquid
{% assign cta_text = page.cta_label | default: "Get in Touch" %}
```

---

### 3. Create `careers/field.html` (new page)

New page. Use a new layout (`_layouts/careers-field.html`) or a standalone HTML page with these sections in order:

| Section | Content |
|---------|---------|
| Hero | Headline: "Build a Career with Your Hands" / Subhead: "Reyco's field team is 40 people strong..." |
| Career Ladder | Full 5-level ladder: Helper, Apprentice, Mechanic, Service Tech, Foreman — use v4 detailed descriptions for each level |
| What a Typical Week Looks Like | New section — prose description of a field week |
| Pay & Benefits | Detailed list (see below) |
| Why Field Guys Stay | Tenure stats + named employee example `[PENDING]` |
| CTA | "See Open Field Positions" → `/careers/#openings` |

**Pay & Benefits detail for this page:**
- Pay in top percentile for the market
- Health/dental: 100% employer-paid for employee coverage
- 401(k): [PENDING — confirm 5% or 7%] company contribution; 94% of employees participate
- IHS Peak fees covered
- PTO
- Company vehicle or vehicle allowance
- Tablet for field work
- Overtime availability

---

### 4. Create `careers/office.html` (new page)

New page. Sections in order:

| Section | Content |
|---------|---------|
| Hero | Headline: "Build the Business, Not Just Buildings" / Intro about scaling from $12M |
| Role Profiles | Three profiles: Project Manager, Estimator, Account Manager — each with "What you'll use" and "What makes it different here" subsections |
| Operations & Admin | Section for ops/admin roles |
| Pay & Benefits | Same benefits as field page, framed around salary roles |
| Why Professionals Stay | Tenure stats |
| CTA | "See Open Professional Positions" → `/careers/#openings` |

---

### 5. `_includes/nav.html`

Add a dropdown under "Careers" with four items:

| Label | URL |
|-------|-----|
| Field Careers | `/careers/field/` |
| Office & Professional | `/careers/office/` |
| Why Reyco | `/careers/why-reyco/` |
| Open Positions | `/careers/#openings` |

The top-level "Careers" nav item should remain clickable (linking to `/careers/`) and also trigger the dropdown on hover/focus.

---

## Phase 2 — High-Impact Content

### 6. `_services/emergency.md`

**Fields to update:**

| Field | Change |
|-------|--------|
| `title` | No change — keep "24/7 Service & Emergency Response" |
| `overview` | Full rewrite (see below) |
| `what_we_handle` | Remove 3 items, add 2 items (see below) |
| `who_its_for` | Complete rewrite to new 3-callout schema |
| `how_it_works` | Update step copy |
| `quote` | Add new field |
| `cta_primary` | Update to "Request Emergency Service" |

**New `overview`:**
```
Electrical problems don't wait for business hours. Neither do we. Reyco provides same-day and after-hours emergency response for commercial facilities across DC, Maryland, and Virginia. Our centralized dispatch team classifies your call, assigns the right technician, and gets someone on their way. Every tech carries a tablet with real-time job details. You'll get a digital invoice with full documentation — tech notes, photos, materials used, time on-site — typically by end of day.
```

**`what_we_handle` — keep/remove/add:**

| Action | Item |
|--------|------|
| KEEP | Circuit troubleshooting and power restoration |
| KEEP | Parking lot lighting failures |
| KEEP | Kitchen electrical failures |
| REMOVE | "Common area and corridor lighting for multifamily properties" (too narrow) |
| REMOVE | "On-site response within tight SLA windows" (too generic) |
| REMOVE | "Digital invoicing the same day" (moved into overview) |
| ADD | "Fire alarm system troubleshooting with proprietary vendor coordination" |
| ADD | "Emergency generator and UPS response" |

**New `who_its_for`:**
```yaml
who_its_for:
  - type: "Facility Managers & Building Engineers"
    context: "Your lights are out, your tenants are calling, and you need someone now."
    reyco_response: "Call us. We dispatch based on urgency and tech specialization. Our on-call rotation means there's always someone available, including nights and weekends."
  - type: "Property Management Companies"
    context: "You manage a portfolio and need one reliable electrical vendor across the DMV."
    reyco_response: "We handle Chase banks, Darden restaurants, multifamily common areas, and retail locations every week. One point of contact, consistent quality, digital documentation for your records."
  - type: "National Facility Services Companies"
    context: "You dispatch vendors through portals like ServiceChannel, Corrigo, or your own work order system."
    reyco_response: "We're set up to receive work orders, check in via IVR, report findings same-day, and submit quotes immediately. No chasing us for paperwork."
```

**New `how_it_works` steps:**
```yaml
how_it_works:
  - step: "Call"
    description: "Reach our dispatch team 24/7. Tell us what's happening and where."
  - step: "Dispatch"
    description: "We classify the call, assign a qualified tech based on the problem type, and confirm an ETA."
  - step: "Resolve"
    description: "Tech arrives, diagnoses, and fixes. Digital invoice with full documentation the same day."
```

**New `quote`:**
```yaml
quote: "I literally call Tom personally, and most of the time he says yes, I can have a tech. They are always willing to work with us time-wise and money-wise. — Katina O., Action Services Group"
```

---

### 7. `_services/small-projects.md`

**Fields to update:**

| Field | Change |
|-------|--------|
| `headline` | ADD new field: "The Work That Keeps Your Building Current" |
| `overview` | Full rewrite (see below) |
| `what_we_handle` | Update LED item, add 2 items, remove 1 item |
| `who_its_for` | Complete rewrite to 3-callout schema |
| `how_it_works` | Update step copy; rename "Complete" → "Execute" |
| `quote` | Add new field |
| `cta_primary` | Update to "Request a Quote" |

**New `headline` field** (add to frontmatter):
```yaml
headline: "The Work That Keeps Your Building Current"
```

**New `overview`:**
```
Many of our planned upgrade projects start from something we notice during a routine service call. A panel at capacity. Lighting due for a retrofit. An aging riser about to fail. We flag it, scope it, and handle it — often before it becomes an emergency. These projects are typically under $300,000, run a few days to a few weeks, and make a real difference in the safety, efficiency, and value of your facility.
```

**`what_we_handle` — keep/remove/add:**

| Action | Item |
|--------|------|
| KEEP | Panel and riser upgrades |
| KEEP | EV charging installation |
| KEEP | Generator replacements |
| KEEP | Tenant fit-outs |
| KEEP | Signage circuits |
| UPDATE | LED lighting item → "LED lighting retrofits and controls upgrades to meet BEPS and energy-performance requirements" |
| ADD | "Fire alarm system upgrades and integration" |
| ADD | "Corridor and common-area renovation electrical work" |
| REMOVE | "Code compliance corrections identified during inspections" (covered by updated BEPS item) |

**New `who_its_for`:**
```yaml
who_its_for:
  - type: "Property Managers with Aging Buildings"
    context: "Your panels are at capacity, your risers are original to the building, and you're getting code notices."
    reyco_response: "We scope upgrade programs across portfolios, coordinate around tenants, and handle the permitting. Many of our property management clients started with one building and now use us across their entire portfolio."
  - type: "Facility Managers Planning Capital Work"
    context: "You have budget approval for an upgrade and need a contractor who will hit the price and the schedule."
    reyco_response: "Our estimating is accurate — customers tell us the final cost matches the quote, with extras only from approved change orders. We assign a dedicated project manager and superintendent to every job."
  - type: "Building Owners Facing Compliance Deadlines"
    context: "DC BEPS, Virginia EV-readiness mandates, or insurance requirements are forcing your hand on electrical upgrades."
    reyco_response: "We know these requirements because we do this work every week. Panel programs, lighting retrofits, EV infrastructure — we can scope it, price it, and schedule it around your operations."
```

**New `how_it_works` steps:**
```yaml
how_it_works:
  - step: "Scope"
    description: "We assess the work — often from a service visit we've already made. You get a detailed quote."
  - step: "Schedule"
    description: "We coordinate around your tenants, your operations, and your timeline."
  - step: "Execute"
    description: "Dedicated PM and superintendent. Regular updates. Clean close-out documentation."
```

Note: The third step was previously labeled "Complete" — rename to "Execute."

**New `quote`:**
```yaml
quote: "Reyco's estimating is pretty much in line. The only time they get extra money is if there's approved change orders. They're a good partner. — Richard P., Piece Management"
```

---

### 8. `_services/construction.md`

**Fields to update:**

| Field | Change |
|-------|--------|
| `headline` | ADD new field: "When the Job Demands More" |
| `overview` | Full rewrite (see below) |
| `what_we_handle` | Update and add items (see below) |
| `who_its_for` | Complete rewrite to 3-callout schema |
| `how_it_works` | Rewrite all steps + ADD 4th step |
| `quote` | Add new field |
| `cta_primary` | Update to "Discuss a Project" |

**New `headline` field:**
```yaml
headline: "When the Job Demands More"
```

**New `overview`:**
```
Reyco has delivered over $7 million in complex electrical work for institutional clients, general contractors, and portfolio owners. These are the projects that require professional estimating, dedicated project management, and field crews with the credentials to work in restricted environments. We take on a select number of larger projects at a time — enough to keep our best crews engaged and our institutional relationships strong, without overextending.
```

**`what_we_handle` — keep/remove/add:**

| Action | Item |
|--------|------|
| KEEP | Electrical infrastructure for institutional and government facilities |
| UPDATE | Medium-sized items → "Medium-sized renovation and tenant fit-out projects for institutional owners and GCs" |
| ADD | "Ground-up electrical for QSR and retail buildouts — where we often stay on as the ongoing service provider" |
| ADD | "Multi-floor retrofit programs in high-security environments with badged access" |
| ADD | "Professional estimating, submittals, project management, and stored-material billing" |
| REMOVE | Any remaining generic line items not covered above |

**New `who_its_for`:**
```yaml
who_its_for:
  - type: "General Contractors"
    context: "You need a reliable electrical sub who shows up on time, manages their scope, and doesn't surprise you at close-out."
    reyco_response: "Our project managers run weekly cost-to-complete tracking, our superintendent visits every job at least weekly, and our estimators stay involved through buyout so nothing falls through the cracks. We've worked with GCs like Donohoe across multiple divisions and project types for years."
  - type: "Institutional Owners & Procurement Teams"
    context: "You need a contractor with the EMR, the insurance, the badged access, and the documentation standards to pass your due diligence."
    reyco_response: "EMR 0.81. Top 10% nationally. Experience at the World Bank, IFC, IDB. We can send our credentials package today."
  - type: "Portfolio Owners Running Multi-Site Programs"
    context: "You have a panel replacement program, a lighting retrofit rollout, or a renovation campaign across multiple properties."
    reyco_response: "We execute programmatic work across portfolios with consistent pricing, consistent crews, and consistent documentation. One partner instead of five different subs."
```

**New `how_it_works` steps (4 total):**
```yaml
how_it_works:
  - step: "Estimate"
    description: "Our team reviews drawings in AccuBid and puts together a detailed number. If awarded, we do a full buyout with the estimator staying involved to catch any gaps."
  - step: "Kickoff"
    description: "We assign a PM and superintendent. The foreman comes in for a full review of drawings, submittals, and key details before starting."
  - step: "Execute"
    description: "Weekly PM meetings tracking percent complete, cost-to-complete, and manpower. Superintendent on-site at least weekly."
  - step: "Close Out & Convert"
    description: "Warranty letters, as-builts, O&Ms, lien waivers. And when the GC moves on, our account managers introduce themselves to the building team for ongoing service. Many of our longest service relationships started this way."
```

**New `quote`:**
```yaml
quote: "I've been working with Reyco since 2012. In 14 years, I've dealt with four people. They're a highly valued vendor. Dave will call me and say, there's going to be a change here — he keeps me informed. — Richard P., Piece Management"
```

---

### 9. `_industries/restaurants.md`

**Fields to update:**

| Field | Change |
|-------|--------|
| `headline` | Update to "When the Lights Go Out, the Revenue Stops" |
| `subhead` | Update (see below) |
| `overview` | Full rewrite to include Darden brands, Starbucks |
| `electrical_needs` | Add one item |
| `why_reyco` | Rewrite |
| `clients` | Add Capital Grille, Yard House, Cheddar's, Starbucks; update Darden listing |
| `quote` | Add new field |

**New `subhead`:**
```
In a restaurant, electrical problems are revenue problems. A tripped breaker shuts down a kitchen line. A failed parking lot light becomes a safety liability.
```

**New `overview`:**
```
In a restaurant, electrical problems are revenue problems. A tripped breaker shuts down a kitchen line. A failed parking lot light becomes a safety liability. A brand-standard uplift that runs over schedule means the store stays closed an extra day. Reyco serves national QSR and restaurant chains across the DMV including Darden brands (Capital Grille, LongHorn, Olive Garden, Yard House, Cheddar's), Starbucks, Raising Cane's, and others. We handle everything from emergency service calls to full restaurant buildouts.
```

**`electrical_needs` addition:**
- ADD: "Ongoing service for multi-location portfolios"

**New `why_reyco`:**
```
Speed and reliability. When a chain operator dispatches us through their work order platform, we respond quickly and get it done right the first time. Our techs know restaurant electrical — kitchen circuits, walk-in cooler lines, exterior signage, hood systems. For buildout work, we often remain the ongoing service provider after construction is complete.
```

**`clients` update:**
- Existing Darden listing → expand to include: Capital Grille, LongHorn, Olive Garden, Yard House, Cheddar's
- ADD: Starbucks
- ADD: Raising Cane's (if not already present)

**New `quote`:**
```yaml
quote: "Rivian doesn't care that Reyco is expensive, because they know that Reyco knows every aspect of it — they're willing to pay whatever it takes. — Richard P., Piece Management"
```

---

### 10. `careers/index.html`

This page becomes a hub — it no longer contains the full career ladder or all job listings.

**Changes:**

| Section | Change |
|---------|--------|
| Hero subhead | Update to: "Whether you're a Helper looking to start in the trades, a licensed journeyman who wants better pay and variety, or a project manager who wants to run real projects on professional systems — we're hiring across the board." |
| Career Ladder | REMOVE from this page (it moves to `careers/field.html`) |
| Job Listings | Simplify or keep as anchor only — link to `#openings` from nav dropdown |
| New section | Add two-card split section below hero for Field Careers and Office & Professional Careers (see below) |

**New two-card section:**

Each card should include:
- Track name (Field Careers / Office & Professional Careers)
- 2–3 sentence description of who this track is for
- CTA button linking to respective page

Card 1 — Field Careers:
- Description: Helpers, apprentices, mechanics, service techs, and foremen. Work on commercial facilities, institutional buildings, and QSR buildouts across the DMV.
- CTA: "Explore Field Careers" → `/careers/field/`

Card 2 — Office & Professional Careers:
- Description: Project managers, estimators, and account managers. Help run a $12M+ contractor with real systems and real clients.
- CTA: "Explore Office Careers" → `/careers/office/`

---

## Phase 3 — Supporting Pages

### 11. `about.html`

**Changes:**

| Section | Change |
|---------|--------|
| Values section heading | Change from "How We Operate" / "What Sets Us Apart" → "What We Stand For" |
| Values/pillars | Replace current content with three named pillars (see below) |
| HQ section | Minor wording updates to match v4 (review against v4 copy doc) |

**Three new value pillars:**

**Safety First**
- Reyco's EMR is 0.81 — top 10% nationally. That safety record is what gets us into World Bank, IFC, and high-compliance institutional facilities.

**Always Responsive**
- Our 24/7 dispatch means we've never turned a service customer away for capacity. When you call, someone answers.

**People Matter**
- 100% employer-paid health and dental. 401(k) with [PENDING — confirm 5% or 7%] company contribution. Paid apprenticeship for field staff.

---

### 12. `_industries/multifamily.md`

| Field | Change |
|-------|--------|
| `headline` | Update to "Keeping the Building Running for Every Tenant" |
| `overview` | Rewrite (see below) |
| `electrical_needs` | Add 2 items |
| `why_reyco` | Update (see below) |

**New `overview`:**
```
Aging multifamily stock across the DMV means aging electrical infrastructure. Panels at capacity, risers that need replacement, common area lighting overdue for an upgrade, and new requirements for EV charging. Reyco works with property management companies to handle both day-to-day service calls and planned capital upgrades.
```

**`electrical_needs` additions:**
- ADD: "Fire alarm and life-safety system electrical work"
- ADD: "Programmatic upgrade work across multi-property portfolios"

**New `why_reyco`:**
```
Electrical work in occupied buildings needs careful scheduling, clean execution, and on-time completion. We coordinate around your operations, communicate proactively, and handle close-out documentation. Many of our longest multifamily relationships started with a single service call and grew into ongoing upgrade programs.
```

---

### 13. `_industries/government.md`

| Field | Change |
|-------|--------|
| `headline` | Update to "Cleared to Work Where Others Can't" |
| `overview` | Full rewrite (see below) |
| `electrical_needs` | Add 2 items, update description style |
| `why_reyco_heading` | ADD new field: "Experience That Matters" |
| `why_reyco` | Update (see below) |
| `cta_label` | ADD new field: "Discuss an Institutional Project" |

**New `overview`:**
```
Reyco holds the safety credentials, compliance history, and institutional experience to work in environments that disqualify most electrical contractors. Our EMR of 0.81 clears the strict safety thresholds required by federal agencies and international institutions. We carry badged access for restricted facilities and have a track record of executing multi-year, phased work with stringent reporting and access controls.
```

**`electrical_needs` additions:**
- ADD: "Multi-floor, multi-year retrofit and renovation programs"
- ADD: "Emergency service with credentials for controlled buildings"
- UPDATE: Align description style to match v4 (e.g., "Professional project management with detailed compliance documentation")

**New frontmatter fields:**
```yaml
why_reyco_heading: "Experience That Matters"
cta_label: "Discuss an Institutional Project"
```

**New `why_reyco`:**
```
Reyco has delivered complex electrical work for the World Bank, IFC, IDB, and other international institutions in DC. This requires not just technical capability but the professionalism, documentation standards, and safety culture these organizations demand. When procurement teams run due diligence, Reyco's record makes the decision straightforward.
```

---

### 14. `_industries/retail.md`

| Field | Change |
|-------|--------|
| `headline` | Update to "Electrical That Supports the Customer Experience" |
| `overview` | Full rewrite (see below) |
| `electrical_needs` | Add 1 item, remove generic items |
| `why_reyco` | Update (see below) |

**New `overview`:**
```
Retail electrical is about track lighting that makes merchandise look right, exterior signage that brings customers in, parking lot lighting that keeps them safe, and reliable power that keeps POS systems running. Reyco handles the full range — from new store buildouts to ongoing service for multi-location operators.
```

**`electrical_needs` changes:**
- ADD: "Track and accent lighting installation and re-aiming"
- REMOVE: Any overly generic items not specific to retail

**New `why_reyco`:**
```
We build stores for national brands and then stay on as the service provider. When something goes wrong at 4 PM on a Friday, we already know the building and the systems. For multi-location operators, one electrical partner across the entire DMV simplifies vendor management.
```

---

### 15. `_industries/healthcare.md`

| Field | Change |
|-------|--------|
| `title` | Update to "Healthcare & Critical Facilities" (was "Healthcare") |
| `nav_label` | Update to "Healthcare & Critical Facilities" |
| `headline` | Update to "Where Electrical Reliability Is Life-Safety" |
| `subhead` | ADD: "Healthcare facilities, data centers, and critical infrastructure require electrical systems that cannot fail." |
| `overview` | Expand to include data centers (see below) |
| `why_reyco_heading` | ADD new field: "Why It Matters" |
| `why_reyco` | Update (see below) |

**New `overview`:**
```
Healthcare facilities, data centers, and critical infrastructure require electrical systems that cannot fail. Generator backup, UPS systems, critical power distribution, and code-compliant installations are non-negotiable. Reyco's safety record and experience with high-compliance environments make us a trusted partner where stakes are highest.
```

**New frontmatter field:**
```yaml
why_reyco_heading: "Why It Matters"
```

**New `why_reyco`:**
```
In a healthcare setting, an electrical contractor needs to understand infection control protocols, scheduling around patient care, and accreditation documentation. We bring the safety culture, professionalism, and project management rigor these environments demand.
```

---

### 16. `careers/why-reyco.html`

| Section | Change |
|---------|--------|
| Health benefit | Update to: "100% employer-paid for employee coverage. BlueChoice HMO with $0 deductible. Employer contributes over $9,000/year toward your individual medical coverage, $17,000+ for family." |
| 401(k) | Update participation stat: "94% of employees participate" / **CONFIRM rate with Dave before publishing — v4 says 5%, site currently says 7%** |
| Culture section | Update with v4 copy about Dave's estimating-to-PM handoff design; "team-first company that treats its people like adults" |
| Customer quotes | Add new section with three quotes: Katina O. (Action Services Group) and Richard P. ×2 (Piece Management) |

**Three quotes to add:**
1. "I literally call Tom personally, and most of the time he says yes, I can have a tech. They are always willing to work with us time-wise and money-wise." — Katina O., Action Services Group
2. "Reyco's estimating is pretty much in line. The only time they get extra money is if there's approved change orders. They're a good partner." — Richard P., Piece Management
3. "I've been working with Reyco since 2012. In 14 years, I've dealt with four people. They're a highly valued vendor." — Richard P., Piece Management

---

### 17. `safety.html`

| Section | Change |
|---------|--------|
| H1 | Update to: "Safety Is Not a Slogan. It's How We Work." |
| Credentials list | Add 3 new items (see below) |

**New credentials to add:**
- "Badged access for restricted institutional facilities"
- "Full compliance documentation available for procurement teams"
- "Highly favorable workers' compensation loss history"

---

### 18. `service-area.html`

| Section | Change |
|---------|--------|
| Coverage copy | Add specific county detail: Calvert County, St. Mary's County |
| Extended travel | Add Baltimore, Richmond, Virginia Beach, Hagerstown as named extended markets |
| New section | Add "Growing Along the I-95 Corridor" section about Richmond and Northern Virginia expansion |
| Quote | Add pull quote from Richard P. |

**New "Growing Along the I-95 Corridor" section:**
- Headline: "Growing Along the I-95 Corridor"
- Body: Describe Richmond and Northern Virginia expansion. Frame as following client relationships outward from core DMV market.

**Quote to add:**
```
"They go all the way to Virginia Beach for us, they go to Richmond, they go to Baltimore, Hagerstown. They go everywhere we go — up to three and a half hours away." — Richard P., Piece Management
```

---

## Phase 4 — Data & New Content

### 19. `_data/stats.yml`

Add one new stat entry:

```yaml
- value: "68+"
  label: "Active Accounts"
```

Confirm formatting matches existing entries in the file before adding.

---

### 20. `_data/clients.yml`

Add three clients to the trust bar:

```yaml
- name: "Chase"
- name: "Starbucks"
- name: "Petco"
```

Confirm the schema matches existing entries (some may have logo paths or additional fields).

---

### 21. `index.html` — Three updates

#### 21a. Careers teaser

Currently one generic CTA. Replace with two CTAs:
- "Field Careers" → `/careers/field/`
- "Office & Professional Careers" → `/careers/office/`

Update surrounding copy to reflect the two-track framing from v4.

#### 21b. Services overview

Review each service description block against v4 copy and update to match exactly. Do not paraphrase — use the exact language from the v4 copy document.

#### 21c. About teaser

Minor wording update to match v4. Review side-by-side and update the specific phrases that differ.

---

### 22. New Blog Posts

Create four new files in `_posts/`. Use the standard Jekyll post frontmatter for the site. Set `layout: post` and appropriate category/tag values.

| File | Title | Notes |
|------|-------|-------|
| `_posts/YYYY-MM-DD-panel-replace-vs-repair.md` | "When to Replace vs. Repair Your Electrical Panel" | Educational, targets facility managers |
| `_posts/YYYY-MM-DD-ev-charging-commercial.md` | "EV Charging for Commercial Properties: What Building Owners Need to Know" | Targets property owners; reference BEPS compliance angle |
| `_posts/YYYY-MM-DD-commercial-electrician-checklist.md` | "What to Look for in a Commercial Electrician (Checklist)" | SEO-targeted; include actual checklist items |
| `_posts/YYYY-MM-DD-were-hiring.md` | "We're Hiring: Field and Office Roles at Reyco" | Link to both `/careers/field/` and `/careers/office/` |

For each post, the date prefix in the filename should be the actual publish date. Write full body content for each post — these are not stubs.

---

## Implementation Notes

### Order enforcement

Do not start Phase 2 content work until Phase 1 layout changes are complete. The new `who_its_for` callout schema in the service pages **requires** the updated `_layouts/service.html` to render correctly. Pushing frontmatter changes before the layout is updated will break the service pages in production.

### Schema migration — `who_its_for`

When updating the three service files, the old flat array values must be fully replaced — do not leave any old tag-style strings alongside the new structured objects. The new layout will not render mixed schemas.

### Quote field

The `quote` field is a plain string in frontmatter. Include the attribution inline (separated by an em dash), not as a separate field. Example:

```yaml
quote: "Quote text here. — First Last, Company Name"
```

### 401(k) rate — do not publish until confirmed

Wherever the 401(k) match rate appears (why-reyco.html, careers/field.html, careers/office.html, about.html), leave a `[PENDING]` comment or placeholder until Dave confirms whether it is 5% or 7%. The discrepancy between the current site (7%) and v4 (5%) must be resolved before going live.

### `nav_label` for Healthcare

The healthcare industry page nav label change to "Healthcare & Critical Facilities" will affect the navigation rendering. Confirm that the industry nav is driven by `nav_label` in frontmatter and that the nav template is not hardcoded.

---

*End of plan. All items marked `[PENDING]` require Dave's input before implementation.*
