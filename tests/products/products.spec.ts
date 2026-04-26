import { authenticatedTest as test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS, SORT_OPTIONS } from '../../src/data/products';

test.describe('Products Page', () => {

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ─── Display Tests ────────────────────────────────────────────

  test('@smoke Products page shows 6 products', async ({ productsPage }) => {
    const count = await productsPage.getProductCount();
    expect(count).toBe(6);
  });

  test('@smoke Product list is visible', async ({ productsPage }) => {
    expect(await productsPage.isProductListVisible()).toBe(true);
  });

  test('@regression All product names are visible', async ({ productsPage }) => {
    const names = await productsPage.getProductNames();
    expect(names.length).toBe(6);
    names.forEach(name => expect(name.length).toBeGreaterThan(0));
  });

  test('@regression All product prices are positive numbers', async ({ productsPage }) => {
    const prices = await productsPage.getProductPrices();
    prices.forEach(price => {
      expect(price).toBeGreaterThan(0);
    });
  });

  // ─── Sorting Tests ────────────────────────────────────────────

  test('@regression Sort products A to Z', async ({ productsPage }) => {
    await productsPage.sortBy(SORT_OPTIONS.nameAZ);
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('@regression Sort products Z to A', async ({ productsPage }) => {
    await productsPage.sortBy(SORT_OPTIONS.nameZA);
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('@regression Sort products price low to high', async ({ productsPage }) => {
    await productsPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await productsPage.getProductPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('@regression Sort products price high to low', async ({ productsPage }) => {
    await productsPage.sortBy(SORT_OPTIONS.priceHighLow);
    const prices = await productsPage.getProductPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  // ─── Add to Cart ──────────────────────────────────────────────

  test('@smoke Add one product to cart updates badge', async ({ productsPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    const badge = await productsPage.getCartBadgeCount();
    expect(badge).toBe(1);
  });

  test('@regression Add multiple products updates badge count', async ({ productsPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
    await productsPage.addToCartByTestId(PRODUCTS.boltShirt.dataTestId);
    const badge = await productsPage.getCartBadgeCount();
    expect(badge).toBe(3);
  });

  test('@regression Remove product from cart updates badge', async ({ productsPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.removeFromCartByTestId(PRODUCTS.backpack.dataTestId);
    const badge = await productsPage.getCartBadgeCount();
    expect(badge).toBe(0);
  });

  // ─── Navigation ───────────────────────────────────────────────

  test('@regression Clicking product name navigates to detail page', async ({ productsPage, productDetailPage, page }) => {
    await productsPage.clickOnProduct(PRODUCTS.backpack.name);
    await expect(page).toHaveURL(/inventory-item/);
    const name = await productDetailPage.getProductName();
    expect(name).toBe(PRODUCTS.backpack.name);
  });
});
