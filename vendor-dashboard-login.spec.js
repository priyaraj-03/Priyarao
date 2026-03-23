const { test, expect } = require('@playwright/test');

test.describe('FirstVerify Vendor Login Test', () => {

  test('Login and verify Vendor Dashboard', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Verify login page
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Step 3: Enter credentials
    await page.getByRole('textbox', { name: 'User ID' }).fill('saipriyan@ahaapps.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');

    // Step 4: Click Login
    await page.getByRole('button', { name: 'Log In' }).click();

    // ✅ Step 5: Verify Dashboard using UI (BEST PRACTICE)
    await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 15000 });

    // Optional: wait for full load
    await page.waitForLoadState('networkidle');

    // Step 6: Screenshot
    await page.screenshot({ path: 'vendor-dashboard.png', fullPage: true });

  });

});
