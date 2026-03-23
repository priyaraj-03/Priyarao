const { test, expect } = require('@playwright/test');

test.describe('Companies Search Test', () => {

  test('Login → Dashboard → Settings → Companies → Search Company', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/');

    // Step 2: Verify login page
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

    // Step 8: Wait for search textbox
    const searchBox = page.getByPlaceholder('Search');
    await searchBox.waitFor({ state: 'visible', timeout: 20000 });

    // Step 9: Search company
    await searchBox.fill('Test by Aha apps');

    // Step 10: Wait for search results
    await page.waitForTimeout(3000);

    // Step 11: Verify result
    await expect(page.getByText('Test by Aha apps')).toBeVisible();

    // Step 12: Screenshot
    await page.screenshot({ path: 'companies-search-result.png', fullPage: true });

    // Step 13: Pause for visibility
    await page.waitForTimeout(5000);

  });

});