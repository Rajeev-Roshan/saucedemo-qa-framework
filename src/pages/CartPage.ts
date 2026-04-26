import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly pageTitle = '[data-test="title"]';
  private readonly cartItem = '[data-test="cart-item"]';
  private readonly cartItemName = '[data-test="inventory-item-name"]';
  private readonly cartItemPrice = '[data-test="inventory-item-price"]';
  private readonly cartItemQty = '[data-test="item-quantity"]';
  private readonly removeButton = (name: string) =>
    `[data-test="remove-${name.toLowerCase().replace(/ /g, '-')}"]`;
  private readonly continueShoppingBtn = '[data-test="continue-shopping"]';
  private readonly checkoutBtn = '[data-test="checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async expectToBeOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL('/cart.html');
    await expect(this.page.locator(this.pageTitle)).toHaveText('Your Cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.page.locator(this.cartItem).count();
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(this.cartItemName).allTextContents();
  }

  async getCartItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator(this.cartItemPrice).allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async removeItem(productName: string): Promise<void> {
    const removeBtnSelector = productName.toLowerCase().replace(/ /g, '-');
    await this.page.click(`[data-test="remove-${removeBtnSelector}"]`);
  }

  async continueShopping(): Promise<void> {
    await this.page.click(this.continueShoppingBtn);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(this.checkoutBtn);
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.page.locator(this.cartItem).count();
    return count === 0;
  }
}
