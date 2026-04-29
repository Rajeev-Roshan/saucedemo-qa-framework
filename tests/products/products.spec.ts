import { authenticatedTest as test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';
import { PRODUCTS, SORT_OPTIONS } from '../../src/data/products';
import { allure } from 'allure-playwright';

test.describe('Products Page', () => {

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ─── Display Tests ────────────────────────────────────────────

  test('@smoke Products page shows 6 products', async ({ productsPage }) => {
    await allure.description('The inventory page must display exactly 6 products.');
    await allure.severity('critical');
    await allure.feature('Products');
    await allure.story('Product Listing');

    await allure.step('Count visible products and assert 6', async () => {
      const count = await productsPage.getProductCount();
      expect(count).toBe(6);
    });
  });

  test('@smoke Product list is visible', async ({ productsPage }) => {
    await allure.description('The product inventory list container should be visible on page load.');
    await allure.severity('critical');
    await allure.feature('Products');
    await allure.story('Product Listing');

    await allure.step('Assert inventory list is visible', async () => {
      expect(await productsPage.isProductListVisible()).toBe(true);
    });
  });

  test('@regression All product names are visible', async ({ productsPage }) => {
    await allure.description('Every product must have a non-empty display name.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Product Listing');

    await allure.step('Fetch all product names and validate', async () => {
      const names = await productsPage.getProductNames();
      expect(names.length).toBe(6);
      names.forEach(name => expect(name.length).toBeGreaterThan(0));
    });
  });

  test('@regression All product prices are positive numbers', async ({ productsPage }) => {
    await allure.description('Every product price must be a positive numeric value.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Product Listing');

    await allure.step('Fetch and validate all prices are greater than 0', async () => {
      const prices = await productsPage.getProductPrices();
      prices.forEach(price => {
        expect(price).toBeGreaterThan(0);
      });
    });
  });

  // ─── Sorting Tests ────────────────────────────────────────────

  test('@regression Sort products A to Z', async ({ productsPage }) => {
    await allure.description('Selecting A-Z sort should reorder products alphabetically ascending.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Sorting');

    await allure.step('Apply A-Z sort', async () => {
      await productsPage.sortBy(SORT_OPTIONS.nameAZ);
    });
    await allure.step('Verify alphabetical ascending order', async () => {
      const names = await productsPage.getProductNames();
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
    });
  });

  test('@regression Sort products Z to A', async ({ productsPage }) => {
    await allure.description('Selecting Z-A sort should reorder products alphabetically descending.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Sorting');

    await allure.step('Apply Z-A sort', async () => {
      await productsPage.sortBy(SORT_OPTIONS.nameZA);
    });
    await allure.step('Verify alphabetical descending order', async () => {
      const names = await productsPage.getProductNames();
      const sorted = [...names].sort().reverse();
      expect(names).toEqual(sorted);
    });
  });

  test('@regression Sort products price low to high', async ({ productsPage }) => {
    await allure.description('Price low-to-high sort should order products by ascending price.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Sorting');

    await allure.step('Apply price low-to-high sort', async () => {
      await productsPage.sortBy(SORT_OPTIONS.priceLowHigh);
    });
    await allure.step('Verify each price is <= the next', async () => {
      const prices = await productsPage.getProductPrices();
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
    });
  });

  test('@regression Sort products price high to low', async ({ productsPage }) => {
    await allure.description('Price high-to-low sort should order products by descending price.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Sorting');

    await allure.step('Apply price high-to-low sort', async () => {
      await productsPage.sortBy(SORT_OPTIONS.priceHighLow);
    });
    await allure.step('Verify each price is >= the next', async () => {
      const prices = await productsPage.getProductPrices();
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
      }
    });
  });

  // ─── Add to Cart ──────────────────────────────────────────────

  test('@smoke Add one product to cart updates badge', async ({ productsPage }) => {
    await allure.description('Adding a product should increment the cart badge counter to 1.');
    await allure.severity('critical');
    await allure.feature('Products');
    await allure.story('Add to Cart');

    await allure.step('Add backpack to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    });
    await allure.step('Verify cart badge shows 1', async () => {
      const badge = await productsPage.getCartBadgeCount();
      expect(badge).toBe(1);
    });
  });

  test('@regression Add multiple products updates badge count', async ({ productsPage }) => {
    await allure.description('Adding 3 products should show a badge count of 3.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Add to Cart');

    await allure.step('Add 3 products to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
      await productsPage.addToCartByTestId(PRODUCTS.bikeLight.dataTestId);
      await productsPage.addToCartByTestId(PRODUCTS.boltShirt.dataTestId);
    });
    await allure.step('Verify cart badge shows 3', async () => {
      const badge = await productsPage.getCartBadgeCount();
      expect(badge).toBe(3);
    });
  });

  test('@regression Remove product from cart updates badge', async ({ productsPage }) => {
    await allure.description('Removing the only cart item should clear the cart badge entirely.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Add to Cart');

    await allure.step('Add backpack to cart', async () => {
      await productsPage.addToCartByTestId(PRODUCTS.backpack.dataTestId);
    });
    await allure.step('Remove backpack from cart', async () => {
      await productsPage.removeFromCartByTestId(PRODUCTS.backpack.dataTestId);
    });
    await allure.step('Verify badge is gone (count = 0)', async () => {
      const badge = await productsPage.getCartBadgeCount();
      expect(badge).toBe(0);
    });
  });

  // ─── Navigation ───────────────────────────────────────────────

  test('@regression Clicking product name navigates to detail page', async ({ productsPage, productDetailPage, page }) => {
    await allure.description('Clicking a product name should navigate to its detail page.');
    await allure.severity('normal');
    await allure.feature('Products');
    await allure.story('Product Navigation');

    await allure.step('Click on backpack product name', async () => {
      await productsPage.clickOnProduct(PRODUCTS.backpack.name);
    });
    await allure.step('Verify URL contains inventory-item', async () => {
      await expect(page).toHaveURL(/inventory-item/);
    });
    await allure.step('Verify correct product name on detail page', async () => {
      const name = await productDetailPage.getProductName();
      expect(name).toBe(PRODUCTS.backpack.name);
    });
  });
});
