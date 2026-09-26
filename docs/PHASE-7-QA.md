# 80Land Phase 7 QA

## Scope
Landlord Center for Desktop and Mobile. Phase 7 upgrades the landlord flow from a simple dashboard and one-step form into a connected management workspace covering listing status, create/edit, draft persistence, media preview, multi-step validation, and final preview.

## Implemented
- Landlord dashboard upgraded to a management center.
- Listing metrics now derive from landlord records.
- Status filter tabs:
  - Tất cả
  - Đang hiển thị
  - Chờ duyệt
  - Bản nháp
  - Đã tạm ẩn
- Listing rows support preview, edit, and status toggle actions.
- Active listings can be temporarily hidden and re-enabled.
- Pending listings are protected from accidental status changes in the prototype.
- Four-step listing creation/edit flow:
  1. Thông tin cơ bản
  2. Ảnh & tiện ích
  3. Vị trí
  4. Xem trước
- Basic-field validation before progressing.
- Amenity selection with active states.
- Multiple image selection with in-page image previews.
- Area-level location preview and privacy-oriented wording.
- Live preview updates from the form as the landlord edits content.
- Save draft persists the current form state to localStorage.
- Publish sends the listing into a local prototype landlord record with "Chờ duyệt" status.
- Edit route added at `/landlord/edit/:id`.
- Preview route added at `/landlord/preview/:id`.
- Router table now exposes landlord edit and preview helpers.
- Existing marketplace-facing Property Detail can still be opened from the landlord preview for linked demo listings.
- Custom edited records replace their original prototype row instead of creating duplicate dashboard rows.

## Static verification
- JavaScript parenthesis balance: 1475 / 1475.
- CSS brace balance: 1195 / 1195.
- Landlord dashboard route present.
- Landlord edit and preview routes present.
- Status filtering binding present.
- Status toggle binding present.
- Four-step listing panels present.
- Draft persistence present.
- Publish flow present.
- Photo input and preview binding present.
- Live preview binding present.
- Landlord router helpers present.
- Phase 7 CSS present.

## Browser QA
A real remote browser render remains blocked in the coding container because GitHub DNS/network access is unavailable. Local browser QA must be completed after pulling the latest phase commits.

## Local QA matrix

### Desktop
- 1440 px: verify landlord dashboard hierarchy, status tabs, listing rows, side metrics, and four-step editor.
- 1280 px: verify editor grid and live preview remain balanced.
- 1024 px: verify preview moves beneath the form without overflow.

### Mobile
- 430 px: verify landlord dashboard rows, action controls, stepper, amenity grid, photo previews, and live preview.
- 390 px: verify no horizontal overflow.
- 360 px: verify four-step controls, action buttons, and sticky bottom navigation do not overlap.

### Interaction checks
- Open `/landlord` and switch each status tab.
- Toggle an active listing to "Đã tạm ẩn" and back to "Đang hiển thị".
- Open `/landlord/new`.
- Complete each step and confirm validation blocks incomplete required fields.
- Select amenities and confirm active styling.
- Select multiple images and confirm previews appear.
- Edit title, price, area, and location and confirm live preview updates.
- Save a draft, return to `/landlord/new`, and confirm draft data is restored.
- Publish a listing and confirm it appears as "Chờ duyệt" on the dashboard.
- Open the published listing through landlord preview.
- Open `/landlord/edit/:id`, modify it, publish again, and confirm only one dashboard row exists for that ID.

## Status
Phase 7 code: DONE
Static checks: PASS
Remote browser render: BLOCKED by environment network/DNS
Local browser QA: PENDING
