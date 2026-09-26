# 80Land Phase 9 QA

## Scope
Phase 9 upgrades the prototype Admin area into an Admin Center covering moderation, user management, reports, system health, and audit history.

## Implemented
- Admin Center at `/admin`.
- Tabbed admin navigation:
  - Tổng quan
  - Tin đăng
  - Người dùng
  - Báo cáo
  - Audit log
- Overview dashboard with:
  - Active users
  - Listing count
  - Pending moderation
  - Open reports
  - Flagged-user count
  - Moderation queue
  - System health summary
- Listing moderation:
  - Search by listing ID, title, or owner.
  - Status filters.
  - Approve pending listings.
  - Hide approved listings.
  - Re-show hidden listings.
- User management:
  - Search by account ID, name, or role.
  - View role, listing count, joined date, and status.
  - Suspend active users.
  - Reactivate suspended users.
- Report handling:
  - Priority display.
  - Open/resolved state.
  - Resolve report action.
  - Open/high-priority summary.
- Audit log:
  - Admin actions are appended locally.
  - Shows time, actor, action, and detail.
- Prototype permission/system-health card added.
- Admin state persisted with localStorage.

## Local storage keys
- `80land:admin:state`
- `80land:admin:audit`

## Prototype data note
Moderation, user, report, system-health, and audit records are demo data in this static prototype. Real permissions, moderation decisions, metrics, and audit storage must be connected to the backend before production use.

## Static verification
- `js/app.js` parenthesis balance: 1906 / 1906.
- `js/app.js` brace balance: 439 / 439.
- `css/components.css` brace balance: 1471 / 1471.
- Admin overview function present.
- Listing moderation view present.
- User management view present.
- Report management view present.
- Audit log view present.
- Listing search binding present.
- User search binding present.
- Listing moderation actions present.
- User suspend/reactivate actions present.
- Report resolve action present.
- Audit persistence present.
- Admin route remains registered.

## Browser QA
Remote browser rendering remains unavailable in the coding environment because GitHub-hosted assets cannot be reliably reached. Local browser QA should be completed after pulling the latest `main`.

## Local QA matrix

### Desktop
- 1440 px: verify admin header, tabs, KPI cards, moderation queue, and system-health sidebar.
- 1280 px: verify admin overview grid stays balanced.
- 1024 px: verify sidebar cards collapse without overflow.
- 1440 px: verify listings/users/reports tables remain readable.

### Mobile
- 430 px: verify tabs scroll horizontally without page overflow.
- 390 px: verify search fields become full width.
- 360 px: verify each admin row stacks correctly and actions remain reachable above the mobile navigation.

### Interaction checks
- Open `/admin` and inspect overview metrics.
- Open `/admin?view=listings` and search for `80L-1419`.
- Approve `80L-1420` and confirm its state changes to `Đã duyệt`.
- Hide the approved listing and confirm its state becomes `Đã ẩn`.
- Open `/admin?view=users`, suspend `U-9814`, then reactivate it.
- Open `/admin?view=reports`, resolve `R-183`.
- Open `/admin?view=audit` and verify the actions appear in the audit trail.
- Refresh and confirm moderation and audit state persists through localStorage.
- Switch between all admin tabs and confirm the existing page shell and bottom mobile navigation remain intact.

## Status
Phase 9 code: DONE
Static checks: PASS
Remote browser render: BLOCKED by environment network/DNS
Local browser QA: PENDING
