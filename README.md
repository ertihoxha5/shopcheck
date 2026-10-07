# ShopCheck

A beginner manual QA portfolio learning project. Current checkpoint: React/TypeScript catalog, Express API and SQLite persistence. Authentication, search/filter, cart and checkout are not implemented yet.

## Local setup

Use Node.js 24 and PowerShell. In the project directory:

```powershell
npm ci
npm run db:seed
npm run dev
```

Open http://127.0.0.1:5173. Expected page: ShopCheck with “Server connected”. Keep PowerShell running; Ctrl+C stops the local processes. The server listens on 127.0.0.1:3001. Both services are local development services, not a production deployment.

No .env file or credentials are needed at this checkpoint. .env.example records this explicitly.

## Checks

```powershell
npm run build
Invoke-RestMethod http://127.0.0.1:5173/api/health
```

Build checks TypeScript and creates the client bundle in dist. It does not create a complete production server deployment. The health request requires npm run dev and should return status `ok` and service `shopcheck-api`.

If a port is occupied, stop the previous ShopCheck process with Ctrl+C; do not terminate unidentified processes. If the page reports the server unavailable, inspect the server terminal output and refresh after resolving the error.

## QA records

- [Requirements](qa/requirements.md)
- [Workflow and backlog](qa/workflow.md)

The learner authored the initial customer cart-isolation criterion; the assistant drafted the remaining criteria and this initial scaffold. Manual learner execution and assistant checks must be recorded separately.

## Checkpoint 2 database

SQLite data is stored in data/shopcheck.sqlite, ignored by Git. We use Node's built-in node:sqlite API with Node 24; no separate database installation is needed. Some Node versions may print an experimental API warning.

Run from the project root in PowerShell:

- `npm run db:seed`: creates tables and inserts missing baseline records; preserves existing rows. Expected: Seed complete. Repeating it does not duplicate rows.
- `npm run db:reset`: resets only the local product/customer tables to the baseline below. It discards edits in those tables. Stop the app with Ctrl+C first, run reset, then npm run dev. Expected: Local test data reset: 2 customers, 6 products.

The two synthetic customer records are customer.a@example.test and customer.b@example.test. Login and credentials will be added in the authentication checkpoint; these are not usable accounts yet.

| Product | Category | Price EUR | Stock |
| --- | --- | ---: | ---: |
| Canvas Tote | Accessories | 19.99 | 5 |
| Travel Bottle | Accessories | 25.00 | 8 |
| Desk Pouch | Accessories | 15.00 | 0 |
| Grid Notebook | Stationery | 10.05 | 10 |
| Pen Set | Stationery | 5.00 | 12 |
| Desk Planner | Stationery | 30.00 | 3 |

GET /api/products returns only public catalog fields, including integer priceCents. Startup never resets or seeds automatically. An empty catalog after a fresh install requires db:seed. For a database locked error, stop other ShopCheck processes and retry. Keep the data directory writable.
