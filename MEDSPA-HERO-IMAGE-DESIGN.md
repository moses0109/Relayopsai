# Med Spa Hero Image Design Spec

## Overview
Create a premium, medical-grade hero image for the RelayOpsAI Med Spa subpage that conveys luxury, technology, and NYC professionalism.

## Image Dimensions
- **Desktop:** 1920x1080px (16:9 aspect ratio)
- **Mobile:** 1080x1920px (9:16 aspect ratio) - vertical crop

## Design Elements

### Background
- **Base:** Soft gradient from deep navy (#0f172a) to warm plum (#1a1428)
- **Accent:** Subtle rose gold shimmer overlay (10% opacity)
- **Texture:** Fine grain texture to mimic high-end spa aesthetic
- **Blur effect:** Soft bokeh lights in rose/pink/purple tones (background depth)

### Main Visual Focus
**Split composition:**

#### LEFT SIDE (60%):
- **Phone mockup** showing AI conversation
  - Modern iPhone with rose gold frame
  - Screen displays chat bubbles:
    - Customer: "Do you have Botox appointments this week?"
    - AI (RelayOpsAI): "Yes! Thursday at 2pm or Friday at 4pm?"
    - Customer: "Thursday works!"
    - AI: "Booked! Would you like to add HydraFacial for $150?"
  - Glowing rose gold aura around phone
  - Floating UI elements: checkmark icons, dollar signs ($$$), calendar icon

#### RIGHT SIDE (40%):
- **NYC skyline silhouette** in background (subtle, Manhattan skyline)
- **Brooklyn Bridge outline** in soft rose gold glow
- **Floating stats badges:**
  - "$15k/month recovered"
  - "24/7 Coverage"
  - "98% Booking Rate"
  - "Made in Brooklyn" badge

### Typography Overlay
- **Top left corner:**
  - "RelayOpsAI" logo in white
  - Small badge: "Brooklyn, NY"

- **Center (over phone):**
  - Large headline: "NEVER MISS A BOTOX CONSULTATION"
  - Subheadline: "AI Receptionist for NYC Med Spas"

### Color Palette
- **Primary:** Rose gold (#e0b0a0)
- **Accent 1:** Rose pink (#fb7185)
- **Accent 2:** Soft purple (#a78bfa)
- **Background:** Navy to plum gradient (#0f172a → #1a1428)
- **Text:** Clean white (#ffffff)
- **Highlights:** Emerald green for revenue ($) (#34d399)

### Lighting & Effects
- **Main light source:** Soft glow from phone screen (rose/pink)
- **Ambient glow:** Rose gold radial gradient behind phone
- **Depth:** Subtle shadow beneath phone (floating effect)
- **Particles:** Small floating sparkles/dots in rose gold (luxury feel)
- **Blur:** Background has 15% gaussian blur to emphasize phone

### Style References
- **Medical spa aesthetic:** Clean, clinical, luxurious
- **Tech startup vibe:** Modern, sleek, AI-forward
- **NYC energy:** Urban, fast-paced, professional
- **Luxury beauty:** Rose gold, soft pinks, premium feel

## File Formats
1. **PNG (transparent background option):** For web use
2. **JPG (optimized):** < 500KB for fast loading
3. **WebP:** Modern format for best compression

## Accessibility
- **Alt text:** "RelayOpsAI Med Spa AI Receptionist - Phone mockup showing automated Botox consultation booking in NYC"
- **Contrast ratio:** Ensure text overlays meet WCAG AA standards (4.5:1 minimum)

## Implementation
Replace the current video placeholder in `MedSpaHero.tsx` (lines 74-95) with:

```tsx
<div className="w-full max-w-4xl mx-auto relative z-10 mb-10 px-4">
  <div className="relative rounded-3xl overflow-hidden border-2 border-rose-400/20 shadow-2xl">
    <img
      src="/medspa-hero.webp"
      alt="RelayOpsAI Med Spa AI Receptionist - Automated Botox consultation booking"
      className="w-full object-cover"
    />
  </div>
</div>
```

## Tools to Create This
- **Figma/Adobe XD:** For mockup design
- **Midjourney/DALL-E prompt:**
  ```
  "Professional hero image for luxury med spa AI receptionist software,
  iPhone mockup with rose gold frame showing AI chat conversation about
  Botox appointments, NYC skyline in background, rose gold and purple
  gradient, floating UI elements, premium medical spa aesthetic,
  Brooklyn branding, soft bokeh lights, modern tech startup style,
  clean and luxurious --ar 16:9 --style luxury medical"
  ```
- **Photoshop:** For final compositing and effects
- **Canva Pro:** Quick alternative with templates

## Brooklyn Branding Element
Add a small badge in the top-right corner:
- "Made in Brooklyn" with a small bridge icon
- Rose gold border, white text
- Size: 120x40px
- Position: 40px from top, 40px from right

---

**Priority:** HIGH
**Due Date:** Before deployment
**File Location:** `/public/medspa-hero.webp`
