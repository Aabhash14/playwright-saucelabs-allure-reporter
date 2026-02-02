const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async expectLockedOutMessage() {
    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  }
}

module.exports = { LoginPage };
