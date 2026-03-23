const { test, expect } = require('@playwright/test');

test.describe('FirstVerify Login Test', () => {

  // 🔴 Test 1: Invalid Credentials
  test('Login with invalid credentials and show error message', async ({ page }) => {

    // Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Verify login page
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Enter invalid credentials
    await page.getByRole('textbox', { name: 'User ID' }).fill('wronguser@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123');

    // Click login
    await page.getByRole('button', { name: 'Log In' }).click();

    // Validate error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();

    // Wait and take screenshot
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'invalid-login.png', fullPage: true });
  });


  // 🟢 Test 2: Valid Credentials
  test('Login with valid credentials and verify dashboard', async ({ page }) => {

    // Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Verify login page
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Enter valid credentials
    await page.getByRole('textbox', { name: 'User ID' }).fill('fvtestingteam@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');

    // Click login
    await page.getByRole('button', { name: 'Log In' }).click();

    // ✅ Wait for dashboard (fixed)
    await page.waitForURL(/.*dashboard.*/i, { timeout: 15000 });

    // ✅ Validate URL
    await expect(page).toHaveURL(/dashboard/i);

    // Optional: wait for page load
    await page.waitForLoadState('networkidle');

    // Screenshot
    await page.screenshot({ path: 'dashboard.png', fullPage: true });

  });

});