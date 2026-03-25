const { test, expect } = require('@playwright/test');

test.describe('Vendor - Full Client Flow', () => {

  test('Login → Find Client → Select Green Plains → Start Prequalification', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Login
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await page.getByRole('textbox', { name: 'User ID' }).fill('saipriyan@ahaapps.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing#123');
    await page.getByRole('button', { name: 'Log In' }).click();

    // Step 3: Wait for dashboard
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/dashboard/i)).toBeVisible({ timeout: 20000 });

    // Step 4: Click "Find clients manually"
    let findBtn = page.getByRole('button', { name: /Find clients manually/i });

    if (await findBtn.count() === 0) {
      findBtn = page.locator('text=Find clients manually');
    }

    await findBtn.first().click();

    // Step 5: Select "Green Plains Inc."
    await page.waitForLoadState('networkidle');

    let greenPlains = page.getByRole('radio', { name: /Green Plains Inc./i });

    if (await greenPlains.count() === 0) {
      greenPlains = page.locator('label:has-text("Green Plains Inc.")');
      await greenPlains.click();
    } else {
      await greenPlains.first().check();
    }

    // Step 6: Click Continue
    let continueBtn = page.getByRole('button', { name: /Continue/i });

    if (await continueBtn.count() === 0) {
      continueBtn = page.locator('button:has-text("Continue")');
    }

    await continueBtn.first().click();

    // Step 7: Wait for Prequalification Questionnaire page
    await expect(
    page.getByRole('heading', { name: 'Prequalification Questionnaire' })
    ).toBeVisible({ timeout: 20000 });

    // Step 8: Select "Green Plains - Safety"
    let safetyRadio = page.getByRole('radio', { name: /Green Plains - Safety/i });

    if (await safetyRadio.count() === 0) {
      safetyRadio = page.locator('label:has-text("Green Plains - Safety")');
      await safetyRadio.waitFor({ state: 'visible', timeout: 20000 });
      await safetyRadio.click();
    } else {
      await safetyRadio.first().check();
    }

    // Wait for button enable
    await page.waitForTimeout(1000);

    // Step 9: Click "Start Prequalification"
    let startBtn = page.getByRole('button', { name: /Start Prequalification/i });

    if (await startBtn.count() === 0) {
      startBtn = page.locator('button:has-text("START PREQUALIFICATION")');
    }

    const button = startBtn.first();

    await button.scrollIntoViewIfNeeded();
    await expect(button).toBeEnabled({ timeout: 20000 });

    await button.click();

    // ✅ FINAL CHANGE: Wait 3 seconds before screenshot
    await page.waitForTimeout(3000);

    // Screenshot
    await page.screenshot({ path: 'final-prequalification.png', fullPage: true });

  });

});