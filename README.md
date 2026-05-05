# 21vek.by Test Automation

[![Playwright Tests](https://github.com/EugeneBeletsky/21-vek-by/actions/workflows/playwright.yml/badge.svg)](https://github.com/EugeneBeletsky/21-vek-by/actions/workflows/playwright.yml)

End-to-end UI and API test automation framework for [21vek.by](https://www.21vek.by) built with **Playwright** and **TypeScript**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Reports](#reports)
- [Docker](#docker)
- [CI/CD](#cicd)

---

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Playwright](https://playwright.dev/) | Browser automation & API testing |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test development |
| [Allure](https://allurereport.org/) | Test reporting with rich UI |
| [ESLint](https://eslint.org/) | Code linting |
| [Prettier](https://prettier.io/) | Code formatting |
| [Docker](https://www.docker.com/) | Containerized test execution |
| [GitHub Actions](https://github.com/features/actions) | CI pipeline |

---

## Project Structure

```
21-vek/
├── .github/workflows/       # GitHub Actions CI workflow
├── api/                      # API request helpers
├── fixtures/                 # Playwright test fixtures (UI & API)
├── pages/                    # Page Object Model
│   ├── BasePage.ts
│   ├── components/           # Shared base components
│   └── home/                 # Home page & its components
│       ├── HomePage.ts
│       └── components/       # Header, Modals, Search, Cart, etc.
├── tests/
│   ├── api/                  # API tests (auth, catalog, cart)
│   └── ui/                   # UI tests (login, logout, purchase, search)
├── utils/                    # Utilities (config, login, session)
├── Dockerfile                # Docker image for headless execution
├── playwright.config.ts      # Playwright configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20 LTS
- **npm** >= 9
- **Java JDK/JRE** >= 11 (required for Allure CLI)

### Installation

```bash
npm ci
npx playwright install --with-deps
```

### Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

`.env.example` contents:

```
BASE_URL=https://www.21vek.by
LOGIN_EMAIL=your_email@example.com
LOGIN_PASSWORD=your_password
NAME=YourName
```

---

## Running Tests

### All Tests

```bash
npm test
```

### By Category

| Command | Description |
| --- | --- |
| `npm run test:ui` | UI tests only (Chromium) |
| `npm run test:api` | API tests only |
| `npm run test:smoke` | Smoke suite (`@smoke` tag) |
| `npm run test:regression` | Regression suite (`@regression` tag) |

### By Browser / Mode

| Command | Description |
| --- | --- |
| `npm run test:chrome` | Run in Chromium |
| `npm run test:headed` | Run in headed mode |
| `npm run test:debug` | Run with Playwright Inspector |
| `npm run test:parallel` | Run with 4 workers |

### Code Quality

```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format
```

---

## Reports

The project generates two types of reports: **Playwright HTML** and **Allure**.

### Playwright HTML Report

```bash
npm run report
```

Opens the built-in Playwright HTML report from `playwright-report/`.

### Allure Report

Generate and open the Allure report:

```bash
npm run report:allure
```

Or step by step:

```bash
# Generate report from results
npm run report:allure:generate

# Open report in browser
npm run report:allure:open

# Clean previous results
npm run report:allure:clean
```

Allure results are written to `allure-results/` and the generated report goes to `allure-report/`.

---

## Docker

### Build the Image

```bash
docker build -t 21vek-tests .
```

### Run Tests in Container (PowerShell)

```bash
docker run --rm `
  -e BASE_URL=https://21vek.by `
  -e LOGIN_EMAIL=your_email `
  -e LOGIN_PASSWORD=your_password `
  -v "${PWD}/allure-results:/app/allure-results" `
  -v "${PWD}/playwright-report:/app/playwright-report" `
  21vek-tests
  ```

### Generate Allure Report

# Generate Allure report locally

```bash
npm run report:allure:generate
```

---

## CI/CD

### GitHub Actions

The workflow (`.github/workflows/playwright.yml`) runs on every pull request to `main` and can be triggered manually.

**Pipeline stages:**
1. **Lint & Type Check** -- ESLint + TypeScript compilation check
2. **E2E Tests** -- Runs Playwright tests in the official Playwright Docker container
3. **Reports** -- Uploads Allure results, Allure report, and Playwright HTML report as artifacts

Required repository secrets: `BASE_URL`, `LOGIN_EMAIL`, `LOGIN_PASSWORD`, `NAME`.