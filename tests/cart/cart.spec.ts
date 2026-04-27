import { authenticatedTest as test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS } from '../../src/data/products';

test.describe('Shopping Cart', () => {

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ─── Empty Cart ───────────────────────────────────────────────

  test('@smoke Cart is empty on fresh login', async ({ productsPage, cartPage }) => {
    await productsPage.goToCart();
    await cartPage.expectToBeOnCartPage();
    expect(await cartPage.isCartEmpty()).toBe(true);
  });

  // ─── Adding Items ─────────────────────────────────────────────

  test('@smoke Items added from products page appear in cart', async ({ productsPage, cartPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.goToCart();
    await cartPage.expectToBeOnCartPage();
    const names = await cartPage.getCartItemNames();
    expect(names).toContain(PRODUCTS.backpack.name);
  });

  test('@regression Multiple items added appear in cart', async ({ productsPage, cartPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
    await productsPage.goToCart();
    const count = await cartPage.getCartItemCount();
  });

  test('@regression Cart item prices match product page prices', async ({ productsPage, cartPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.goToCart();
    const prices = await cartPage.getCartItemPrices();
    expect(prices[0]).toBe(parseFloat(PRODUCTS.backpack.price.replace('$', '')));
  });

  // ─── Removing Items ───────────────────────────────────────────

  test('@regression Remove item from cart', async ({ productsPage, cartPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.goToCart();
    await cartPage.removeItem('sauce-labs-backpack');
    expect(await cartPage.isCartEmpty()).toBe(true);
  });

  test('@regression Removing one item leaves others intact', async ({ productsPage, cartPage }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
    await productsPage.goToCart();
    await cartPage.removeItem('sauce-labs-backpack');
    const names = await cartPage.getCartItemNames();
    expect(names).not.toContain(PRODUCTS.backpack.name);
    expect(names).toContain(PRODUCTS.bikeLight.name);
  });

  // ─── Navigation ───────────────────────────────────────────────

  test('@regression Continue Shopping returns to products page', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('@smoke Checkout button navigates to checkout step one', async ({ productsPage, cartPage, page }) => {
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });
});
