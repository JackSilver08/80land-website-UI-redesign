# 80Land Phase 8 QA

## Scope
Phase 8 adds the wallet, earnings, referral, and withdrawal-request experience while keeping the current 80Land red / white / black marketplace system.

## Implemented
- Wallet Center at `/wallet`.
- Wallet balance, withdrawable balance, pending balance, and commission summary.
- Recent transaction list plus expandable full transaction list.
- Withdrawal request form with:
  - Amount validation.
  - Available-balance validation.
  - Bank selection.
  - Account number and account-holder validation.
  - Local prototype persistence.
- Withdrawal requests are stored as pending demo records.
- Earnings dashboard at `/earnings`.
- Monthly income summary, cumulative income, commission, pending amount, and source breakdown.
- Lightweight monthly trend visualization using CSS bars.
- Referral Hub at `/referrals`.
- Referral code and shareable referral link.
- Referral metrics and recent referred-user states.
- Copy code / copy link interactions.
- Native device sharing when supported.
- Wallet, earnings, and referral routes registered in the router.
- Wallet and referral shortcuts exposed from the account dropdown.
- Wallet, withdrawal, referral, and earnings demo state persisted through localStorage.

## Prototype data note
Phase 8 uses local demo data because there is no connected wallet, payout, referral, or commission backend in this static prototype. The UI explicitly marks these areas as prototype/demo and does not present the sample amounts or rules as production policy.

## Local storage keys
- `80land:wallet`
- `80land:wallet:transactions`
- `80land:withdrawals`
- `80land:referrals`
- `80land:earnings`

## Static verification
- `js/app.js` parenthesis balance: 1700 / 1700.
- `js/app.js` brace balance: 366 / 366.
- `css/components.css` brace balance: 1359 / 1359.
- Wallet route present.
- Earnings route present.
- Referral route present.
- Wallet page function present.
- Earnings page function present.
- Referral page function present.
- Withdrawal form binding present.
- Copy referral interactions present.
- Wallet and referral account-menu links present.
- Existing landlord edit and preview routes remain present.

## Browser QA
Remote browser rendering remains unavailable in the coding environment because the environment cannot reliably reach GitHub-hosted assets. Local browser QA should be run after pulling the latest `main`.

## Local QA matrix

### Desktop
- 1440 px: verify wallet hero balance card, summary cards, transaction list, and withdrawal form hierarchy.
- 1280 px: verify wallet content grid remains balanced.
- 1024 px: verify the wallet side stack collapses cleanly.
- 1440 px: verify earnings chart and source breakdown.
- 1440 px: verify referral code area, metrics, referred-user list, and share banner.

### Mobile
- 430 px: verify wallet balance, action buttons, transaction rows, and withdrawal form.
- 390 px: verify referral code/link controls do not overflow.
- 360 px: verify earnings cards and mobile bottom navigation do not overlap or cause horizontal scrolling.

### Interaction checks
- Open `/wallet`.
- Click `Rút tiền` and confirm focus/scroll moves to the withdrawal form.
- Submit an amount under 100.000đ and confirm validation.
- Submit more than available balance and confirm validation.
- Submit valid withdrawal data and confirm a new pending transaction is stored.
- Open the full transaction list and collapse it again.
- Open `/earnings` and verify the metric cards and monthly bars render.
- Open `/referrals` and copy the referral code.
- Copy the referral link from both copy buttons.
- Use native share on a device/browser that supports `navigator.share`.
- Refresh after interactions and confirm localStorage state persists.
- Open wallet/referral from the desktop account menu.

## Status
Phase 8 code: DONE
Static checks: PASS
Remote browser render: BLOCKED by environment network/DNS
Local browser QA: PENDING
