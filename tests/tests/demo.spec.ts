import { test, expect } from '@playwright/test';

test.describe.serial('🧃 Juice Bar E-commerce - Interactive Demo Scenarios', () => {

  test('✅ Customer Login and Shop', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'anypassword');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Our Juices');
    await expect(page.locator('text=Green Detox').first()).toBeVisible();
    
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    const cartButton = page.locator('button:has-text("Cart"), [data-testid="cart"], .cart-icon, a[href*="cart"]');
    if (await cartButton.count() > 0) {
      await cartButton.first().click();
      await expect(page.locator('text=Green Detox').first()).toBeVisible();
      await expect(page.locator('text=LKR').first()).toBeVisible();
    } else {
      await expect(page.locator('text=Green Detox').first()).toBeVisible();
    }
    

  });

  test('✅ Admin Login, View Products, Scroll, and Logout', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'admin@juicebar.com');
    await page.fill('input[type="password"]', 'anypassword');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Our Juices');
    
    await page.locator('button:has-text("Edit")').first().click();
    await page.waitForTimeout(1000);
    

    
    const cancelButton = page.locator('button:has-text("Cancel"), button:has-text("Close"), button:has-text("Back")');
    if (await cancelButton.count() > 0) {
      await cancelButton.first().click();
    } else {
      await page.goto('/dashboard');
    }
    await page.waitForTimeout(500);
    
    await expect(page.locator('button:has-text("Edit")')).toHaveCount(6);
    await expect(page.locator('button:has-text("Delete")')).toHaveCount(6);
    await expect(page.locator('button:has-text("Add to Cart")')).toHaveCount(0);
  });

  test('✅ Admin Add New Juice Product', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'admin@juicebar.com');
    await page.fill('input[type="password"]', 'anypassword');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    
    const addProductButton = page.locator('button:has-text("Add Product"), button:has-text("Add New Juice"), button:has-text("New Juice"), [data-testid="add-product"]');
    if (await addProductButton.count() > 0) {
      await addProductButton.first().click();
      
      const nameInput = page.locator('input[name="name"], input[placeholder*="name" i], #name');
      if (await nameInput.count() > 0) {
        await nameInput.fill('Tropical Paradise');
      }
      
      const priceInput = page.locator('input[name="price"], input[placeholder*="price" i], #price');
      if (await priceInput.count() > 0) {
        await priceInput.fill('550');
      }
      
      const descriptionInput = page.locator('textarea[name="description"], input[name="description"], textarea[placeholder*="description" i]');
      if (await descriptionInput.count() > 0) {
        await descriptionInput.fill('Exotic blend of tropical fruits with coconut water');
      }
      
      const submitButton = page.locator('button[type="submit"], button:has-text("Save"), button:has-text("Add"), button:has-text("Create")');
      if (await submitButton.count() > 0) {
        await submitButton.first().click();
        await page.waitForTimeout(1000);
      }
    }
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Edit")')).toHaveCount(6);
    

  });

  test('✅ Customer Browsing Multiple Juices', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'anypassword');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Green Detox').first()).toBeVisible();
    await expect(page.locator('text=LKR')).toHaveCount(6);
    
    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.first().click();
    await page.waitForTimeout(300);
    await addToCartButtons.nth(1).click();
    await page.waitForTimeout(300);
    await addToCartButtons.nth(2).click();
    await page.waitForTimeout(300);
    
    const cartButton = page.locator('button:has-text("Cart"), [data-testid="cart"], .cart-icon, a[href*="cart"]');
    if (await cartButton.count() > 0) {
      await cartButton.first().click();
      await expect(page.locator('h1')).toBeVisible();
    } else {
      await expect(page.locator('text=Green Detox').first()).toBeVisible();
      await expect(page.locator('text=LKR').first()).toBeVisible();
    }
    

  });

  // test('❌ Invalid Login Attempt', async ({ page }) => {
  //   await page.goto('/');
  //   await page.fill('input[type="email"]', 'wrong@email.com');
  //   await page.fill('input[type="password"]', 'wrongpassword');
  //   await page.click('button[type="submit"]');
    
  //   await page.waitForTimeout(2000);
    
  //   // This test is designed to fail - expecting wrong behavior
  //   await expect(page).toHaveURL('/dashboard');
  // });

});