import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Step One
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueBtn = '[data-test="continue"]';
  private readonly cancelBtn = '[data-test="cancel"]';
  private readonly errorMessage = '[data-test="error"]';

  // Step Two (Overview)
  private readonly summaryItem = '[data-test="summary-item"]';
  private readonly itemTotal = '[data-test="subtotal-label"]';
  private readonly taxLabel = '[data-test="tax-label"]';
  private readonly totalLabel = '[data-test="total-label"]';
  private readonly finishBtn = '[data-test="finish"]';

  // Complete
  private readonly completeHeader = '[data-test="complete-header"]';
  private readonly backHomeBtn = '[data-test="back-to-products"]';

  constructor(page: Page) {
    super(page);
  }

  async expectToBeOnCheckoutStepOne(): Promise<void> {
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }

  async expectToBeOnCheckoutStepTwo(): Promise<void> {
    await expect(this.page).toHaveURL('/checkout-step-two.html');
  }

  async expectToBeOnCheckoutComplete(): Promise<void> {
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.page.click(this.continueBtn);
  }

  async clickCancel(): Promise<void> {
    await this.page.click(this.cancelBtn);
  }

  async clickFinish(): Promise<void> {
    await this.page.click(this.finishBtn);
  }

  async getErrorText(): Promise<string> {
    return (await this.page.textContent(this.errorMessage)) ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    return this.page.locator(this.errorMessage).isVisible();
  }

  async getItemTotal(): Promise<string> {
    return (await this.page.textContent(this.itemTotal)) ?? '';
  }

  async getTaxAmount(): Promise<string> {
    return (await this.page.textContent(this.taxLabel)) ?? '';
  }

  async getOrderTotal(): Promise<string> {
    return (await this.page.textContent(this.totalLabel)) ?? '';
  }

  async getCompleteHeaderText(): Promise<string> {
    return (await this.page.textContent(this.completeHeader)) ?? '';
  }

  async clickBackHome(): Promise<void> {
    await this.page.click(this.backHomeBtn);
  }

  async getSummaryItemCount(): Promise<number> {
    return this.page.locator(this.summaryItem).count();
  }
}
