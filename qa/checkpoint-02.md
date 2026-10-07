# SQLite and catalog checkpoint

Date: 2026-10-01. Version: 0.1.0 uncommitted checkpoint 2 working tree. Windows, Node 24.19.0, local development. Related: KAN-11 and KAN-7.

Assistant-executed checks:
- db:seed succeeded; db:reset succeeded; repeating db:seed preserved baseline counts.
- A separate Node process reopened the file and asserted six products, two categories and two synthetic customer records.
- An attempted negative stock update was rejected by the database constraint.
- npm run build passed after retrying outside the sandbox's child-process restriction.
- HTTP GET /api/products through port 5173 returned all six seeded products, integer priceCents and stock values.

These are command/API checks, not learner manual testing. Reopening persisted data was verified; a full dev-server stop/start persistence exercise remains pending.

Learner catalog check: Not Run. Expected six product cards; Canvas Tote EUR 19.99 with stock 5; Desk Pouch Out of stock. Browser layout not independently inspected by the assistant.

Two customer records exist but authentication is not implemented. Search/filter and cart are also absent. KAN-7 and KAN-11 must remain open.

Previous checkpoint follow-up: learner supplied a DevTools screenshot showing status ok and service shopcheck-api, then reported HTTP 200 in chat. This supports the learner's health-response inspection only.
