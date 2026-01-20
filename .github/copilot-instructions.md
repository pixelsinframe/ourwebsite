# Pixelsinframe Creative Studio - Copilot Instructions

## Project Overview

Pixelsinframe is a **static marketing website** for a creative studio in Midrand, South Africa offering branding, web design, and printing services. Built with vanilla HTML, CSS, and JavaScript. Hosted on Netlify.

## Architecture & Structure

### Core Tech Stack

- **HTML5** - Multiple pages, schema.org markup for SEO
- **CSS** - Modular stylesheets per page; `base.css` provides design system
- **JavaScript** - Vanilla JS (no frameworks); focus on DOM manipulation
- **Deployment** - Netlify (see `netlify.toml`)

### Key Directories

- **Root**: Page files (`.html`) - each page is self-contained
- **`css/`**: Modular stylesheets
  - `base.css` - Global design tokens, typography, resets (474 lines)
  - Page-specific CSS: `contact.css`, `gallery.css`, `testimonial.css`, `studio.css`, etc.
  - Mobile-first responsive in each file (max-width breakpoints)
- **`scripts/`**: Vanilla JS utilities
  - `scripts.js` - Core: navbar toggle, scroll-to-top, year update
  - Page-specific: `gallery.js`, `testimonial.js`, `qr-gen.js`
- **`assets/`**: Icons and favicons
- **`ourportfolio/`, `ourservices/`, `resources/`**: Content sections

### Design System (`base.css`)

CSS custom properties are the single source of truth:

```css
:root {
  --clr-primary-blue: #1b3b6f; /* Primary branding */
  --clr-primary-orange: #c32119; /* Accent/CTA */
  --clr-secondary-blue: #294c8c; /* Hover states */
  --clr-secondary-orange: #ff8b5e; /* Secondary accent */

  --clr-neutral-100: #ffffff; /* Background */
  --clr-neutral-200: #f5f7fa; /* Light backgrounds */
  --clr-neutral-300: #e4e7eb; /* Borders */
  --clr-neutral-700: #4a5568; /* Body text */
  --clr-neutral-900: #1a202c; /* Headings */

  --clr-accent-success: #2d9b83; /* Success states */
  --clr-accent-error: #e53e3e; /* Error states */

  --ff-primary: "Poppins", sans-serif; /* Body, buttons */
  --ff-secondary: "Raleway", serif; /* Headings, displays */

  --fw-bold: 700;
  --fw-semibold: 500;
  --fw-normal: 300;
}
```

**Always use these variables, never hardcode colors.**

## Page-Specific Patterns

### Form Styling (Contact Page)

The contact form uses a **CSS Grid 2-column layout** that collapses to 1 column on mobile:

- Labels are small, uppercase (14px, 80% opacity)
- Inputs have 1px borders, subtle blue focus state
- Form uses `grid-template-columns: 1fr 1fr` with field-level positioning
- Button aligns to bottom-right on desktop
- See `css/contact.css` lines 104-200 for the grid setup

**Pattern to follow**: Use same form styling approach for new forms - grid layout, uppercase labels, consistent focus states.

### Responsive Design

- **Breakpoint**: `max-width: 786px` (mobile)
- **Technique**: Mobile-first in CSS (desktop rules first, then mobile overrides)
- Use `clamp()` for scalable typography: `font-size: clamp(16px, 3vw, 18px)`
- Every page stylesheet includes mobile media queries

### Navigation

- Mobile: Hamburger menu (`.menu` element) controlled by `scripts.js`
- Desktop: Full nav bar
- Pattern: Menu toggle stores scroll position to prevent body scroll when open

### Imagery

- CDN hosted on **Cloudinary** and **ImageKit** (remote URLs, not local)
- Never add large images to repo

## Development Workflows

### Adding a New Page

1. Create `pagename.html` in root
2. Copy structure from existing page (use `index.html` as template):
   - Meta tags (SEO, OG, Twitter)
   - JSON-LD schema.org markup
   - Navbar include pattern (hardcoded nav `<header>`)
   - Link all stylesheet files
   - Footer with copyright year auto-update
3. Create `css/pagename.css` for unique styles
4. Link the stylesheet in HTML `<head>`
5. Use CSS variables from `base.css` for all colors/fonts

### Styling a New Component

1. Check `base.css` for existing patterns (buttons, typography, spacing)
2. Use CSS custom properties (`--clr-*`, `--ff-*`)
3. Include mobile media query in the same file
4. Follow the 2-step pattern:
   - Desktop layout first (grid, flex)
   - Mobile overrides in media query

### Form Submission

- Forms use `netlify` attribute for Netlify form handling
- Example: `<form action="/thank-you" method="POST" netlify>`
- No frontend validation; Netlify handles backend

## Common Code Patterns

### Button Styling

```css
.btn {
  background-color: var(--clr-primary-blue);
  color: var(--clr-neutral-100);
  padding: 1rem 2rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.btn:hover {
  background-color: var(--clr-secondary-blue);
  box-shadow: 0 6px 16px rgba(27, 59, 111, 0.15);
}
```

### Responsive Text Scaling

```css
font-size: clamp(16px, 3vw, 18px); /* min, preferred, max */
```

### Hover Underline Animation (used on headings)

```css
.heading::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--clr-primary-orange);
  transform: scaleX(0);
  transition: transform 250ms ease-in;
}
.heading:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## Important Notes

- **No build process**: All static HTML/CSS/JS—just edit and deploy
- **Netlify deployment**: Commit to main branch, Netlify auto-deploys
- **SEO focus**: All pages include schema.org JSON-LD, meta tags, canonical URLs
- **Accessibility**: ARIA labels used in nav and interactive elements
- **Mobile-first mindset**: Always test form and layout changes on mobile
- **External deps**: Font Awesome (CDN), Google Fonts (CDN), ImageKit, Cloudinary

## Location Services Pages - SEO Strategy

Pixelsinframe now offers location-specific service pages for better local SEO targeting.

### URL Naming Convention (Service-First + Location)

**Pattern**: `/[service]-[location].html`

**Examples:**

- `/web-design-midrand.html` - Web design services in Midrand
- `/logo-design-johannesburg.html` - Logo design in Johannesburg
- `/printing-sandton.html` - Printing services in Sandton

**Why this pattern:**

- Matches high-intent search queries: "web design Midrand", "logo design Johannesburg"
- Better keyword density for local SEO
- Improved CTR in search results
- Clear URL structure for users

### Location Pages Structure

Each location service page should include:

1. **Meta Tags & Canonical URL**

   - Title: `[Service] Services in [Location] | [Service Detail] | Pixelsinframe`
   - Description: Include service type + location + pricing/USP
   - Keywords: service + location variations
   - Canonical: `/[service]-[location]`

2. **Schema.org Markup**

   - LocalBusiness schema with specific location address
   - ServiceType specified (e.g., "Web Design & Development")
   - PriceRange included for transparency
   - Phone number and areaServed for local targeting

3. **Content Structure**

   ```html
   <h1>[Service] Services in [Location]</h1>
   <p class="hero-subtitle">[Service detail] + pricing</p>

   <section class="services-grid">
     <!-- 4 service-specific cards -->
   </section>

   <section class="location-info">
     <h2>[Service] for [Location] Businesses</h2>
     <!-- USPs, benefits, local advantages -->
   </section>
   ```

4. **Location Footer Navigation**
   - All location service pages include location-based footer
   - Highlights current location with `.active` class
   - Links to other locations: Midrand, Waterfall, Johannesburg, Sandton, Centurion

### SEO Best Practices for Location Pages

✅ **Do:**

- Include service name + location in h1 and title tag
- Use local keywords naturally in content (e.g., "Midrand businesses", "local studio")
- Include LocalBusiness schema with specific address for each location
- Link related pages (service detail pages, portfolio)
- Mention pricing and concrete benefits for local audience
- Add USPs specific to serving that location

❌ **Don't:**

- Duplicate content across location pages (customize for each location)
- Over-stuff keywords or make content unnatural
- Use different phone numbers for same business
- Create pages for locations you don't actually serve

### Current Location Service Pages

**Created service-location pages (for Midrand):**

- `/web-design-midrand.html` - Custom websites, e-commerce
- `/logo-design-midrand.html` - Logo design, brand identity
- `/printing-midrand.html` - Large format printing, signage

**Base location overview pages (all 5 locations):**

- `/services-midrand.html`
- `/services-waterfall.html`
- `/services-johannesburg.html`
- `/services-sandton.html`
- `/services-centurion.html`

### Adding New Service-Location Pages

**Template to follow:**

1. Copy existing location service page HTML
2. Update all occurrences of:
   - Location name (Midrand → [New Location])
   - Service name and variations
   - Meta descriptions with location + pricing
   - Schema.org areaServed field
   - h1, hero subtitle, location info section
   - All internal links
3. Verify canonical URL is unique
4. Add to sitemap.xml
5. Test responsive design

## Quick Checklist for Changes

- [ ] Use CSS variables for colors/fonts
- [ ] Test responsive at mobile breakpoint (786px)
- [ ] Include proper `<meta>` tags and schema.org markup for new pages
- [ ] No hardcoded URLs; use relative paths (`/pagename`, `./css/file.css`)
- [ ] Close/verify all HTML tags
- [ ] Check button hover states match brand colors
- [ ] Update year in copyright automatically (handled by `scripts.js`)
- [ ] For location pages: include location name in h1, title, and schema
- [ ] Verify canonical URLs don't conflict with other pages
