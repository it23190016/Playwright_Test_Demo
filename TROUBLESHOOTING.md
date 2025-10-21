# Playwright Demo - Troubleshooting Guide

## Development Issues Encountered & Solutions

This document chronicles all issues faced during development and their solutions, based on our implementation journey.

### 1. **Application Port Configuration**

**Issue:** Tests initially configured for localhost:3002, but application runs on localhost:3000
```
baseURL: 'http://localhost:3002'  // Wrong port
```

**Error Symptoms:**
- Tests fail to connect to application
- Connection timeout errors

**Solution Applied:**
```typescript
const port = process.env.TEST_PORT || '3000';
baseURL: `http://localhost:${port}`
```

**Lesson:** Always verify application port before configuring tests.

---

### 2. **TypeScript Process Object Error**

**Issue:** TypeScript cannot recognize `process` object
```
Cannot find name 'process'. Do you need to install type definitions for node?
```

**Root Cause:** Missing Node.js type definitions

**Solution Applied:**
```bash
npm i --save-dev @types/node
```

**Lesson:** Always install type definitions for Node.js globals in TypeScript projects.

---

### 3. **Top-level Await in Config File**

**Issue:** Used async/await at module level in playwright.config.ts
```javascript
// Problematic code:
const port = await findAvailablePort();
```

**Error:**
```
Error: require() cannot be used on an ESM graph with top-level await
```

**Root Cause:** Playwright config loader doesn't support top-level await

**Solution Applied:**
- Removed async port detection
- Used environment variables instead
- Simplified configuration

**Lesson:** Keep Playwright config files synchronous and simple.

---

### 4. **PowerShell Command Separator Issues**

**Issue:** Using `&&` operator in npm scripts on Windows PowerShell
```json
"test:demo": "playwright test && allure serve"
```

**Error:**
```
The token '&&' is not a valid statement separator in this version
```

**Root Cause:** PowerShell uses different command separators than bash

**Solutions Applied:**
1. Use semicolon: `command1; command2`
2. Use separate npm scripts with `npm run`
3. Use `&` for PowerShell compatibility

**Lesson:** Consider cross-platform compatibility in npm scripts.

---

### 5. **Firefox Browser Timeout Issues**

**Issue:** Firefox tests consistently timeout during login process
```
Test timeout of 30000ms exceeded while running "beforeEach" hook
Error: page.click: Test timeout of 30000ms exceeded
```

**Root Cause:** Firefox handles login button clicks differently than Chrome

**Solutions Attempted:**
1. Increased timeout values
2. Added longer actionTimeout for Firefox
3. Used different click strategies

**Final Solution:** Removed Firefox from configuration, focused on Chrome for demo reliability

**Lesson:** For demos, prioritize reliability over comprehensive browser coverage.

---

### 6. **CSS Selector Syntax Error**

**Issue:** Mixing different selector types in single locator
```javascript
// Problematic:
page.locator('[data-testid="cart-icon"], .cart-icon, text=Cart')
```

**Error:**
```
Unexpected token "=" while parsing css selector
```

**Root Cause:** Cannot mix CSS selectors with Playwright's text selectors

**Solution Applied:**
```javascript
// Correct approach:
const cartByTestId = page.locator('[data-testid="cart-icon"]');
const cartByClass = page.locator('.cart-icon');
const cartByText = page.locator('text=Cart');
```

**Lesson:** Use separate locators for different selector types.

---

### 7. **Allure Report Result Accumulation**

**Issue:** Allure report showing 14 tests when only 6 exist
- Current run: 6 tests
- Allure report: 14 tests (including old results)

**Root Cause:** Allure accumulates results from multiple test runs

**Solution Applied:**
```json
"test:demo": "rmdir /s /q allure-results 2>nul & playwright test && npm run allure:serve"
```

**Configuration Added:**
```typescript
reporter: [
  ['allure-playwright', {
    outputFolder: 'allure-results',
    clean: true
  }]
]
```

**Lesson:** Always clean test results between demo runs for accurate reporting.

---

### 8. **Missing Allure Dependencies**

**Issue:** Allure commands not found
```
npm error Missing script: "allure:serve"
```

**Root Cause:** Missing allure-commandline package

**Solution Applied:**
```bash
npm install --save-dev allure-playwright allure-commandline
```

**Package.json Updated:**
```json
{
  "scripts": {
    "allure:serve": "allure serve allure-results"
  }
}
```

**Lesson:** Install both reporter and command-line tools for complete Allure integration.

---

### 9. **Test Execution Order for Demo**

**Issue:** Tests running in parallel made demo hard to follow

**Solution Applied:**
```typescript
// Config changes:
fullyParallel: false,
workers: 1,

// Test file changes:
test.describe.serial('🎭 Playwright Demo', () => {
```

**Benefit:** Sequential execution creates better demo flow and clearer video recordings.

---

### 10. **Screenshot and Video Configuration**

**Issue:** No visual evidence in reports initially

**Solution Applied:**
```typescript
use: {
  screenshot: 'always',
  video: 'retain-on-failure',
  trace: 'on',
}
```

**Result:** Rich visual reporting with automatic screenshot/video capture.

---

## Prevention Strategies

### **Before Starting:**
1. Verify application port and connectivity
2. Install all required type definitions
3. Test npm scripts on target platform (Windows/Mac/Linux)

### **During Development:**
1. Keep configurations simple and synchronous
2. Test cross-browser compatibility early
3. Use separate locators for different selector types
4. Clean test results between runs

### **For Demos:**
1. Prioritize reliability over comprehensive coverage
2. Use sequential execution for better flow
3. Enable visual evidence capture
4. Have fallback plans for technical issues

## Quick Diagnostic Commands

```bash
# Check if app is running
curl http://localhost:3000

# Verify npm packages
npm list --depth=0

# Clean and restart
rmdir /s /q allure-results node_modules
npm install
npm run test:demo

# Test individual components
npx playwright test --headed
npm run allure:serve
```

This troubleshooting guide ensures future developers can avoid the same pitfalls and quickly resolve similar issues.