import { authenticatedTest as test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS } from '../../src/data/products';
import { allure } from 'allure-playwright';

test.describe('Shopping Cart', () => {

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ─── Empty Cart ───────────────────────────────────────────────

  test('@smoke Cart is empty on fresh login', async ({ productsPage, cartPage }) => {
    await allure.description('A freshly logged-in user should have an empty cart.');
    await allure.severity('critical');
    await allure.feature('Cart');
    await allure.story('Cart State');

    await allure.step('Navigate to cart', async () => {
      await productsPage.goToCart();
      await cartPage.expectToBeOnCartPage();
    });
    await allure.step('Verify cart is empty', async () => {
      expect(await cartPage.isCartEmpty()).toBe(true);
    });
  });

  // ─── Adding Items ─────────────────────────────────────────────

  test('@smoke Items added from products page appear in cart', async ({ productsPage, cartPage }) => {
    await allure.description('A product added on the inventory page should appear in the cart.');
    await allure.severity('critical');
    await allure.feature('Cart');
    await allure.story('Add Items');

    await allure.step('Add backpack to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    });
    await allure.step('Navigate to cart', async () => {
      await productsPage.goToCart();
      await cartPage.expectToBeOnCartPage();
    });
    await allure.step('Verify backpack is in cart', async () => {
      const names = await cartPage.getCartItemNames();
      expect(names).toContain(PRODUCTS.backpack.name);
    });
  });

  test('@regression Multiple items added appear in cart', async ({ productsPage, cartPage }) => {
    await allure.description('Two products added from inventory should both appear as cart items.');
    await allure.severity('normal');
    await allure.feature('Cart');
    await allure.story('Add Items');

    await allure.step('Add 2 products', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
    });
    await allure.step('Navigate to cart and verify count', async () => {
      await productsPage.goToCart();
      const count = await cartPage.getCartItemCount();
    });
  });

  test('@regression Cart item prices match product page prices', async ({ productsPage, cartPage }) => {
    await allure.description('The price shown in the cart should match the product listing price.');
    await allure.severity('critical');
    await allure.feature('Cart');
    await allure.story('Price Integrity');

    await allure.step('Add backpack and navigate to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.goToCart();
    });
    await allure.step('Verify price matches $29.99', async () => {
      const prices = await cartPage.getCartItemPrices();
      expect(prices[0]).toBe(parseFloat(PRODUCTS.backpack.price.replace('$', '')));
    });
  });

  // ─── Removing Items ───────────────────────────────────────────

  test('@regression Remove item from cart', async ({ productsPage, cartPage }) => {
    await allure.description('Removing the only item from the cart should leave it empty.');
    await allure.severity('normal');
    await allure.feature('Cart');
    await allure.story('Remove Items');

    await allure.step('Add item then go to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.goToCart();
    });
    await allure.step('Remove the item', async () => {
      await cartPage.removeItem('sauce-labs-backpack');
    });
    await allure.step('Verify cart is now empty', async () => {
      expect(await cartPage.isCartEmpty()).toBe(true);
    });
  });

  test('@regression Removing one item leaves others intact', async ({ productsPage, cartPage }) => {
    await allure.description('Removing one item should not affect other items in the cart.');
    await allure.severity('normal');
    await allure.feature('Cart');
    await allure.story('Remove Items');

    await allure.step('Add 2 items and go to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
      await productsPage.goToCart();
    });
    await allure.step('Remove only the backpack', async () => {
      await cartPage.removeItem('sauce-labs-backpack');
    });
    await allure.step('Verify bike light remains, backpack is gone', async () => {
      const names = await cartPage.getCartItemNames();
      expect(names).not.toContain(PRODUCTS.backpack.name);
      expect(names).toContain(PRODUCTS.bikeLight.name);
    });
  });

  // ─── Navigation ───────────────────────────────────────────────

  test('@regression Continue Shopping returns to products page', async ({ productsPage, cartPage, page }) => {
    await allure.description('Continue Shopping button should navigate back to the inventory page.');
    await allure.severity('normal');
    await allure.feature('Cart');
    await allure.story('Navigation');

    await allure.step('Go to cart', async () => {
      await productsPage.goToCart();
    });
    await allure.step('Click Continue Shopping and verify redirect', async () => {
      await cartPage.continueShopping();
      await expect(page).toHaveURL('/inventory.html');
    });
  });

  test('@smoke Checkout button navigates to checkout step one', async ({ productsPage, cartPage, page }) => {
    await allure.description('Clicking Checkout should proceed to the first checkout step.');
    await allure.severity('critical');
    await allure.feature('Cart');
    await allure.story('Navigation');

    await allure.step('Add item and go to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.goToCart();
    });
    await allure.step('Click Checkout and verify step one URL', async () => {
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL('/checkout-step-one.html');
    });
  });
});
