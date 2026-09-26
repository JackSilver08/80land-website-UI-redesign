# 80Land Client Handover

## Release status
Approved UI baseline for client handoff.

- Repository: `JackSilver08/80land-website-UI-redesign`
- Branch: `main`
- Final handoff commit: `90418299278491be51244ad48c4df209973f5635`
- Product source of truth: shipped HTML/CSS/JS implementation in this repository.
- Temporary Figma HTML-capture code has been removed from `index.html` before handoff.

## Scope delivered
Renter:
- Home
- Search
- Filter
- Map
- Property Detail
- Saved
- Messages
- Notifications
- Profile
- 80Land Assistant
- Provinces / Province Detail

Landlord:
- Dashboard
- Create Listing
- Edit Listing
- Preview Listing
- Listing status flows

Wallet / Referral:
- Wallet
- Earnings
- Withdrawal prototype flow
- Referral Hub

Admin:
- Overview
- Listing moderation
- User management
- Reports
- Audit log

## QA baseline
- Route smoke test: 23 / 23 tested route states rendered successfully.
- JavaScript syntax balance verified.
- CSS syntax brace balance verified.
- Mobile hardening applied to Assistant, Landlord, Referral, Wallet, Admin and bottom navigation.
- Recommendation demo contains 15 listings arranged as 5 cards per desktop row.
- Pagination demo is present beneath the recommendation grid.

## Important prototype boundary
The current project is a static-first UI prototype.

The following are demo/local behaviors and are not connected to a production backend:
- Wallet balance and transactions
- Withdrawal requests
- Referral earnings
- Admin moderation state
- Admin audit log
- Profile data
- Saved state
- Notification read state
- Landlord draft and listing records

Production integration still requires the real backend/API, authentication/authorization, database, storage, payment/payout provider, maps/location service, and server-side moderation/audit persistence.

## Figma handoff
Figma file:
https://www.figma.com/design/uH64OwD6PgMLMGukKB63VO

The HTML-to-Figma capture successfully demonstrated that the live approved web UI can be captured into Figma. However, the current captured file should be treated as a visual reference rather than the final editable design-system source until the remaining Figma cleanup and interaction mapping are completed.

## Production deployment notes
The application uses client-side history routing with paths such as `/search`, `/map`, `/property/:id`, `/landlord`, and `/admin`.

Any static hosting provider should be configured with a history fallback/rewrite to `index.html` so direct route refreshes do not return a 404.

The page loads Bootstrap, Bootstrap Icons, Material Symbols, and Be Vietnam Pro from external CDNs. Production environments therefore need network access to those assets or a self-hosted asset strategy.

## Final acceptance checklist
1. Pull `main`.
2. Open the home page on desktop.
3. Verify recommendation grid: 5 cards per row.
4. Verify the mobile bottom navigation.
5. Test Home → Search → Detail.
6. Test Home → Assistant → Result → Detail.
7. Test Saved state.
8. Test Landlord create/edit/preview.
9. Test Wallet and Referral prototype flows.
10. Test Admin views.
11. Test direct refresh on nested routes after deployment.
12. Record any new change as a post-handoff change request instead of modifying the approved baseline informally.

## Post-handoff rule
Once the client has accepted this baseline, visual or functional changes should be tracked as explicit change requests with their own scope, review, and release commit.
