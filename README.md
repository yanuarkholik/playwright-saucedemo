# SauceDemo Playwright Automation

Automated UI testing untuk [SauceDemo](https://www.saucedemo.com/) menggunakan **Playwright** dan **OpenCode AI Agent**.

## Tech Stack

| Package | Version | Type |
|---------|---------|------|
| playwright | ^1.58.2 | dependency |
| @playwright/test | ^1.59.1 | devDependency |
| dotenv | ^17.4.2 | dependency |
| typescript | ^6.0.3 | devDependency |
| @types/node | ^25.6.2 | devDependency |

## OpenCode Integration

Project ini dikembangkan menggunakan **OpenCode** dengan AI Agent khusus:

### Agent yang Digunakan

| Agent | Fungsi |
|-------|--------|
| `playwright-test-planner` | Membuat test plan komprehensif berdasarkan requirements |
| `playwright-test-generator` | Generate test cases dan page object dari test plan |
| `playwright-test-healer` | Debug dan fix failing tests |

### Workflow dengan OpenCode

1. **Planning** → Gunakan `/playwright-test-planner` untuk membuat test plan di `specs/ui/`
2. **Generation** → Gunakan `/playwright-test-generator` untuk generate code dari test plan
3. **Execution** → Jalankan tests dengan `npx playwright test`
4. **Healing** → Gunakan `/playwright-test-healer` jika ada test yang fail

### Contoh Command

```bash
# Generate test plan
/playwright-test-planner "Buat test plan untuk fitur checkout"

# Generate test cases dari plan
/playwright-test-generator "Buat test case dari specs/ui/checkout/checkout.spec.md"

# Jalankan semua tests
npx playwright test

# Jalankan test spesifik
npx playwright test tests/ui/cart/cart.spec.ts
```

## Project Structure

```
├── .env                          # Environment variables (credentials)
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
│
├── specs/                        # Test plans (Markdown)
│   └── ui/
│       ├── login/
│       └── cart/
│
├── tests/                        # Test files
│   └── ui/
│       ├── login/
│       │   └── login.spec.ts
│       └── cart/
│           └── cart.spec.ts
│
└── src/
    └── pages/                    # Page Object Models
        ├── login/
        │   └── login.page.ts
        └── cart/
            └── cart.page.ts
```

## Setup & Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Configuration

### Playwright Config (`playwright.config.ts`)

| Setting | Value |
|---------|-------|
| Browser | Chromium (Chrome) |
| Headless | false (browser terlihat) |
| Timeout | 30 detik |
| Workers | 1 (sequential) |
| Screenshot | only-on-failure |
| Video | retain-on-failure |


## Path Aliases (`tsconfig.json`)

| Alias | Path |
|-------|------|
| `@pages/*` | `src/pages/*` |
| `@components/*` | `pages/components/*` |
| `@utils/*` | `src/utils/*` |
| `@data/*` | `data/*` |
| `@media/*` | `media/*` |
