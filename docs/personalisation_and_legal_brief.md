# FolioVeda Personalisation Module & Legal Counsel Brief

---

## 1. Executive Summary & Architecture Overview

The **Portfolio Personalisation Module** transforms FolioVeda from a static template builder into a decoupled, design-token-driven portfolio engine. It enables users to:
1. **Pick from 8+ distinct architectural styles** while guaranteeing **zero data loss** (content is strictly decoupled from presentation).
2. **Complete a 2-minute Smart Profile Intake** that automatically orders sections and drafts tone-calibrated headlines and bios under a **strict Zero-Hallucination mandate**.
3. **Generate an original custom theme inspired by any public portfolio URL** ("Make Mine Feel Like This") through abstract design token extraction, licensed Google Fonts substitution, and an automated mathematical **Similarity Guard**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Unified PortfolioContent Schema                      │
│   (Name, Verified Headline, Bio, Skills, Projects, Experience, Socials)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Renders identically across
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    FolioVeda Style Engine (Tokens)                     │
├───────────────────────────────────┬────────────────────────────────────┤
│ 8 Built-in Themes                 │ Custom Inspired Themes             │
│ • developer-terminal (Tech)       │ • Extracted Abstract StyleProfile  │
│ • minimal-editorial (Design)      │ • Closeness Slider (Loose/Med/Close│
│ • bold-poster (Creative)          │ • Similarity Guard (< 0.78 cutoff) │
│ • corporate-clean (Business)      │ • Open-Source Google Fonts         │
│ • creative-collage (Creative)     │ • Zero HTML/CSS/Asset Cloning      │
│ • case-study-heavy (Design)       │                                    │
│ • dark-showcase (Tech)            │                                    │
│ • playful-sticker (Creative)      │                                    │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 2. Core Modules & Endpoints

### 2.1 Unified Content Schema (`src/types/content.ts`)
Ensures that regardless of which theme is applied, the user's data remains structured and safe:
- Projects (titles, descriptions, tech tags, metrics, repository links, demo URLs).
- Career Experience (company, role, period, bullet highlights).
- Skills (canonical array of verified skills).
- Contact & Socials (GitHub, LinkedIn, Twitter, Portfolio, Email).

### 2.2 System Theme Packages (`src/lib/themes/definitions/`)
All 8 themes implement `ThemePackageSchema`:
- `colors`: background, surface, text, textMuted, border, accent, accentHover. Meets WCAG AAA/AA contrast ($\ge 4.5:1$).
- `typography`: headingFont, bodyFont, monoFont, headingWeight, scaleRatio.
- `spacing`: density (`compact`, `comfortable`, `spacious`), sectionPadding, cardGap.
- `motion`: level (`none`, `subtle`, `expressive`).
- `radii`: card, button, badge.
- `layout`: pattern (`split-hero`, `terminal-grid`, `centered-editorial`, `poster`, `dark-showcase`, `playful-sticker`, `case-study`, `masonry`), sectionOrder, component variants.

### 2.3 Smart Profile Intake & Zero-Hallucination Engine (`src/lib/ai/intake-copy.ts`)
- **4-Step Wizard (`/onboarding`):** Gathers discipline, career goal, target roles, top strengths, tone of voice (`formal`, `friendly`, `bold`), and proof links.
- **Factuality Contract:** The copy generator constructs headlines and bios exclusively from user-submitted tokens. An automated validator (`verifyZeroHallucination`) flags unverified claims or buzzwords ("fortune 500", "ex-faang", "10x engineer") unless provided in user data.
- **Mandatory Approval:** Generated copy is presented for explicit user review and verification before publishing.

### 2.4 Inspiration Engine & SSRF Protection (`src/lib/inspiration/`)
- **SSRF Guard (`safe-fetch.ts`):** Validates URLs, blocking private IPv4/IPv6 ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, `0.0.0.0`), link-local/cloud metadata (`169.254.169.254`), and local hostnames. Implements an 8-second timeout and 1.5MB response size cap.
- **Abstract Style Analyzer (`analyzer.ts`):** Extracts *only* high-level design tokens (mood, layout pattern, font category, surface luminance, density). Never stores or mirrors HTML, CSS, JavaScript, images, or personal identifying data.
- **Theme Synthesis (`theme-generator.ts`):** Converts the abstract style profile into an original theme package, substituting open-source Google Fonts for any proprietary font families.
- **Closeness Slider:** Lets users modulate aesthetic distance between `Loose`, `Medium`, and `Close`.

### 2.5 Similarity Guard (`src/lib/inspiration/similarity-guard.ts`)
- Standalone mathematical guard that computes multi-dimensional similarity (Color Euclidean distance $\Delta E$, layout fingerprint overlap, and font category match).
- **Threshold Rule:** If similarity exceeds `0.78`, the engine automatically pushes the design further away by altering accent hues and card spacing to guarantee distinct originality.

---

## 3. Legal Counsel Memorandum (Pre-Launch Review)

**TO:** General Counsel & Intellectual Property Legal Advisory  
**FROM:** FolioVeda Engineering Architecture Team  
**DATE:** October 2026  
**SUBJECT:** Intellectual Property, Copyright, and Fair-Use Compliance Analysis of the "Make Mine Feel Like This" Inspiration Engine  

### 3.1 Statutory & Jurisprudential Foundation
Under both U.S. Copyright Law (17 U.S.C. § 102(b)) and Indian Copyright Law (Copyright Act, 1957; *R.G. Anand v. Delux Films*), copyright protection extends only to **original works of authorship expressed in a tangible medium**. It strictly **does not extend** to:
1. Ideas, concepts, principles, or discovery (*Baker v. Selden*, 101 U.S. 99).
2. Layout concepts, visual alignments, or grid arrangements (*Feist Publications, Inc. v. Rural Tel. Serv. Co.*).
3. Raw color palettes or functional typographic classifications (*Alberto-Culver Co. v. Andrea Dumon, Inc.*).

### 3.2 Technical Safeguards Enforcing Copyright Compliance
FolioVeda’s Inspiration Link Engine is architected to ensure that no copyrightable expression is ever reproduced:
* **Zero Asset Copying:** The system **never** copies, stores, mirrors, or hotlinks:
  - HTML, CSS stylesheets, or JavaScript bundles.
  - Image assets (PNG, JPEG, WebP, SVG illustrations, or icons).
  - Video or audio files.
  - 3D models or animations.
* **Proprietary Font Protection:** Analyzed pages often use expensive proprietary font binaries (e.g., Circular, Neue Haas Grotesk). FolioVeda **never** downloads or references these binaries. Instead, it classifies the type category (`modern-grotesk`, `editorial-serif`, `monospace-code`) and substitutes licensed, open-source Google Fonts (`Plus Jakarta Sans`, `Playfair Display`, `JetBrains Mono`).
* **Original Layout Execution:** The output is rendered exclusively through FolioVeda’s own component library (`ThemeRenderer`). We do not mirror external DOM trees or classes.
* **Automated Similarity Guard:** To prevent near-identical look-and-feel issues, any output with a composite similarity index above `0.78` is automatically diversified before reaching the user.
* **Zero Scraped Personal Data:** The system ignores personal data (names, biographies, email addresses) of the analyzed site owner. The portfolio is populated strictly with the requesting user’s own data.

### 3.3 Terms of Service & DMCA Compliance
- **Mandatory User Consent:** Before analysis begins, the user must tick an explicit declaration: *"I'm using this only as inspiration and I will not publish anyone else's content as mine."*
- **Terms of Service Notice:** Section 3 of `/legal/terms` explicitly affirms: *"Inspired designs are original creations. Do not use others' text, images or branding."*
- **Notice & Takedown Procedure:** A dedicated public portal at `/legal/takedown` and endpoint at `/api/legal/takedown` receives DMCA and copyright notices, logging them directly in the database for 24-hour review and takedown by compliance staff.
- **Audit Logging:** All requests log the timestamp, user ID, and target URL for abuse tracking and blacklisting.

---

## 4. Verification & Testing Summary

The module is verified with an automated test suite comprising **13 test files and 54 tests**:
- `tests/personalisation-models.test.ts`: Zod schemas and database model validations.
- `tests/style-engine.test.ts`: Style registry and 8 theme token validations.
- `tests/style-gallery.test.ts`: Gallery queries, category/mood filters, and top recommendation scoring.
- `tests/smart-intake.test.ts`: Zero-hallucination compliance and role-specific section ordering.
- `tests/inspiration-safe-fetch.test.ts`: SSRF blocking of private IPv4/IPv6 and cloud metadata endpoints.
- `tests/inspiration-theme-generator.test.ts`: Theme synthesis and closeness slider modulation.
- `tests/similarity-guard.test.ts`: Mathematical similarity score calculation and threshold diversion.
- `tests/personalisation-e2e.test.ts`: Full end-to-end integration test + WCAG AAA contrast accessibility verification ($\ge 4.5:1$ across all 8 themes).
