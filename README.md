# 80Land Website UI Redesign

Static-first UI/UX redesign prototype for 80Land.

## Direction
- Marketplace UX inspired by Chợ Tốt's usability principles, not a visual clone.
- Clean, dense, easy-to-scan rental experience.
- Brand palette: red, white, black with restrained neutrals.
- Typography: Be Vietnam Pro.
- Mobile-first interaction with Desktop + Mobile views.
- Bootstrap 5 for layout/utilities/components, custom 80Land CSS for brand/UI.

## Planned structure

```
80Land/
├── index.html
├── pages/
│   ├── renter/
│   ├── landlord/
│   ├── admin/
│   └── provinces/
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   ├── app.css
│   ├── components.css
│   └── pages.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── data.js
│   ├── renter.js
│   ├── landlord.js
│   └── admin.js
└── docs/
    ├── IA.md
    ├── DESIGN_SYSTEM.md
    └── ROUTES.md
```

## Prototype scope
Renter: homepage, search, filters, map, property detail, saved, messages, notifications, profile, assistant.

Landlord: dashboard, create listing, manage listings, statistics, leads.

Admin: dashboard, users, listings, moderation, reports, audit.

Provinces: TP.HCM, Hà Nội, Đà Nẵng, Đồng Nai, Bình Dương, Cần Thơ, Hải Phòng, Long An.

## Development
This branch is the clean static refactor target. Existing Stitch prototypes are retained as visual references under `archive/` and are not the production entrypoint.
