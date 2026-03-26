const { test, expect } = require('@playwright/test');

test.describe('Vendor Renew Prequalification Flow', () => {

  test('Login → Renew → Select Client → Continue', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Login
    await page.getByRole('textbox', { name: 'User ID' }).fill('saipriyan@ahaapps.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');
    await page.getByRole('button', { name: 'Log In' }).click();

    // Step 3: Verify Dashboard
    await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Step 4: Click "Renew Prequalification"
    const renewButton = page.getByRole('button', { name: 'Renew Prequalification' });
    await expect(renewButton).toBeVisible();
    await renewButton.scrollIntoViewIfNeeded();
    await renewButton.click();

    // Step 5: Wait for Renew page
    await expect(page.locator('text=Renew expired client(s)')).toBeVisible({ timeout: 15000 });

    // ✅ Step 6: Select "Adkins Energy LLC"
    const adkinsRadio = page.getByLabel('Adkins Energy LLC');
    await expect(adkinsRadio).toBeVisible();
    await adkinsRadio.check();

    // ✅ Step 7: Click Continue
    const continueBtn = page.getByRole('button', { name: 'Continue' });
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Optional wait + screenshot
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'after-continue.png', fullPage: true });

  });

});