import { authenticatedTest as test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS, CHECKOUT_INFO } from '../../src/data/products';

test.describe('Checkout Flow', () => {

  test.beforeEach(async ({ loginPage, productsPage, cartPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  // ─── Step One: Customer Info ──────────────────────────────────

  test('@smoke Complete checkout step one with valid info', async ({ checkoutPage, page }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');
  });

  test('@regression Missing first name shows error', async ({ checkoutPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.missingFirst;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    expect(await checkoutPage.isErrorVisible()).toBe(true);
    const error = await checkoutPage.getErrorText();
    expect(error).toContain('First Name is required');
  });

  test('@regression Missing last name shows error', async ({ checkoutPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.missingLast;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    expect(await checkoutPage.isErrorVisible()).toBe(true);
    const error = await checkoutPage.getErrorText();
    expect(error).toContain('Last Name is required');
  });

  test('@regression Missing postal code shows error', async ({ checkoutPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.missingZip;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    expect(await checkoutPage.isErrorVisible()).toBe(true);
    const error = await checkoutPage.getErrorText();
    expect(error).toContain('Postal Code is required');
  });

  test('@regression Cancel on step one returns to cart', async ({ checkoutPage, page }) => {
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL('/cart.html');
  });

  // ─── Step Two: Order Overview ─────────────────────────────────

  test('@smoke Step two shows correct item in summary', async ({ checkoutPage, page }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.expectToBeOnCheckoutStepTwo();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toMatchAriaSnapshot(`- text: "1"`);
  });

  test('@regression Order overview displays item total', async ({ checkoutPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    const itemTotal = await checkoutPage.getItemTotal();
    expect(itemTotal).toContain('29.99');
  });

  test('@regression Order overview displays tax', async ({ checkoutPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    const tax = await checkoutPage.getTaxAmount();
    expect(tax).toContain('Tax:');
  });

  test('@regression Order total equals item total plus tax', async ({ checkoutPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    const itemTotalStr = await checkoutPage.getItemTotal();
    const taxStr = await checkoutPage.getTaxAmount();
    const totalStr = await checkoutPage.getOrderTotal();
    const itemTotal = parseFloat(itemTotalStr.replace(/[^0-9.]/g, ''));
    const tax = parseFloat(taxStr.replace(/[^0-9.]/g, ''));
    const total = parseFloat(totalStr.replace(/[^0-9.]/g, ''));
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });

  // ─── Order Complete ───────────────────────────────────────────

  test('@smoke Completing order shows success message', async ({ checkoutPage, page }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.expectToBeOnCheckoutComplete();
    const header = await checkoutPage.getCompleteHeaderText();
    expect(header).toContain('Thank you for your order');
  });

  test('@regression Back to home after order returns to products page', async ({ checkoutPage, page }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.clickBackHome();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('@regression Cart is empty after completing order', async ({ checkoutPage, productsPage }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.clickBackHome();
    const badge = await productsPage.getCartBadgeCount();
    expect(badge).toBe(0);
  });
});
