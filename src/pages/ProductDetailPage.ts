import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  private readonly productName = '[data-test="inventory-item-name"]';
  private readonly productDescription = '[data-test="inventory-item-desc"]';
  private readonly productPrice = '[data-test="inventory-item-price"]';
  private readonly addToCartBtn = '[data-test^="add-to-cart"]';
  private readonly removeBtn = '[data-test^="remove"]';
  private readonly backBtn = '[data-test="back-to-products"]';

  constructor(page: Page) {
    super(page);
  }

  async getProductName(): Promise<string> {
    return (await this.page.textContent(this.productName)) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.page.textContent(this.productPrice)) ?? '';
  }

  async getProductDescription(): Promise<string> {
    return (await this.page.textContent(this.productDescription)) ?? '';
  }

  async addToCart(): Promise<void> {
    await this.page.click(this.addToCartBtn);
  }

  async removeFromCart(): Promise<void> {
    await this.page.click(this.removeBtn);
  }

  async goBack(): Promise<void> {
    await this.page.click(this.backBtn);
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.page.locator(this.addToCartBtn).isVisible();
  }

  async isRemoveButtonVisible(): Promise<boolean> {
    return this.page.locator(this.removeBtn).isVisible();
  }
}
