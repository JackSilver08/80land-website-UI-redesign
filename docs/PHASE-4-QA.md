# 80Land Phase 4 QA

## Scope
Property Detail redesign for Desktop and Mobile. Phase 4 turns the existing basic detail route into a complete listing-detail experience while keeping the current 80Land search-first visual language.

## Implemented
- Property detail hero with large image and thumbnail gallery.
- Sample multi-image gallery data added to the listing model.
- Verified / sample status shown at the media layer.
- Save action works from the media header, summary, and mobile sticky bar.
- Save state persists per listing in localStorage.
- Detail summary includes price, location, area, listing type, verification state, and a highlighted amenity.
- Amenity pills and a dedicated amenities section.
- Description section using data-driven listing facts and explicit prototype copy.
- Area-level map visual with privacy-oriented location wording.
- Poster/landlord panel with demo contact behavior.
- Safety guidance panel for viewing and deposits.
- 80Land Assistant remains the primary conversational CTA instead of introducing a new chat button system.
- Related listings section reuses the existing marketplace cards.
- Search/Map property links now preserve their origin in a `from=` query so the detail breadcrumb can return to the previous result context.
- Mobile sticky action bar sits above the existing bottom navigation.

## Static verification
- JavaScript parenthesis balance: 710 / 710.
- CSS brace balance: 836 / 836.
- Listing gallery fields present in `js/data.js`.
- Detail route uses gallery data with a safe single-image fallback.
- Save interactions target all detail save controls for the same listing.
- Gallery thumbnail interaction updates the main image.
- Demo contact state is wired.
- Related listing links use the shared detail navigation helper.
- Search/Map origin state is encoded in property URLs.

## Browser QA
A real remote browser render is still blocked in the coding container because GitHub DNS/network access is unavailable. Local browser QA must be completed after pulling the phase commits.

## Local QA matrix

### Desktop
- 1440 px: verify gallery + sticky summary balance, content column hierarchy, seller panel, map, and related listings.
- 1280 px: verify gallery height and summary width do not create horizontal overflow.
- 1024 px: verify the detail hero collapses to a single-column layout cleanly.

### Mobile
- 430 px: verify full-width media, thumbnail strip, summary actions, content stack, related-list horizontal scroll, and sticky action bar.
- 390 px: verify no horizontal overflow and no overlap with bottom navigation.
- 360 px: verify title, price, stats, amenity pills, and mobile CTA remain readable.

### Interaction checks
- Open a property from Search and verify the breadcrumb returns to the same Search query/filter context.
- Open a property from Map and verify the breadcrumb returns to the same Map state.
- Click all gallery thumbnails and confirm the main image changes and active thumbnail moves.
- Click Save from the media header and confirm all Save controls update together.
- Reload and confirm Save state persists for that listing.
- Click "Liên hệ chủ nhà" and verify the demo contact notice appears.
- Open 80Land Assistant from the detail page.
- Open the map section and return to the Map route.
- Click a related listing and verify navigation.

## Status
Phase 4 code: DONE
Static checks: PASS
Remote browser render: BLOCKED by environment network/DNS
Local browser QA: PENDING
