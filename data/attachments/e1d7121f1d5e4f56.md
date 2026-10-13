# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products/products.spec.ts >> Products Page >> @smoke Products page shows 6 products
- Location: tests/products/products.spec.ts:16:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6
Received: 0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic:
          - generic:
            - generic [ref=e7]:
              - button "Open Menu" [ref=e8] [cursor=pointer]
              - img "Open Menu" [ref=e9]
            - generic [ref=e10]:
              - navigation [ref=e12]:
                - button [ref=e13] [cursor=pointer]: All Items
                - button [ref=e14] [cursor=pointer]: Dynamic Catalog
                - link [ref=e16] [cursor=pointer]:
                  - /url: https://saucelabs.com/
                  - text: About
                - button [ref=e17] [cursor=pointer]: Logout
                - button [ref=e18] [cursor=pointer]: Reset App State
              - generic [ref=e19]:
                - button [ref=e20] [cursor=pointer]: Close Menu
                - img [ref=e21]
        - generic [ref=e23]: Swag Labs
        - button "Cart, empty" [ref=e25]
      - generic [ref=e26]:
        - generic [ref=e27]: Products
        - generic [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: Name (A to Z)
          - combobox "Sort products" [ref=e31]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - main [ref=e32]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - button "View details for Sauce Labs Backpack" [ref=e38] [cursor=pointer]:
            - img "Sauce Labs Backpack" [ref=e39]
          - generic [ref=e40]:
            - generic [ref=e41]:
              - button "View details for Sauce Labs Backpack" [ref=e42] [cursor=pointer]:
                - generic [ref=e43]: Sauce Labs Backpack
              - generic [ref=e44]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e45]:
              - generic [ref=e46]: $29.99
              - button "Add to cart" [ref=e47] [cursor=pointer]
        - generic [ref=e48]:
          - button "View details for Sauce Labs Bike Light" [ref=e50] [cursor=pointer]:
            - img "Sauce Labs Bike Light" [ref=e51]
          - generic [ref=e52]:
            - generic [ref=e53]:
              - button "View details for Sauce Labs Bike Light" [ref=e54] [cursor=pointer]:
                - generic [ref=e55]: Sauce Labs Bike Light
              - generic [ref=e56]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e57]:
              - generic [ref=e58]: $9.99
              - button "Add to cart" [ref=e59] [cursor=pointer]
        - generic [ref=e60]:
          - button "View details for Sauce Labs Bolt T-Shirt" [ref=e62] [cursor=pointer]:
            - img "Sauce Labs Bolt T-Shirt" [ref=e63]
          - generic [ref=e64]:
            - generic [ref=e65]:
              - button "View details for Sauce Labs Bolt T-Shirt" [ref=e66] [cursor=pointer]:
                - generic [ref=e67]: Sauce Labs Bolt T-Shirt
              - generic [ref=e68]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e69]:
              - generic [ref=e70]: $15.99
              - button "Add to cart" [ref=e71] [cursor=pointer]
        - generic [ref=e72]:
          - button "View details for Sauce Labs Fleece Jacket" [ref=e74] [cursor=pointer]:
            - img "Sauce Labs Fleece Jacket" [ref=e75]
          - generic [ref=e76]:
            - generic [ref=e77]:
              - button "View details for Sauce Labs Fleece Jacket" [ref=e78] [cursor=pointer]:
                - generic [ref=e79]: Sauce Labs Fleece Jacket
              - generic [ref=e80]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
            - generic [ref=e81]:
              - generic [ref=e82]: $49.99
              - button "Add to cart" [ref=e83] [cursor=pointer]
        - generic [ref=e84]:
          - button "View details for Sauce Labs Onesie" [ref=e86] [cursor=pointer]:
            - img "Sauce Labs Onesie" [ref=e87]
          - generic [ref=e88]:
            - generic [ref=e89]:
              - button "View details for Sauce Labs Onesie" [ref=e90] [cursor=pointer]:
                - generic [ref=e91]: Sauce Labs Onesie
              - generic [ref=e92]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
            - generic [ref=e93]:
              - generic [ref=e94]: $7.99
              - button "Add to cart" [ref=e95] [cursor=pointer]
        - generic [ref=e96]:
          - button "View details for Test.allTheThings() T-Shirt (Red)" [ref=e98] [cursor=pointer]:
            - img "Test.allTheThings() T-Shirt (Red)" [ref=e99]
          - generic [ref=e100]:
            - generic [ref=e101]:
              - button "View details for Test.allTheThings() T-Shirt (Red)" [ref=e102] [cursor=pointer]:
                - generic [ref=e103]: Test.allTheThings() T-Shirt (Red)
              - generic [ref=e104]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
            - generic [ref=e105]:
              - generic [ref=e106]: $15.99
              - button "Add to cart" [ref=e107] [cursor=pointer]
  - contentinfo [ref=e108]:
    - list [ref=e109]:
      - listitem [ref=e110]:
        - link "X" [ref=e111] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=e112]:
        - link "Facebook" [ref=e113] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e114]:
        - link "LinkedIn" [ref=e115] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e116]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { authenticatedTest as test, expect } from '../../src/fixtures';
  2   | import { USERS } from '../../src/data/users';
  3   | import { PRODUCTS, SORT_OPTIONS } from '../../src/data/products';
  4   | import { allure } from 'allure-playwright';
  5   | 
  6   | test.describe('Products Page', () => {
  7   | 
  8   |   test.beforeEach(async ({ loginPage, page }) => {
  9   |     await loginPage.goto();
  10  |     await loginPage.login(USERS.standard.username, USERS.standard.password);
  11  |     await expect(page).toHaveURL('/inventory.html');
  12  |   });
  13  | 
  14  |   // ─── Display Tests ────────────────────────────────────────────
  15  | 
  16  |   test('@smoke Products page shows 6 products', async ({ productsPage }) => {
  17  |     await allure.description('The inventory page must display exactly 6 products.');
  18  |     await allure.severity('critical');
  19  |     await allure.feature('Products');
  20  |     await allure.story('Product Listing');
  21  | 
  22  |     await allure.step('Count visible products and assert 6', async () => {
  23  |       const count = await productsPage.getProductCount();
> 24  |       expect(count).toBe(6);
      |                     ^ Error: expect(received).toBe(expected) // Object.is equality
  25  |     });
  26  |   });
  27  | 
  28  |   test('@smoke Product list is visible', async ({ productsPage }) => {
  29  |     await allure.description('The product inventory list container should be visible on page load.');
  30  |     await allure.severity('critical');
  31  |     await allure.feature('Products');
  32  |     await allure.story('Product Listing');
  33  | 
  34  |     await allure.step('Assert inventory list is visible', async () => {
  35  |       expect(await productsPage.isProductListVisible()).toBe(true);
  36  |     });
  37  |   });
  38  | 
  39  |   test('@regression All product names are visible', async ({ productsPage }) => {
  40  |     await allure.description('Every product must have a non-empty display name.');
  41  |     await allure.severity('normal');
  42  |     await allure.feature('Products');
  43  |     await allure.story('Product Listing');
  44  | 
  45  |     await allure.step('Fetch all product names and validate', async () => {
  46  |       const names = await productsPage.getProductNames();
  47  |       expect(names.length).toBe(6);
  48  |       names.forEach(name => expect(name.length).toBeGreaterThan(0));
  49  |     });
  50  |   });
  51  | 
  52  |   test('@regression All product prices are positive numbers', async ({ productsPage }) => {
  53  |     await allure.description('Every product price must be a positive numeric value.');
  54  |     await allure.severity('normal');
  55  |     await allure.feature('Products');
  56  |     await allure.story('Product Listing');
  57  | 
  58  |     await allure.step('Fetch and validate all prices are greater than 0', async () => {
  59  |       const prices = await productsPage.getProductPrices();
  60  |       prices.forEach(price => {
  61  |         expect(price).toBeGreaterThan(0);
  62  |       });
  63  |     });
  64  |   });
  65  | 
  66  |   // ─── Sorting Tests ────────────────────────────────────────────
  67  | 
  68  |   test('@regression Sort products A to Z', async ({ productsPage }) => {
  69  |     await allure.description('Selecting A-Z sort should reorder products alphabetically ascending.');
  70  |     await allure.severity('normal');
  71  |     await allure.feature('Products');
  72  |     await allure.story('Sorting');
  73  | 
  74  |     await allure.step('Apply A-Z sort', async () => {
  75  |       await productsPage.sortBy(SORT_OPTIONS.nameAZ);
  76  |     });
  77  |     await allure.step('Verify alphabetical ascending order', async () => {
  78  |       const names = await productsPage.getProductNames();
  79  |       const sorted = [...names].sort();
  80  |       expect(names).toEqual(sorted);
  81  |     });
  82  |   });
  83  | 
  84  |   test('@regression Sort products Z to A', async ({ productsPage }) => {
  85  |     await allure.description('Selecting Z-A sort should reorder products alphabetically descending.');
  86  |     await allure.severity('normal');
  87  |     await allure.feature('Products');
  88  |     await allure.story('Sorting');
  89  | 
  90  |     await allure.step('Apply Z-A sort', async () => {
  91  |       await productsPage.sortBy(SORT_OPTIONS.nameZA);
  92  |     });
  93  |     await allure.step('Verify alphabetical descending order', async () => {
  94  |       const names = await productsPage.getProductNames();
  95  |       const sorted = [...names].sort().reverse();
  96  |       expect(names).toEqual(sorted);
  97  |     });
  98  |   });
  99  | 
  100 |   test('@regression Sort products price low to high', async ({ productsPage }) => {
  101 |     await allure.description('Price low-to-high sort should order products by ascending price.');
  102 |     await allure.severity('normal');
  103 |     await allure.feature('Products');
  104 |     await allure.story('Sorting');
  105 | 
  106 |     await allure.step('Apply price low-to-high sort', async () => {
  107 |       await productsPage.sortBy(SORT_OPTIONS.priceLowHigh);
  108 |     });
  109 |     await allure.step('Verify each price is <= the next', async () => {
  110 |       const prices = await productsPage.getProductPrices();
  111 |       for (let i = 0; i < prices.length - 1; i++) {
  112 |         expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  113 |       }
  114 |     });
  115 |   });
  116 | 
  117 |   test('@regression Sort products price high to low', async ({ productsPage }) => {
  118 |     await allure.description('Price high-to-low sort should order products by descending price.');
  119 |     await allure.severity('normal');
  120 |     await allure.feature('Products');
  121 |     await allure.story('Sorting');
  122 | 
  123 |     await allure.step('Apply price high-to-low sort', async () => {
  124 |       await productsPage.sortBy(SORT_OPTIONS.priceHighLow);
```