const { test, expect } = require('@playwright/test');

test('Scenario 1: locked out user shows error message', async function({ page }) { // inorder to work with promises, async should use
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('locked_out_user');               // here i used fill instead of type because fill clears the field first and it's fast and reliable
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();                              // used data-testId because it never changes due to UI redesign

  const error = page.locator('[data-test="error"]');                         // used to locate element whose attribute data-test has value error
  await expect(error).toBeVisible();                                        // checks that the error element is visible on the screen
  await expect(error).toHaveText('Epic sadface: Sorry, this user has been locked out.');  // verifies that the errpr message text is exactly this sentence
})                                                                                       // also we can use toContainText() for partial match

test('Scenario 2: valid user can log in', async function ({ page }) {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/.*inventory\.html/);                              // This line is to check that user is successfully logged in and redirect to inventory page 
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');   // assertion that checks the page title after login is Products
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible(); //verify that the inventory list(product) is displayed on the page
})