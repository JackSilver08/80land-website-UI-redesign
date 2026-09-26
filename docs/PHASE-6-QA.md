# 80Land Phase 6 QA

## Scope
Account Center for Desktop and Mobile. Phase 6 upgrades the account-related routes into a connected user area covering profile, saved listings, notifications, and personalization.

## Implemented
- Saved listings page redesigned as a marketplace grid.
- Saved listing state is initialized for the prototype and then persisted per listing in localStorage.
- Removing a saved listing updates the page without a full reload.
- Empty saved state is handled explicitly.
- Saved cards link into Property Detail and 80Land Assistant.
- Notification center redesigned with unread/read visual states.
- "Tất cả" and "Chưa đọc" notification filters added.
- Individual notifications can be marked read.
- "Đánh dấu đã đọc" marks all notifications read.
- Read notification state persists in localStorage.
- Profile page redesigned as an account dashboard.
- Activity stats show saved count, unread notification count, and whether a saved Assistant preference exists.
- Editable display name and city demo fields added.
- Profile state persists in localStorage and rehydrates the profile page.
- Account quick links connect Saved, Notifications, 80Land Assistant, and Landlord.
- Profile personalization panel reflects the saved 80Land Assistant criteria.
- Demo security panel explains where authentication/session controls will live after backend integration.
- Mobile account flows remain compatible with the existing bottom navigation and desktop user menu.

## Static verification
- JavaScript parenthesis balance: 1102 / 1102.
- CSS brace balance: 1056 / 1056.
- Saved state helper present.
- Notification persistence helper present.
- Profile persistence helper present.
- Saved removal interaction present.
- Notification read/filter interactions present.
- Profile edit sheet interaction present.
- Assistant preference summary bridge present.
- Phase 6 CSS present.

## Browser QA
A real remote browser render remains blocked in the coding container because GitHub DNS/network access is unavailable. Local browser QA must be completed after pulling the latest phase commits.

## Local QA matrix

### Desktop
- 1440 px: verify profile dashboard balance, saved cards, and notification list.
- 1280 px: verify account grid does not become cramped.
- 1024 px: verify profile side panel moves below the main content cleanly.

### Mobile
- 430 px: verify saved cards, notification controls, profile editing sheet, and account quick links.
- 390 px: verify no horizontal overflow and bottom navigation remains usable.
- 360 px: verify profile cards, notification filters, and edit sheet remain inside the viewport.

### Interaction checks
- Open /saved, remove saved listings, reload, and confirm the removals persist.
- Open /saved with no saved listings and confirm the empty state appears.
- Open /notifications, mark one notification as read, reload, and confirm the state persists.
- Filter notifications to "Chưa đọc" and confirm only unread items remain.
- Mark all notifications read and confirm the unread count becomes zero.
- Open /profile, edit name and city, save, reload, and confirm persistence.
- Open /profile after setting Assistant criteria and confirm the personalization summary is shown.
- Open the quick links and verify routes to Saved, Notifications, Assistant, and Landlord.

## Status
Phase 6 code: DONE
Static checks: PASS
Remote browser render: BLOCKED by environment network/DNS
Local browser QA: PENDING
