---
name: Urban Practicality
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5b403d'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#906f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#bb171c'
  primary: '#b7131a'
  on-primary: '#ffffff'
  primary-container: '#db322f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ac'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#186a22'
  on-tertiary: '#ffffff'
  tertiary-container: '#358438'
  on-tertiary-container: '#f7fff1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#a3f69c'
  tertiary-fixed-dim: '#88d982'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005312'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  price-display:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-xs:
    fontFamily: Be Vietnam Pro
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

The design system is engineered for everyday urban Vietnamese life—direct, resourceful, and grounded. It serves college students, blue- and white-collar workers, and young families navigating the fast-paced rental landscape across high-density hubs like Ho Chi Minh City, Hanoi, and Da Nang. The emotional tone avoids the aloof exclusivity of luxury real estate; instead, it communicates immediate utility, legibility, and honest transparency.

The visual style blends **Modern Functionalism** with **Information-Dense Editorial Clarity**:
- **Utilitarian Balance**: High visual density that respects breathing room. Screens prioritize fast scanning of critical transactional details: exact price per month (`tr/tháng`), square meterage (`m²`), location (`Quận/Huyện`), and direct ownership markers.
- **Zero Distraction**: No faux-luxurious glassmorphism, multi-stop neon gradients, or decorative drop shadows. Visual weight is maintained through strict typographic contrast, deliberate border boundaries, and purposeful color hits.
- **Local Context & Trust Signals**: Explicit visual indicators prioritize verification and consumer security—distinguishing direct landlords (`Chính chủ`) from brokers, and authentic listings (`Đã xác thực`) from stale inventory.

## Colors

The palette establishes high contrast, optimal for outdoor readability on low-to-mid-tier smartphones under harsh tropical sunlight.

- **Primary Accent Red (`#E53935`)**: The core action driver. Applied strictly to primary commitment points (booking inspections, calling landlords), active state filters, map pins, price highlights, and favorite toggles.
- **Ink Black (`#151515`)**: Grounded neutral for high-contrast headlines, titles, and critical numbers. Eliminates optical vibration common with pure `#000000`.
- **Success Green (`#2E7D32`)**: Dedicated status hue for verification tokens—such as verified room badges (`Đã xác thực`), direct landlord tags (`Chính chủ`), and instant availability indicators.
- **Soft Neutral Surface (`#F5F5F3`)**: Off-white canvas tone that softens eye strain while cleanly delineating foreground white cards and sheets.
- **Subtle Border Gray (`#E5E5E0`)**: Structural boundary color for crisp hairline borders (`1px`) without adding visual clutter.
- **Muted Gray (`#707070`)**: Calibrated for secondary information architecture—timestamping, unit labels, district metadata, and inactive state icons. Meets WCAG AA contrast against both `#FFFFFF` and `#F5F5F3`.

## Typography

The design system exclusively adopts **Be Vietnam Pro**. Engineered specifically for the Vietnamese language, it resolves complex multi-tiered diacritical marks (dấu hỏi, dấu ngã, dấu nặng, mũ) without clipping or creating awkward vertical line-height inconsistencies.

- **Numerics & Currency**: Prices use `price-display` weight (700) paired with `#E53935`. Currency units use standard Vietnamese conversational syntax: `4.5 tr/tháng` or `800k/tháng`, never unwieldy strings of zeros (`4.500.000 ₫`) in compact listing cards.
- **Diacritic Protection**: The baseline grid maintains a minimum `1.35x` to `1.5x` relative line height across all scales to ensure diacritics never overlap upper baselines.
- **Metadata Hierarchy**: Technical specs (`28 m²`, `1 PN`, `Tầng 3`) use `body-sm` or `label-sm` with tabular numerals to preserve scannability across dense lists.

## Layout & Spacing

The layout employs a responsive, fluid grid system calibrated for rapid scanning and map synchronization:

- **Mobile Viewport (< 768px)**: 4-column layout with `margin: 1rem` (16px) and `gutter: 0.75rem` (12px). Quick category chips sit in an edge-to-edge horizontally scrolling strip with scroll-snap. The omni-search bar docks at the top with a z-index of 40, switching to a bottom sticky bar for key filter triggers when scrolling.
- **Tablet / Split Viewport (768px - 1199px)**: 8-column layout. When Split-Map mode is engaged, the viewport splits 50/50: fixed interactive map on the right, vertically scrollable single-column card list on the left.
- **Desktop Viewport (≥ 1200px)**: 12-column layout with a maximum container width of `1280px` (`margin: auto`). Standard browse view adopts a 3-column card grid (4 columns each). Split Map view expands to a 5-column list / 7-column map architecture.
- **Rhythm Principle**: Internal component padding follows compact units (`space-xs` to `space-md`), preserving dense information delivery, while section margins leverage `space-lg` to `space-xl` to prevent cognitive fatigue.

## Elevation & Depth

Depth is established primarily through **hairline containment** and **surface contrast**, reserving shadows for transient floating elements.

- **Level 0 (Flat Ground)**: Used for body canvas background (`#F5F5F3`). No border, no shadow.
- **Level 1 (Card / Container Surface)**: Used for listing cards, filter surfaces, and inputs. `#FFFFFF` background bound by a crisp `1px solid #E5E5E0` border. No drop shadows in static state.
- **Level 2 (Hover / Active Interactive Card)**: Border shifts from `#E5E5E0` to `#151515`. Ambient shadow: `0 4px 12px rgba(21, 21, 21, 0.06)`. No colored glow.
- **Level 3 (Floating Controls / Omni Search / Modals)**: Bottom sheets, sticky omni-search, map controls (zoom/locate), and desktop filter dropdowns. Surface is `#FFFFFF` with `0 8px 24px rgba(21, 21, 21, 0.12)` and a `1px solid #E5E5E0` outline.

## Shapes

The design system uses **Soft (Level 1)** rounding to project practical efficiency rather than playful abstraction.

- **Standard Elements (`rounded`, 0.25rem / 4px)**: Checkboxes, badges, metadata specs chips, and map tooltips. Sharp enough to feel utilitarian and dense.
- **Mid-Tier Elements (`rounded-lg`, 0.5rem / 8px)**: Property card containers, image carousels, text inputs, search modules, and modal containers.
- **Pill Elements (`rounded-full`, 9999px)**: Exclusively reserved for interactive touch affordances: filter chips (e.g., `Phòng trọ`, `Căn hộ`), primary CTA buttons, floating map-toggle pills, and image counter badges.

## Components

### Buttons
- **Primary**: Solid `#E53935` background, `#FFFFFF` text, `label-md`. Height 44px (touch-optimized), fully rounded `rounded-full` or structured `rounded-lg`. Active state: `#C62828`.
- **Secondary / Landlord Contact**: `#151515` background, `#FFFFFF` text. Used for direct actions like "Gọi điện" (Call) or "Nhắn Zalo".
- **Outline / Filter Action**: `#FFFFFF` background, `1px solid #E5E5E0` border, `#151515` text. On hover: border transitions to `#151515`.
- **Destructive / Ghost**: Clean `#E53935` text without background or borders for clearing search terms.

### Omni-Search Bar & Filters
- **Container**: Elevated capsule or 8px rounded container with segmented touch targets: [Thành phố / Khu vực] | [Loại phòng] | [Mức giá]. Separated by vertical 1px `#E5E5E0` rules.
- **Filter Chips**: Pill-shaped horizontal selector buttons.
  - *Inactive*: `#FFFFFF` surface, `1px solid #E5E5E0`, `#151515` text.
  - *Active*: `#151515` surface, `#FFFFFF` text, border matches surface.

### Trust Cues & Badges
- **Chính chủ (Direct Landlord)**: `label-xs` badge. Subtle `#E8F5E9` background with `#2E7D32` text and check icon. Indicates zero intermediary fee.
- **Đã xác thực (Verified Listing)**: Solid `#2E7D32` pill with white text and verified shield glyph, positioned at the top-left of property photo assets.
- **Video thực tế (Video Tour Available)**: Semi-translucent `#151515` badge (80% opacity) with camera glyph and white text, overlaying the media carousel.

### Property Cards
- **Structure**: Stacked card architecture. Top media container features a strict `4:3` (mobile) or `16:10` (desktop) aspect ratio, with a floating favorite button (heart outline to solid `#E53935` fill) anchored top-right.
- **Content Block**: Compact vertical stack with `space-sm` gap:
  1. Price string (`price-display`, `#E53935`) sitting inline with listing area (`28 m²`).
  2. Listing title: `headline-md`, clamped strictly to 2 lines, `#151515`.
  3. Location string: pin icon + `Phường/Quận, Tỉnh/TP` in `body-sm`, `#707070`.
  4. Specs & Trust row: Horizontal row of spec tags (`1 PN`, `WC riêng`, `Ban công`) followed by trust chips (`Chính chủ`).

### Form Inputs & Selectors
- **Inputs**: 44px standard height. Pure `#FFFFFF` background, `1px solid #E5E5E0` boundary, `rounded-lg`. Typography is `body-md`. Focus rings use a tight `2px solid #151515` outline without multi-color blurs.
- **Price Range Dual Slider**: Track in `#E5E5E0` with the active selected span highlighted in `#E53935`. Grab handles are pure `#FFFFFF` disks with a `2px solid #E53935` perimeter.

### Map/List Split Toggle
- Floating bottom-center capsule pill (`rounded-full`) anchored at `z-index: 50`: `#151515` surface, `#FFFFFF` text, containing a map pin/list icon toggle. Flips seamlessly between interactive vector map and layout-dense card list.