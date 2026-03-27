import { test, expect } from '@playwright/test';

test('Add Employee → Save → Employees → Screenshot', async ({ page, context }) => {

  // BLOCK PDF
  context.on('page', async (newPage) => {
    if (newPage.url().includes('.pdf')) {
      await newPage.close();
    }
  });

  // LOGIN
  await page.goto('https://fvpq2test.firstverify.com/');
  await page.getByRole('textbox', { name: /user id/i }).fill('saipriyan@ahaapps.com');
  await page.getByRole('textbox', { name: /password/i }).fill('Testing#123');
  await page.getByRole('button', { name: /log in/i }).click();

  const trainingIcon = page.locator('[title*="Training"], [aria-label*="Training"]').first();

  // NAVIGATE → ADD EMPLOYEES
  await trainingIcon.click({ force: true });
  await page.getByText('Add Employees', { exact: true }).click();

  await page.waitForTimeout(3000);

  // TEST DATA
  const timestamp = Date.now();
  const employee = {
    firstName: `Test${timestamp}`,
    lastName: `User${timestamp}`,
    title: 'QA',
    idLast4: `${Math.floor(1000 + Math.random() * 9000)}`,
    username: `user${timestamp}`
  };

  // FILL FORM
  await page.getByPlaceholder('First Name').fill(employee.firstName);
  await page.getByPlaceholder('Last Name').fill(employee.lastName);
  await page.getByPlaceholder('Title').fill(employee.title);
  await page.getByPlaceholder('Last 4 Digits of ID').fill(employee.idLast4);

  await page.getByRole('radio', { name: 'Custom Username' }).check();
  await page.getByPlaceholder('Custom Username').fill(employee.username);

  await page.waitForTimeout(1000);

  // ADD EMPLOYEE
  const addBtn = page.getByRole('button', { name: /add employee to list/i });
  await expect(addBtn).toBeEnabled();
  await addBtn.click();

  await page.waitForTimeout(3000);

  // SAVE
  await page.getByRole('button', { name: /save/i }).click();

  // ======================
  // NAVIGATE TO EMPLOYEES (FINAL FIX)
  // ======================
  await page.waitForTimeout(3000);

  await trainingIcon.click({ force: true });

  await page.waitForTimeout(2000);

  const employeesLink = page.locator('text=Employees').first();

  await expect(employeesLink).toBeVisible({ timeout: 10000 });

  await employeesLink.click({ force: true });

  await page.waitForLoadState('networkidle');

  // ======================
  // WAIT FOR TABLE DATA
  // ======================
  await page.waitForSelector('table tbody tr', { timeout: 15000 });

  // ======================
  // HIGHLIGHT TAB
  // ======================
  const employeesTab = page.locator('text=Employees').first();

  await employeesTab.evaluate(el => {
    el.style.borderBottom = '4px solid green';
  });

  // WAIT + SCREENSHOT
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: 'employees-final.png',
    fullPage: true
  });

});