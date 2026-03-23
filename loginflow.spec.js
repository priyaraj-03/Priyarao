const { test, expect } = require('@playwright/test');

test.describe('FirstVerify Login Test', () => {

  test('Login and display invalid credentials message', async ({ page }) => {

    // Step 1: Open application
    await page.goto('https://fvpq2test.firstverify.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Verify login page loaded
    await expect(page.getByRole('textbox', { name: 'User ID' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // Step 3: Enter INVALID credentials
    await page.getByRole('textbox', { name: 'User ID' }).fill('wronguser@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123');

    // Step 4: Click Login
    await page.getByRole('button', { name: 'Log In' }).click();

    // Step 5: Validate error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();

    // Step 6: Take screenshot after error appears
    await page.screenshot({ path: 'invalid-login.png', fullPage: true });

  });

});

