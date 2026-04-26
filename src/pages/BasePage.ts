import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getErrorMessage(): Promise<string> {
    const error = this.page.locator('[data-test="error"]');
    return error.textContent() ?? '';
  }

  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
