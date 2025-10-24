# Playwright Demo - Troubleshooting Guide

## Common Issues & Solutions

### 1. **Node.js Version Issues**
**Error:** Playwright requires Node.js 16+
**Solution:** Update Node.js to latest LTS version from [nodejs.org](https://nodejs.org/)

### 2. **Browser Installation Issues**
**Error:** Browser binaries not found
**Solution:** 
```bash
npx playwright install
```

### 3. **Missing Dependencies**
**Error:** `Missing script: "allure:serve"` or module not found
**Solution:** Install required packages:
```bash
npm install
npm install --save-dev allure-playwright allure-commandline
```

### 4. **Port Connection Issues**
**Error:** Tests fail to connect to localhost
**Solution:** 
- Ensure your web application is running on port 3000
- Check if port is available: `netstat -an | findstr :3000`

### 5. **PowerShell Command Issues**
**Error:** `The token '&&' is not a valid statement separator`
**Solution:** Use Command Prompt instead of PowerShell, or use semicolon (`;`)

### 6. **TypeScript Errors**
**Error:** `Cannot find name 'process'` or TypeScript compilation errors
**Solution:** Install Node.js types
```bash
npm i --save-dev @types/node
```

## Quick Fixes

### Reset Installation
```bash
# Clean install
rmdir /s /q node_modules
del package-lock.json
npm install
npx playwright install
```

### Verify Setup
```bash
# Check versions
node --version
npm --version
npx playwright --version
```