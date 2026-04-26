import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly pageTitle = '[data-test="title"]';
  private readonly productList = '[data-test="inventory-list"]';
  private readonly productItem = '[data-test="inventory-item"]';
  private readonly productName = '[data-test="inventory-item-name"]';
  private readonly productPrice = '[data-test="inventory-item-price"]';
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly burgerMenu = '#react-burger-menu-btn';
  private readonly logoutLink = '#logout_sidebar_link';

  constructor(page: Page) {
    super(page);
  }

  async expectToBeOnProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.page.locator(this.pageTitle)).toHaveText('Products');
  }

  async getProductCount(): Promise<number> {
    return this.page.locator(this.productItem).count();
  }

  async addToCartByName(productName: string): Promise<void> {
    const product = this.page.locator(this.productItem).filter({ hasText: productName });
    await product.locator('button').click();
  }

  async addToCartByTestId(testId: string): Promise<void> {
    await this.page.click(`[data-test="${testId}"]`);
  }

  async removeFromCartByTestId(testId: string): Promise<void> {
    const removeId = testId.replace('add-to-cart', 'remove');
    await this.page.click(`[data-test="${removeId}"]`);
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator(this.cartBadge);
    const isVisible = await badge.isVisible();
    if (!isVisible) return 0;
    return parseInt((await badge.textContent()) ?? '0', 10);
  }

  async sortBy(option: string): Promise<void> {
    await this.page.selectOption(this.sortDropdown, option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator(this.productName).allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator(this.productPrice).allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async clickOnProduct(productName: string): Promise<void> {
    await this.page.click(`[data-test="inventory-item-name"] >> text="${productName}"`);
  }

  async goToCart(): Promise<void> {
    await this.page.click(this.cartLink);
  }

  async logout(): Promise<void> {
    await this.page.click(this.burgerMenu);
    await this.page.click(this.logoutLink);
  }

  async isProductListVisible(): Promise<boolean> {
    return this.page.locator(this.productList).isVisible();
  }
}
