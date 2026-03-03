## 21vek.by Automated Tests (Playwright + TypeScript)

End-to-end and API tests for `https://www.21vek.by` using Playwright.

### Prerequisites
- Node.js LTS (>= 20)
- pnpm or npm

### Env setup
Create `.env` based on `.env.example`:
```
BASE_URL=https://www.21vek.by
LOGIN_EMAIL=example@email.com
LOGIN_PASSWORD=secret
```

### Install
```
npm ci
npx playwright install --with-deps
```

### Run
- All tests: `npm test`
- UI tests only: `npm run test:ui`
- Authenticated UI tests: `npm run test:ui:auth`
- API tests only: `npm run test:api`
- Generate Allure report: `npm run report:allureCI`

### Auth storage setup
An auth bootstrap test at `tests/auth.auth.setup.ts` logs in and saves `.auth/user.json` used by `chromium-auth` project.
Run any suite that depends on `setup` and it will execute automatically.

### Reports
- HTML: `playwright-report/`
- Allure: `allure-results/` → `allure-report/`

### CI
- See `.github/workflows/playwright.yml` for GitHub Actions.
- See `Jenkinsfile` for Jenkins pipelines.

### Docker
Build and run headless in container using `Dockerfile`.