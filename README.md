# SauceDemo QA Automation Framework

[![Playwright Tests](https://github.com/YOUR_USERNAME/saucedemo-qa-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/saucedemo-qa-framework/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/Allure-Report-orange)](https://YOUR_USERNAME.github.io/saucedemo-qa-framework/)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Playwright](https://img.shields.io/badge/Playwright-1.44-green)

> Production-grade Playwright E2E test framework for [SauceDemo](https://www.saucedemo.com), an e-commerce web application. Built with TypeScript, Page Object Model architecture, GitHub Actions CI/CD, and Allure reporting.

---

## 📋 Test Coverage

| Module | Smoke | Regression | E2E | Total |
|---|---|---|---|---|
| Authentication | 2 | 7 | — | 9 |
| Products | 2 | 10 | — | 12 |
| Cart | 2 | 6 | — | 8 |
| Checkout | 2 | 10 | — | 12 |
| End-to-End Flows | 2 | — | 4 | 6 |
| **Total** | **10** | **33** | **4** | **47** |

---

## 🏗️ Project Architecture

```
saucedemo-qa-framework/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts     # Shared page methods
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── ProductDetailPage.ts
│   ├── fixtures/
│   │   └── index.ts        # Custom Playwright fixtures
│   └── data/
│       ├── users.ts        # Test users (valid & invalid)
│       └── products.ts     # Product data & checkout info
├── tests/
│   ├── auth/               # Login & session tests
│   ├── products/           # Product listing & sorting
│   ├── cart/               # Cart management
│   ├── checkout/           # Full checkout flow
│   └── e2e/                # Full purchase journeys
├── .github/workflows/
│   └── playwright.yml      # CI pipeline + Allure report deploy
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/saucedemo-qa-framework.git
cd saucedemo-qa-framework
npm install
npx playwright install
```

### Run Tests

```bash
# Run smoke tests (fast, critical paths only)
npm run test:smoke

# Run full regression suite
npm run test:regression

# Run all tests
npm test

# Run in headed mode (watch browser)
npm run test:headed

# Run a specific file
npx playwright test tests/auth/login.spec.ts
```

### View Reports

```bash
# Open Playwright HTML report
npx playwright show-report

# Generate + open Allure report (requires allure CLI)
npm run allure:generate
npm run allure:open
```

---

## 🔧 Key Design Decisions

### Page Object Model
Every page is a class with typed locators and action methods. Tests stay clean — they read like plain English and never contain raw selectors.

### Custom Fixtures
`authenticatedTest` is a pre-authenticated fixture that handles login setup. Tests that need a logged-in state use `authenticatedTest` instead of repeating login steps, keeping tests DRY.

### Test Tagging Strategy
- `@smoke` — 10 critical tests, run on every push (~1 min)
- `@regression` — Full suite, run on PRs and nightly schedule
- `@e2e` — Full user journey tests

### CI/CD Pipeline
- Pushes to `main` / `develop` trigger smoke tests
- PRs to `main` trigger regression suite
- Nightly cron runs full regression
- Allure report auto-deploys to GitHub Pages on merge to main

---

## 📊 CI Pipeline

The GitHub Actions workflow:
1. Installs Node.js 20 + dependencies
2. Installs Playwright Chromium browser
3. Runs the appropriate tagged test suite
4. Uploads Playwright HTML report as artifact
5. Uploads Allure results as artifact
6. Publishes Allure report to GitHub Pages

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Playwright 1.44 | Browser automation |
| TypeScript 5 | Type safety |
| GitHub Actions | CI/CD pipeline |
| Allure Report | Test reporting |
| Page Object Model | Framework architecture |

---

## 📄 License

MIT
