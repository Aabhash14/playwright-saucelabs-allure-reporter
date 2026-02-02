const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { InventoryPage } = require('./pages/inventory.page');

const cases = [
  { user: 'standard_user', shouldPass: true },
  { user: 'problem_user', shouldPass: true },
  { user: 'performance_glitch_user', shouldPass: true },
  { user: 'error_user', shouldPass: true },
  { user: 'visual_user', shouldPass: true },
  { user: 'locked_out_user', shouldPass: false },
];

async function loginAndCheck(page, user, shouldPass) {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const error = page.locator('[data-test="error"]');

  await login.open();
  await login.login(user, 'secret_sauce');

  if (shouldPass) {
    await inventory.expectLoaded();
    return;
  }

  await login.expectLockedOutMessage();
  await expect(error).toContainText('Epic sadface');
}

for (const { user, shouldPass } of cases) {
  test(`${user} login result`, async ({ page }) => {
    await loginAndCheck(page, user, shouldPass);
  });
}
