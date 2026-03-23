const { test, expect } = require('@playwright/test');

test.describe('FirstVerify Login Test', () => {

  test('Login and verify Admin Dashboard', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Verify login page loaded
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Step 3: Enter credentials
    await page.getByRole('textbox', { name: 'User ID' }).fill('fvtestingteam@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');

    // Step 4: Click Login
    await page.getByRole('button', { name: 'Log In' }).click();

    // Step 5: Wait for Dashboard navigation
    await page.waitForURL('**/DashBoard', { timeout: 10000 });

    // Step 6: Validate Dashboard URL
    await expect(page).toHaveURL(/DashBoard/);

    // Step 7: Wait until page fully loads
    await page.waitForLoadState('networkidle');

    // Step 8: Take screenshot for test proof
    await page.screenshot({ path: 'dashboard.png', fullPage: true });

  });

});