# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright + TypeScript E2E test automation framework for [21vek.by](https://www.21vek.by), a Belarusian e-commerce website. The framework covers both **UI tests** (browser automation) and **API tests** (against `gate.21vek.by`).

## Commands

### Setup
```bash
npm ci
npx playwright install --with-deps
cp .env.example .env   # then fill in credentials
```

### Running Tests
```bash
npm test                    # all tests
npm run test:ui             # UI tests only (Chromium, @ui tag)
npm run test:api            # API tests only (@api tag)
npm run test:smoke          # @smoke tagged tests
npm run test:regression     # @regression tagged tests
npm run test:headed         # headed mode (visible browser)
npm run test:debug          # Playwright Inspector
npm run test:parallel       # 4 workers
```

Run a single test file:
```bash
npx playwright test tests/ui/login.spec.ts
npx playwright test tests/api/auth/login.spec.ts
```

Run by test title grep:
```bash
npx playwright test --grep "T1 \[Login\]"
```

### Code Quality
```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format
npm run verify        # lint + typecheck (used in CI)
npm run typecheck     # tsc --noEmit
```

### Reports
```bash
npm run report                  # open Playwright HTML report
npm run report:allure           # generate + open Allure report (requires Java 11+)
npm run report:allure:clean     # clean allure-results/ and allure-report/
```

### Docker
```bash
docker build -t 21vek-tests .
docker run --rm \
  -e BASE_URL=https://21vek.by \
  -e LOGIN_EMAIL=your_email \
  -e LOGIN_PASSWORD=your_password \
  -v "${PWD}/allure-results:/app/allure-results" \
  21vek-tests
```

## Architecture

### Two URL domains
- **UI** (`playwright.config.ts` `baseURL`): `https://www.21vek.by`
- **API** (all API clients): `https://gate.21vek.by` — set in `api/request.ts`

### Directory Structure

```
pages/              # Page Object Model
  BasePage.ts       # Base class: goto(), expectTitle(), expectUrl()
  components/
    BaseComponent.ts # Base class: expectVisible/Hidden(), waitFor*()
  home/             # HomePage + Header, Modals, Cookie dismissal
  search/           # SearchResultsPage, ProductCard, FloaterModal
  order/            # OrderPage + basket items, delivery, payment, promos
  payment/          # WebpayPaymentPage

tests/
  ui/               # UI specs + helpers/purchaseFlow.ts
  api/
    auth/           # authClient.ts + login/logout specs
    cart/           # cartClient.ts + cart spec
    catalog/        # catalog.ts + catalog/search specs

fixtures/
  test.fixture.ts   # UI fixtures (extends base test)
  api.fixture.ts    # API fixtures

utils/
  config.ts         # Reads env vars (BASE_URL, LOGIN_EMAIL, LOGIN_PASSWORD)
  login.ts          # loginViaApi() — posts to gate.21vek.by SSO

api/
  request.ts        # createAPIContext() and createAuthenticatedAPIContext()

types/
  User.ts           # { email, password }
```

### Fixtures Pattern

**UI tests** import from `fixtures/test.fixture.ts`:

| Fixture | Scope | Description |
|---|---|---|
| `authCookies` | worker | Logs in via API once per worker; reused across tests |
| `homePage` | test | Unauthenticated `HomePage` |
| `authHomePage` | test | `HomePage` with cookies pre-injected + cookies dismissed |
| `searchResultsPage` | test | `SearchResultsPage` |
| `orderPage` | test | `OrderPage` |
| `webpayPaymentPage` | test | `WebpayPaymentPage` |
| `emptyCart` | test | Clears cart via API before test runs |

**API tests** import from `fixtures/api.fixture.ts`:

| Fixture | Description |
|---|---|
| `apiContext` | Unauthenticated `APIRequestContext` to `gate.21vek.by` |
| `authClient` | `AuthClient` instance |
| `catalog` | `Catalog` instance |
| `authCatalog` | Logs in, returns authenticated `Catalog` |
| `cartClient` | `CartClient` instance |
| `authCartClient` | Logs in, clears cart, returns `CartClient`; clears cart after |

### Authentication Flow

1. `loginViaApi()` in `utils/login.ts` POSTs credentials to `https://gate.21vek.by/sso/login-by-email` and returns session cookies.
2. For UI tests: `authHomePage` fixture injects cookies into the browser context (remapped to `.21vek.by` domain) — no UI login needed.
3. For API tests: `AuthClient.login()` in `tests/api/auth/authClient.ts` handles token extraction from `set-cookie` headers.

### Test Tags

Every test must have tags as the second argument to `test()`:
- Category: `@ui` or `@api`
- Suite: `@regression` or `@smoke`
- Priority: `@P1` (critical) or `@P2` (important)

Example:
```ts
test('T1 [Login] valid credentials', { tag: ['@ui', '@regression', '@P1'] }, async ({ ... }) => { ... });
```

### Data-Driven Tests

Tests use typed case arrays to avoid repetition. Each case includes `title`, input data, and expected outcome. The spec loops over cases with `for (const testCase of cases)`.

### Page Object Conventions

- Pages extend `BasePage` and receive `Page` as constructor argument.
- Components extend `BaseComponent` and receive `Locator` as constructor argument.
- Page constructors instantiate all sub-components.
- Actions and assertions are defined as async methods on the page/component class — no raw Playwright calls in spec files.

### ESLint Rules of Note

- Single quotes for strings (`quotes: ['error', 'single']`)
- 2-space indent
- No `console.log` (warn level — `console.warn` is allowed)
- `@typescript-eslint/no-explicit-any` is a warning, not error
- `eslint-plugin-playwright` rules applied to `tests/**/*.ts`

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BASE_URL` | No | UI base URL (default: `https://www.21vek.by`) |
| `LOGIN_EMAIL` | Yes | Test account email |
| `LOGIN_PASSWORD` | Yes | Test account password |
| `NAME` | No | Test user display name |
| `ALLURE_RESULTS_DIR` | No | Override Allure output dir (used in CI to separate ui/api results) |

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`) triggers on push to `main`:
1. **lint-and-check** — ESLint + `tsc --noEmit`
2. **api-tests** and **ui-tests** — run in parallel (both depend on step 1), using the official Playwright Docker container; output to separate `ALLURE_RESULTS_DIR` dirs
3. **allure-report** — merges api and ui allure results into one report
4. **deploy-allure** — deploys the combined report to GitHub Pages (only on `main`)

Required repository secrets: `BASE_URL`, `LOGIN_EMAIL`, `LOGIN_PASSWORD`, `NAME`.
