import { test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS, CHECKOUT_INFO } from '../../src/data/products';
import { allure } from 'allure-playwright';

test.describe('End-to-End Purchase Flows', () => {

  test('@smoke @e2e Complete purchase of single item', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await allure.description('Full happy-path journey: login → add item → checkout → confirm order.');
    await allure.severity('blocker');
    await allure.feature('Purchase Flow');
    await allure.story('Single Item Purchase');

    await allure.step('Login as standard user', async () => {
      await loginPage.goto();
      await loginPage.login(USERS.standard.username, USERS.standard.password);
      await expect(page).toHaveURL('/inventory.html');
    });
    await allure.step('Add backpack to cart and verify badge', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      expect(await productsPage.getCartBadgeCount()).toBe(1);
    });
    await allure.step('Verify item appears in cart', async () => {
      await productsPage.goToCart();
      const cartNames = await cartPage.getCartItemNames();
      expect(cartNames).toContain(PRODUCTS.backpack.name);
    });
    await allure.step('Complete checkout info and advance to overview', async () => {
      await cartPage.proceedToCheckout();
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.expectToBeOnCheckoutStepTwo();
    });
    await allure.step('Finish order and verify confirmation', async () => {
      await checkoutPage.clickFinish();
      await checkoutPage.expectToBeOnCheckoutComplete();
      const header = await checkoutPage.getCompleteHeaderText();
      expect(header).toContain('Thank you for your order');
    });
  });

  test('@smoke @e2e Complete purchase of multiple items', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await allure.description('Purchase flow with 3 items — verifies badge count, cart count, and subtotal calculation.');
    await allure.severity('blocker');
    await allure.feature('Purchase Flow');
    await allure.story('Multi-Item Purchase');

    await allure.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login(USERS.standard.username, USERS.standard.password);
    });
    await allure.step('Add 3 items and verify badge shows 3', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
      await productsPage.addToCartByTestId(PRODUCTS.fleeceJacket.dataTestId);
      expect(await productsPage.getCartBadgeCount()).toBe(3);
    });
    await allure.step('Go to cart and verify cart badge aria snapshot', async () => {
      await productsPage.goToCart();
      await expect(page.locator('[data-test="shopping-cart-link"]')).toMatchAriaSnapshot(`- text: "3"`);
    });
    await allure.step('Complete checkout and verify subtotal is $89.97', async () => {
      await cartPage.proceedToCheckout();
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      const itemTotal = await checkoutPage.getItemTotal();
      // $29.99 + $9.99 + $49.99 = $89.97
      expect(itemTotal).toContain('89.97');
    });
    await allure.step('Finish order and verify confirmation', async () => {
      await checkoutPage.clickFinish();
      await checkoutPage.expectToBeOnCheckoutComplete();
    });
  });

  test('@e2e User can logout after purchase', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await allure.description('After completing an order the user should be able to log out successfully.');
    await allure.severity('normal');
    await allure.feature('Purchase Flow');
    await allure.story('Post-Purchase Actions');

    await allure.step('Login and complete full purchase', async () => {
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
    });
    await allure.step('Logout and verify redirect to login page', async () => {
      await productsPage.logout();
      await expect(page).toHaveURL('/');
    });
  });

  test('@e2e Sorting by price high to low before adding to cart', async ({
    loginPage, productsPage, cartPage, checkoutPage, page,
  }) => {
    await allure.description('User sorts by price high-to-low, adds the most expensive item, then completes purchase.');
    await allure.severity('normal');
    await allure.feature('Purchase Flow');
    await allure.story('Sort then Purchase');

    await allure.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login(USERS.standard.username, USERS.standard.password);
    });
    await allure.step('Sort by price high to low and verify order', async () => {
      await productsPage.sortBy('hilo');
      const prices = await productsPage.getProductPrices();
      expect(prices[0]).toBeGreaterThanOrEqual(prices[1]);
    });
    await allure.step('Add top-priced item and complete purchase', async () => {
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
});
