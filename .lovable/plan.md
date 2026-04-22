

## Add Marquee Under Hero Buttons

### What
Add an infinite scrolling marquee strip between the CTA buttons and the stats section in the hero, displaying technology/skill badges: WordPress, Shopify, WooCommerce, Webflow, PHP, JavaScript, GoHighLevel, n8n, Lovable, API Integrations, AI, CRM, Data Scraping.

### How

**1. Update `src/components/HeroSection.tsx`**
- Insert a marquee section after the CTA buttons `motion.div` (after line 144) and before the Stats grid
- Each skill rendered as a pill/badge with `bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-card` styling, consistent with the site's warm card aesthetic
- Use a separator dot or subtle icon between items
- Duplicate the items list twice inside a flex container for seamless infinite scroll
- Wrap in a `motion.div` with `itemVariants` for entrance animation
- Use `overflow-hidden` on the outer container and CSS animation on the inner flex row

**2. Update `src/index.css` (or `tailwind.config.ts`)**
- Add a `marquee` keyframe: `0% { transform: translateX(0) }` to `100% { transform: translateX(-50%) }` 
- Add corresponding `animate-marquee` utility with ~25s linear infinite duration

### Design Details
- Badges use the existing warm card style (cream background, soft border, warm shadows)
- Full width of the hero container, no overflow visible
- Smooth, continuous left-scroll animation
- Wrapped in a Framer Motion container so it fades in with the rest of the hero content

