# Playwright Testing Tool Demo

## Quick Setup Instructions

1. **Install Dependencies:**
   ```bash
   cd tests
   npm install
   ```

2. **Run Demo:**
   ```bash
   npm run test:demo
   ```
   - Runs 6 test cases (5 passing + 1 failing)
   - Auto-opens Allure report with screenshots/videos
   - Tests run sequentially for better demo flow

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

### Common Issues & Solutions

#### 1. **Port Connection Issues**
**Error:** Tests fail to connect to localhost
**Solution:** 
- Ensure your app is running on port 3000
- Config automatically tries ports 3000, 3001, 3002
- Update `TEST_PORT` environment variable if needed

#### 2. **TypeScript Process Error**
**Error:** `Cannot find name 'process'`
**Solution:** Install Node.js types
```bash
npm i --save-dev @types/node
```

#### 3. **Top-level Await Error**
**Error:** `require() cannot be used on an ESM graph with top-level await`
**Solution:** Removed async port detection, using environment variables instead

#### 4. **PowerShell Command Issues**
**Error:** `The token '&&' is not a valid statement separator`
**Solution:** Use semicolon (`;`) or separate npm scripts instead of `&&`

#### 5. **Firefox Timeout Issues**
**Error:** Firefox tests timeout during login
**Solution:** 
- Removed Firefox from config (Chrome only)
- Added longer timeouts for cross-browser testing if needed

#### 6. **CSS Selector Syntax Error**
**Error:** `Unexpected token "=" while parsing css selector`
**Solution:** Separate different selector types instead of combining:
```javascript
// Wrong:
page.locator('[data-testid="cart"], .cart, text=Cart')

// Correct:
const cartByTestId = page.locator('[data-testid="cart"]');
const cartByClass = page.locator('.cart');
const cartByText = page.locator('text=Cart');
```

#### 7. **Allure Report Accumulation**
**Issue:** Report shows old test results (14 tests instead of 6)
**Solution:** Auto-clean results before each run:
```bash
rmdir /s /q allure-results 2>nul
```

#### 8. **Missing Allure Dependencies**
**Error:** `Missing script: "allure:serve"`
**Solution:** Install required packages:
```bash
npm install --save-dev allure-playwright allure-commandline
```

### Best Practices Learned
- Use sequential test execution for better demo flow
- Always capture screenshots and videos for debugging
- Clean test results between runs for accurate reporting
- Use environment variables for flexible configuration
- Separate different selector types for better reliability