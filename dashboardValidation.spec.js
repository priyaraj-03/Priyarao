const { test, expect } = require('@playwright/test');

test.describe('Dashboard Navigation Test', () => {

  test('Login → Dashboard → Settings → Companies', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/');

    // Step 2: Verify login page fields
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Step 3: Enter credentials
    await page.getByRole('textbox', { name: 'User ID' }).fill('fvtestingteam@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');

    // Step 4: Click Login
    await page.getByRole('button', { name: 'Log In' }).click();

    // Step 5: Wait for Dashboard
    await page.waitForURL('**/DashBoard', { timeout: 20000 });
    await page.waitForLoadState('networkidle');

    // Step 6: Click Settings
    await page.getByRole('button', { name: 'Settings', exact: true }).click();

    // Step 7: Click Companies
    await page.getByRole('link', { name: 'Companies' }).click();

    // Step 8: Wait for Companies page to load
    await page.waitForLoadState('networkidle');

    // Click Settings
    await page.getByRole('button', { name: 'Settings', exact: true }).click();

    // Click Companies
    await page.getByRole('link', { name: 'Companies' }).click();

    // Wait for Companies page
    await page.waitForSelector('text=Companies', { timeout: 20000 });

    // Verify page
    await expect(page.getByText('Companies').first()).toBeVisible();

    // Screenshot
    await page.screenshot({ path: 'companies-page.png', fullPage: true });

    // Keep page visible
    await page.waitForTimeout(5000);

  });

});