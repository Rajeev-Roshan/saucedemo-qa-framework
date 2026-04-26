import { test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS, CHECKOUT_INFO } from '../../src/data/products';

test.describe('End-to-End Purchase Flows', () => {

  test('@smoke @e2e Complete purchase of single item', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');

    // Step 2: Add item
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    expect(await productsPage.getCartBadgeCount()).toBe(1);

    // Step 3: Go to cart
    await productsPage.goToCart();
    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames).toContain(PRODUCTS.backpack.name);

    // Step 4: Checkout info
    await cartPage.proceedToCheckout();
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.expectToBeOnCheckoutStepTwo();

    // Step 5: Finish order
    await checkoutPage.clickFinish();
    await checkoutPage.expectToBeOnCheckoutComplete();
    const header = await checkoutPage.getCompleteHeaderText();
    expect(header).toContain('Thank you for your order');
  });

  test('@smoke @e2e Complete purchase of multiple items', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
    await productsPage.addToCartByTestId(PRODUCTS.fleeceJacket.dataTestId);
    expect(await productsPage.getCartBadgeCount()).toBe(3);

    await productsPage.goToCart();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toMatchAriaSnapshot(`- text: "3"`);
    ;

    await cartPage.proceedToCheckout();
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    const itemTotal = await checkoutPage.getItemTotal();
    // $29.99 + $9.99 + $49.99 = $89.97
    expect(itemTotal).toContain('89.97');

    await checkoutPage.clickFinish();
    await checkoutPage.expectToBeOnCheckoutComplete();
  });

  test('@e2e User can logout after purchase', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.clickBackHome();
    await productsPage.logout();
    await expect(page).toHaveURL('/');
  });

  test('@e2e Sorting by price high to low before adding to cart', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    // Sort and verify order
    await productsPage.sortBy('hilo');
    const prices = await productsPage.getProductPrices();
    expect(prices[0]).toBeGreaterThanOrEqual(prices[1]);

    // Add most expensive item and complete purchase
    await productsPage.addToCartByTestId(PRODUCTS.fleeceJacket.dataTestId);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.expectToBeOnCheckoutComplete();
  });
});
