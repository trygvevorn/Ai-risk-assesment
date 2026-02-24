# Metier Brand Guide (Extracted from Brand Book)

## About
Metier became a Tetra Tech company on January 24th, 2023. Tetra Tech is a globally leading consulting and engineering company within environment, sustainable infrastructure and water.

**Tagline:** "Sammen gjor vi endring mulig." (Together we make change possible.)

---

## Logo
- **Logotype:** "Metier" with iconic angled "r", tagline "A TETRA TECH COMPANY" underneath
- **Primary logo:** White text on Primary Blue background (negative) / Primary Blue text on white (positive)
- **Secondary logo:** Monochrome black/white versions
- **Alternative soft logo:** Primary Beige text on Primary Blue background

---

## Primary Colors

| Name | Hex | RGB | PMS | CMYK | Usage |
|------|-----|-----|-----|------|-------|
| **Primary Blue** | `#00205B` | R0 G32 B91 | PMS 281 | C100 M85 Y5 K36 | Main brand color, headings, text, backgrounds |
| **Primary Beige** | `#FFEAE4` | R255 G234 B228 | PMS 2337 | C0 M8 Y11 K0 | Soft backgrounds, accent |
| **White** | `#FFFFFF` | R255 G255 B255 | - | C0 M0 Y0 K0 | Backgrounds, text on dark |

### Color ID Ratio
Primary Blue dominates (~70%), Primary Beige (~20%), White (~10%)

---

## Secondary Colors - Green (Academy & Project Systems / Construction)

| Name | Hex | RGB |
|------|-----|-----|
| Secondary Green 100 | `#C5F9DA` | R197 G249 B218 |
| Secondary Green 200 | `#8DF1B5` | R141 G241 B181 |
| Secondary Green 300 | `#0D896A` | R13 G137 B106 |
| Secondary Green 400 | `#1A5345` | R26 G83 B69 |

## Secondary Colors - Blue (Management Consulting / Digital)

| Name | Hex | RGB |
|------|-----|-----|
| Secondary Blue 100 | `#B4DBFF` | R180 G219 B255 |
| Secondary Blue 200 | `#77BEFF` | R119 G190 B255 |
| Secondary Blue 300 | `#59748D` | R89 G116 B141 |
| Secondary Blue 400 | `#245787` | R36 G87 B135 |

---

## UI and Background Colors

| Name | Hex | RGB |
|------|-----|-----|
| UI Grey 100 | `#F0F1F5` | R240 G241 B245 |
| UI Grey 200 | `#95979E` | R149 G151 B158 |
| UI Grey 300 | `#414148` | R65 G65 B72 |
| UI Black | `#0B0B0C` | R11 G11 B12 |

---

## Division Color Mapping

| Division | Primary Color | CTA + UI Color |
|----------|--------------|----------------|
| Management Consulting | Grey/Blue tones | Secondary Blue 300 |
| Academy & Project Systems | Light Green | Secondary Green 100 |
| Digital | Light Blue | Secondary Blue 100/200 |
| Construction | Dark Green | Secondary Green 300/400 |

---

## Typography

### Primary Font: **Work Sans** (Google Font)
- Easily accessible and integrable
- Fallback font: **Arial**

### Font Weights
| Weight | Usage |
|--------|-------|
| Thin | Decorative, minimal use |
| Extra Light | Decorative, minimal use |
| Light | Decorative, minimal use |
| **Regular** | **Primary body text** |
| Medium | Secondary emphasis |
| SemiBold | Sub-headings |
| Bold | Headings |
| **Extra Bold** | **Secondary emphasis, hyperlinks (with underline)** |
| Black | Decorative, heavy emphasis |

### Text Color Rules
- Headings, preambles, body text: **Primary Blue (#00205B)**
- Body text for larger documents: **Black is acceptable**
- On dark backgrounds: **White or Primary Beige**

### Google Fonts Import
```
https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap
```

---

## Shapes
- Derived from the iconic angled "r" in the logo
- Modified to have equal thickness in vertical and horizontal strokes
- Shortened downward stroke forms a perfect square when combined with 3 other parts
- **Only rotate in 90-degree turns** - never distort
- Available in Primary Blue, Primary Beige, and White (outline)
- The four shapes represent the four divisions and can be arranged as a square

---

## Icons
- Style: Regular, outlined, SVG format
- Primary color: **Primary Blue (#00205B)**
- Can use other colors from the Metier palette
- Source: Templafy system or downloadable SVG icons

---

## Imagery Style
- Focus on **detail and craft**
- Slightly toned-down look
- Subjects: lines, urban environment, nature, projects, details
- Shadow and light play important roles
- Style is interpretive and thoughtful

---

## CSS Quick Reference for Web Projects

```css
:root {
  /* Primary */
  --metier-blue: #00205B;
  --metier-beige: #FFEAE4;
  --metier-white: #FFFFFF;

  /* Secondary Green */
  --green-100: #C5F9DA;
  --green-200: #8DF1B5;
  --green-300: #0D896A;
  --green-400: #1A5345;

  /* Secondary Blue */
  --blue-100: #B4DBFF;
  --blue-200: #77BEFF;
  --blue-300: #59748D;
  --blue-400: #245787;

  /* UI */
  --grey-100: #F0F1F5;
  --grey-200: #95979E;
  --grey-300: #414148;
  --ui-black: #0B0B0C;

  /* Typography */
  --font-primary: 'Work Sans', Arial, sans-serif;
}
```
