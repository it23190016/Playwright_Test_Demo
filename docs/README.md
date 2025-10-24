# Playwright Testing Tool Demo

## Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Web application** running on localhost:3000(default)

## Quick Setup

1. **Navigate to tests directory:**
   ```bash
   cd tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Run demo:**
   ```bash
   npm run test:demo
   ```
   - Runs 6 test cases (5 passing + 1 failing)
   - Auto-opens Allure report with screenshots/videos
   - Tests run sequentially for better demo flow

## Manual Report Commands

```bash
# Generate and serve report
npx allure serve allure-results

# Or generate then open
npx allure generate allure-results --clean
npx allure open allure-report
```

## Key Features Demonstrated

- **Auto-waiting:** No explicit waits needed (vs Selenium)
- **Built-in Screenshots/Videos:** Automatic capture
- **Rich Reporting:** Allure integration with visual evidence
- **Cross-browser Testing:** Same code, multiple browsers
- **Modern Selectors:** CSS, text, data-testid support

## Test Application
- Juice Bar e-commerce app running on localhost:3000
- Admin login functionality
- Dynamic UI testing (Edit buttons vs Add to Cart)

## Troubleshooting

For common issues and solutions, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)