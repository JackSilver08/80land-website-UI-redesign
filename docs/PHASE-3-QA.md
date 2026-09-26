# 80Land Phase 3 QA

## Scope
Search, filter, sort, and map experience for Desktop and Mobile. Phase 3 keeps the Phase 2 visual language and turns the search/map prototype into a connected interaction flow.

## Implemented
- Search query reads from `/search?q=` and matches title, location, area, features, and listing type.
- Filter state is URL-driven: price, listing type, and required amenities.
- Filter sheet applies and resets state for both Search and Map pages.
- Quick filter chips reflect active filter state.
- Sort menu supports relevance, price low-to-high, price high-to-low, and area high-to-low.
- Search result count updates from the filtered sample set.
- Empty search state added when no sample listing matches.
- Desktop keeps list + map side by side.
- Map markers now follow the filtered result set.
- Selecting a marker updates the map preview card and opens the related property detail.
- Mobile Search exposes a dedicated "Mở bản đồ" action instead of forcing a split layout.
- Map page supports 1 km, 2 km, and 5 km radius state in the URL.
- Map page preserves active search and filter state when switching between list and map.
- Mobile map page retains a horizontal nearby-list preview.
- Geolocation controls retain the existing permission/loading/error states.

## Static verification
- JavaScript parenthesis balance: 604 / 604.
- CSS brace balance: 712 / 712.
- Search query/filter/sort helper functions present.
- Search filter sheet and Map filter sheet are generated from shared state.
- Search-to-map URLs preserve query, price, type, amenities, and sort state.
- Map radius links preserve search/filter state.
- Marker rendering is tied to filtered listings.
- Empty result state is present.
- Mobile map entry is present in the Search status row.

## Browser QA
A real remote browser render remains blocked in the coding container because GitHub DNS/network access is unavailable. Local browser QA must be completed after pulling the latest phase commit.

## Local QA matrix

### Desktop
- 1440 px: verify Search list + map split, sticky search toolbar, filter sheet, sort menu, marker selection.
- 1280 px: verify results collapse to a single result column while the map remains visible.
- 1024 px: verify map transition behavior and result card sizing.

### Mobile
- 430 px: verify compact search toolbar, horizontal filter chips, result cards, "Mở bản đồ", filter bottom sheet, sort bottom sheet.
- 390 px: verify no horizontal overflow and readable filter controls.
- 360 px: verify toolbar, bottom navigation, result cards, and filter sheet remain inside the viewport.

### Interaction checks
- Enter a query and confirm the URL becomes `/search?q=...`.
- Apply price/type/amenity filters and confirm result cards and count update.
- Reset filters and confirm only the search query remains.
- Change sort order and confirm card order changes.
- Open a map marker and confirm the preview card changes to that listing.
- Open a property from the map preview and confirm navigation.
- Open Map, change radius, then return to Search and confirm state is preserved.
- Use the location control and verify loading/success/error states.

## Status
Phase 3 code: DONE
Static checks: PASS
Remote browser render: BLOCKED by environment network/DNS
Local browser QA: PENDING
