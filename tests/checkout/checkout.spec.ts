import { authenticatedTest as test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS, CHECKOUT_INFO } from '../../src/data/products';
import { allure } from 'allure-playwright';

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
    await allure.description('Filling in valid customer info should advance to the order overview page.');
    await allure.severity('blocker');
    await allure.feature('Checkout');
    await allure.story('Customer Info');

    await allure.step('Fill in valid customer details', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    });
    await allure.step('Click Continue and verify step two URL', async () => {
      await checkoutPage.clickContinue();
      await expect(page).toHaveURL('/checkout-step-two.html');
    });
  });

  test('@regression Missing first name shows error', async ({ checkoutPage }) => {
    await allure.description('Submitting checkout without a first name should show a validation error.');
    await allure.severity('normal');
    await allure.feature('Checkout');
    await allure.story('Form Validation');

    await allure.step('Submit form without first name', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.missingFirst;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });
    await allure.step('Verify first name required error', async () => {
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      const error = await checkoutPage.getErrorText();
      expect(error).toContain('First Name is required');
    });
  });

  test('@regression Missing last name shows error', async ({ checkoutPage }) => {
    await allure.description('Submitting checkout without a last name should show a validation error.');
    await allure.severity('normal');
    await allure.feature('Checkout');
    await allure.story('Form Validation');

    await allure.step('Submit form without last name', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.missingLast;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });
    await allure.step('Verify last name required error', async () => {
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      const error = await checkoutPage.getErrorText();
      expect(error).toContain('Last Name is required');
    });
  });

  test('@regression Missing postal code shows error', async ({ checkoutPage }) => {
    await allure.description('Submitting checkout without a postal code should show a validation error.');
    await allure.severity('normal');
    await allure.feature('Checkout');
    await allure.story('Form Validation');

    await allure.step('Submit form without postal code', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.missingZip;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });
    await allure.step('Verify postal code required error', async () => {
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      const error = await checkoutPage.getErrorText();
      expect(error).toContain('Postal Code is required');
    });
  });

  test('@regression Cancel on step one returns to cart', async ({ checkoutPage, page }) => {
    await allure.description('Cancelling on step one should navigate back to the cart.');
    await allure.severity('minor');
    await allure.feature('Checkout');
    await allure.story('Navigation');

    await allure.step('Click Cancel and verify cart URL', async () => {
      await checkoutPage.clickCancel();
      await expect(page).toHaveURL('/cart.html');
    });
  });

  // ─── Step Two: Order Overview ─────────────────────────────────

  test('@smoke Step two shows correct item in summary', async ({ checkoutPage, page }) => {
    await allure.description('The order overview should show the cart badge still reads 1 item.');
    await allure.severity('critical');
    await allure.feature('Checkout');
    await allure.story('Order Overview');

    await allure.step('Complete step one', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.expectToBeOnCheckoutStepTwo();
    });
    await allure.step('Verify cart badge still shows 1', async () => {
      await expect(page.locator('[data-test="shopping-cart-link"]')).toMatchAriaSnapshot(`- text: "1"`);
    });
  });

  test('@regression Order overview displays item total', async ({ checkoutPage }) => {
    await allure.description('Item subtotal on overview should reflect the backpack price of $29.99.');
    await allure.severity('critical');
    await allure.feature('Checkout');
    await allure.story('Order Overview');

    await allure.step('Advance to step two', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });
    await allure.step('Verify item total contains 29.99', async () => {
      const itemTotal = await checkoutPage.getItemTotal();
      expect(itemTotal).toContain('29.99');
    });
  });

  test('@regression Order overview displays tax', async ({ checkoutPage }) => {
    await allure.description('The tax line should be present on the order overview page.');
    await allure.severity('normal');
    await allure.feature('Checkout');
    await allure.story('Order Overview');

    await allure.step('Advance to step two', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });
    await allure.step('Verify tax label is present', async () => {
      const tax = await checkoutPage.getTaxAmount();
      expect(tax).toContain('Tax:');
    });
  });

  test('@regression Order total equals item total plus tax', async ({ checkoutPage }) => {
    await allure.description('The order total must be the mathematically correct sum of subtotal + tax.');
    await allure.severity('critical');
    await allure.feature('Checkout');
    await allure.story('Price Calculation');

    await allure.step('Advance to step two', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
    });
    await allure.step('Parse and validate total = subtotal + tax', async () => {
      const itemTotalStr = await checkoutPage.getItemTotal();
      const taxStr = await checkoutPage.getTaxAmount();
      const totalStr = await checkoutPage.getOrderTotal();
      const itemTotal = parseFloat(itemTotalStr.replace(/[^0-9.]/g, ''));
      const tax = parseFloat(taxStr.replace(/[^0-9.]/g, ''));
      const total = parseFloat(totalStr.replace(/[^0-9.]/g, ''));
      expect(total).toBeCloseTo(itemTotal + tax, 2);
    });
  });

  // ─── Order Complete ───────────────────────────────────────────

  test('@smoke Completing order shows success message', async ({ checkoutPage, page }) => {
    await allure.description('Finishing an order should display a thank-you confirmation message.');
    await allure.severity('blocker');
    await allure.feature('Checkout');
    await allure.story('Order Completion');

    await allure.step('Complete checkout flow', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.clickFinish();
    });
    await allure.step('Verify thank-you message on complete page', async () => {
      await checkoutPage.expectToBeOnCheckoutComplete();
      const header = await checkoutPage.getCompleteHeaderText();
      expect(header).toContain('Thank you for your order');
    });
  });

  test('@regression Back to home after order returns to products page', async ({ checkoutPage, page }) => {
    await allure.description('Back Home button on the confirmation page should return to inventory.');
    await allure.severity('normal');
    await allure.feature('Checkout');
    await allure.story('Order Completion');

    await allure.step('Complete and finish order', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.clickFinish();
    });
    await allure.step('Click Back Home and verify inventory URL', async () => {
      await checkoutPage.clickBackHome();
      await expect(page).toHaveURL('/inventory.html');
    });
  });

  test('@regression Cart is empty after completing order', async ({ checkoutPage, productsPage }) => {
    await allure.description('After completing an order the cart badge should be cleared.');
    await allure.severity('normal');
    await allure.feature('Checkout');
    await allure.story('Order Completion');

    await allure.step('Complete full order and return home', async () => {
      const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
      await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutPage.clickContinue();
      await checkoutPage.clickFinish();
      await checkoutPage.clickBackHome();
    });
    await allure.step('Verify cart badge is gone', async () => {
      const badge = await productsPage.getCartBadgeCount();
      expect(badge).toBe(0);
    });
  });
});
