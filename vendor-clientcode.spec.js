const { test, expect } = require('@playwright/test');

test.describe('Vendor Dashboard - Enter Client Code', () => {

  test('Full flow with client code and prequalification', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Verify login page
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Step 3: Login
    await page.getByRole('textbox', { name: 'User ID' }).fill('saipriyan@ahaapps.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');
    await page.getByRole('button', { name: 'Log In' }).click();

    // ✅ Wait for navigation properly
    await page.waitForLoadState('networkidle');

    // Step 5: Verify Dashboard
    await expect(page.getByText(/dashboard/i)).toBeVisible({ timeout: 20000 });

    // Step 6: Click Enter Client Code
    await page.getByRole('button', { name: /Enter Client Code/i }).click();

    const clientCodeBox = page.locator('input').first();
    await expect(clientCodeBox).toBeVisible();

    // ❌ Invalid case
    await clientCodeBox.fill('TESTCODE123');
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText(/invalid/i)).toBeVisible();

    await page.screenshot({ path: 'invalid-client-code.png', fullPage: true });

    // ✅ Valid case
    await clientCodeBox.fill('');
    await clientCodeBox.fill('Tq9bZtPI');
    await page.getByRole('button', { name: /Continue/i }).click();

    // ✅ Wait for next page properly
    await page.waitForLoadState('networkidle');

    // Wait for Prequalification page
    await expect(page.getByText(/prequalification/i)).toBeVisible({ timeout: 20000 });

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'after-valid-client-code.png', fullPage: true });

    // ================= STEP 14 =================
    const radioOption = page.getByText(/Guardian Family/i).first();

    await expect(radioOption).toBeVisible({ timeout: 20000 });
    await radioOption.click();

    // ✅ Wait for UI update after selection
    await page.waitForTimeout(2000);

    // ================= STEP 15 FINAL FIX =================

    // ✅ Use robust locator strategy
    let startButton = page.getByRole('button', { name: /Start Prequalification/i });

    // 🔁 Fallbacks if not found
    if (await startButton.count() === 0) {
      startButton = page.locator('button:has-text("Start")');
    }

    // ❗ Wait until element is attached first (fixes "not found" issue)
    await startButton.first().waitFor({ state: 'attached', timeout: 20000 });

    // Scroll into view (important)
    await startButton.first().scrollIntoViewIfNeeded();

    // Wait until visible
    await expect(startButton.first()).toBeVisible({ timeout: 20000 });

    // Wait until enabled
    await expect(startButton.first()).toBeEnabled({ timeout: 20000 });

    // Click safely
    await startButton.first().click();

    // Final wait + screenshot
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'prequalification-start.png', fullPage: true });

  });

});