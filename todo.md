# Sinopeakchem - B2B Chemical Company Website

## Design Guidelines

### Design References
- **BASF.com**: Professional chemical industry layout
- **Dow.com**: Clean B2B product showcase
- **Style**: Professional, Industrial, Blue Chemical Theme
- 

### Color Palette
- Primary: #0066B3 (Corporate Blue)
- Primary Dark: #004A82 (Deep Blue - hover/active)
- Secondary: #0047AB (Royal Blue - accents)
- Background: #FFFFFF (White)
- Light BG: #F5F7FA (Light Gray - sections)
- Text: #1A1A2E (Dark Navy)
- Text Secondary: #6B7280 (Gray)
- Accent Silver: #C0C0C0 (Borders/dividers)

### Typography
- Font: Inter (sans-serif), fallback to system fonts
- H1: 48px bold
- H2: 36px semibold
- H3: 24px semibold
- Body: 16px regular

### Key Component Styles
- Buttons: Blue #0066B3 bg, white text, rounded-lg, hover darken
- Cards: White bg, subtle shadow, rounded-lg, hover lift
- Accordion: Clean borders, blue accent on expand

### Images (CDN)
1. hero-chemical-plant.jpg - Hero banner
2. product-chemical-powder.jpg - Product default image
3. about-laboratory.jpg - About page
4. hero-global-shipping.jpg - Shipping/logistics

---

## Development Tasks

### Files to Create (8 files max):
1. **src/data/products.ts** - All 22 product data (specs, FAQ, applications)
2. **src/data/blogs.ts** - Blog post data
3. **src/components/Layout.tsx** - Header, Footer, WhatsApp button, SEO head
4. **src/pages/Index.tsx** - Homepage (hero, featured products, company intro, blog preview)
5. **src/pages/Products.tsx** - Product listing page with search/filter
6. **src/pages/ProductDetail.tsx** - Product detail with specs, FAQ accordion, doc request modal
7. **src/pages/About.tsx** - Company info, history, team, certifications
8. **src/pages/Contact.tsx** - Contact form (Formspree), company info
9. **src/pages/Blog.tsx** - Blog list page
10. **src/pages/BlogDetail.tsx** - Blog article detail
11. **src/pages/NotFound.tsx** - 404 page
12. **src/App.tsx** - Router with all routes including /en/ prefix

### Key Features:
- [x] Generate images
- [ ] Product data for all 22 chemicals
- [ ] Blog data with sample articles
- [ ] Layout with header/footer/WhatsApp
- [ ] Homepage with hero, products, blog preview
- [ ] Product list with grid/search
- [ ] Product detail with specs, FAQ accordion, document request modal
- [ ] About page
- [ ] Contact page with Formspree form
- [ ] Blog list and detail pages
- [ ] 404 page
- [ ] SEO: JSON-LD structured data, meta tags
- [ ] Site search functionality
- [ ] Responsive design
- [ ] Social share buttons
