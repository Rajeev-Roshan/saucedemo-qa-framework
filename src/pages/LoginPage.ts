import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly errorCloseButton = '[data-test="error"] button';
  private readonly loginLogo = '.login_logo';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForSelector(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorText(): Promise<string> {
    return (await this.page.textContent(this.errorMessage)) ?? '';
  }

  async closeError(): Promise<void> {
    await this.page.click(this.errorCloseButton);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.page.locator(this.errorMessage).isVisible();
  }

  async isLoginLogoVisible(): Promise<boolean> {
    return this.page.locator(this.loginLogo).isVisible();
  }

  async expectToBeOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.locator(this.loginButton)).toBeVisible();
  }
}
