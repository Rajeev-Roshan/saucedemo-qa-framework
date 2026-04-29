import { test, expect } from '../../src/fixtures';
import { USERS, INVALID_USERS } from '../../src/data/users';
import { allure } from 'allure-playwright';

test.describe('Authentication', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // ─── Happy Path ───────────────────────────────────────────────

  test('@smoke Login with valid standard user credentials', async ({ loginPage, page }) => {
    await allure.description('Verifies that a valid user can log in and land on the inventory page.');
    await allure.severity('critical');
    await allure.feature('Authentication');
    await allure.story('Valid Login');

    await allure.step('Enter valid credentials and submit', async () => {
      await loginPage.login(USERS.standard.username, USERS.standard.password);
    });
    await allure.step('Verify redirect to inventory page', async () => {
      await expect(page).toHaveURL('/inventory.html');
    });
  });

  test('@smoke Login page displays logo', async ({ loginPage }) => {
    await allure.description('Verifies the Swag Labs logo is visible on the login page.');
    await allure.severity('minor');
    await allure.feature('Authentication');
    await allure.story('Login Page UI');

    await allure.step('Check logo visibility', async () => {
      expect(await loginPage.isLoginLogoVisible()).toBe(true);
    });
  });

  test('@regression Login with performance glitch user completes eventually', async ({ loginPage, page }) => {
    await allure.description('Performance glitch user experiences a delay but should still reach inventory.');
    await allure.severity('normal');
    await allure.feature('Authentication');
    await allure.story('User Variants');

    await allure.step('Login as performance glitch user', async () => {
      await loginPage.login(USERS.performance.username, USERS.performance.password);
    });
    await allure.step('Verify inventory page loads within 15 seconds', async () => {
      await expect(page).toHaveURL('/inventory.html', { timeout: 15000 });
    });
  });

  // ─── Negative Tests ───────────────────────────────────────────

  test('@regression Locked out user cannot login', async ({ loginPage, page }) => {
    await allure.description('Locked out user should see an error and remain on the login page.');
    await allure.severity('critical');
    await allure.feature('Authentication');
    await allure.story('Access Control');

    await allure.step('Attempt login with locked out user', async () => {
      await loginPage.login(USERS.locked.username, USERS.locked.password);
    });
    await allure.step('Verify error message contains "locked out"', async () => {
      expect(await loginPage.isErrorVisible()).toBe(true);
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('locked out');
    });
    await allure.step('Verify user stays on login page', async () => {
      await expect(page).toHaveURL('/');
    });
  });

  test('@regression Wrong password shows error', async ({ loginPage }) => {
    await allure.description('Entering an incorrect password should show a credential mismatch error.');
    await allure.severity('critical');
    await allure.feature('Authentication');
    await allure.story('Invalid Credentials');

    await allure.step('Submit login with wrong password', async () => {
      await loginPage.login(INVALID_USERS.wrongPassword.username, INVALID_USERS.wrongPassword.password);
    });
    await allure.step('Verify error message content', async () => {
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Username and password do not match');
    });
  });

  test('@regression Wrong username shows error', async ({ loginPage }) => {
    await allure.description('Entering an unrecognised username should show a credential mismatch error.');
    await allure.severity('normal');
    await allure.feature('Authentication');
    await allure.story('Invalid Credentials');

    await allure.step('Submit login with unknown username', async () => {
      await loginPage.login(INVALID_USERS.wrongUsername.username, INVALID_USERS.wrongUsername.password);
    });
    await allure.step('Verify error message', async () => {
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Username and password do not match');
    });
  });

  test('@regression Empty credentials show username required error', async ({ loginPage }) => {
    await allure.description('Submitting the login form with no input should require a username.');
    await allure.severity('normal');
    await allure.feature('Authentication');
    await allure.story('Form Validation');

    await allure.step('Submit empty login form', async () => {
      await loginPage.login(INVALID_USERS.empty.username, INVALID_USERS.empty.password);
    });
    await allure.step('Verify username required error', async () => {
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Username is required');
    });
  });

  test('@regression Empty password shows password required error', async ({ loginPage }) => {
    await allure.description('Submitting with a username but no password should require a password.');
    await allure.severity('normal');
    await allure.feature('Authentication');
    await allure.story('Form Validation');

    await allure.step('Submit login with username but no password', async () => {
      await loginPage.login(INVALID_USERS.emptyPassword.username, INVALID_USERS.emptyPassword.password);
    });
    await allure.step('Verify password required error', async () => {
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Password is required');
    });
  });

  test('@regression Error message can be dismissed', async ({ loginPage }) => {
    await allure.description('The error banner should be closable via the X button.');
    await allure.severity('minor');
    await allure.feature('Authentication');
    await allure.story('Form Validation');

    await allure.step('Trigger an error', async () => {
      await loginPage.login(INVALID_USERS.empty.username, INVALID_USERS.empty.password);
      expect(await loginPage.isErrorVisible()).toBe(true);
    });
    await allure.step('Close the error banner', async () => {
      await loginPage.closeError();
    });
    await allure.step('Verify error is no longer visible', async () => {
      expect(await loginPage.isErrorVisible()).toBe(false);
    });
  });

  // ─── Session Tests ────────────────────────────────────────────

  test('@regression Cannot access inventory without login', async ({ page }) => {
    await allure.description('Unauthenticated users should be redirected to login when accessing /inventory.html.');
    await allure.severity('blocker');
    await allure.feature('Authentication');
    await allure.story('Route Protection');

    await allure.step('Navigate directly to inventory page', async () => {
      await page.goto('/inventory.html');
    });
    await allure.step('Verify redirect to login page', async () => {
      await expect(page).toHaveURL('/');
    });
  });

  test('@regression Cannot access cart without login', async ({ page }) => {
    await allure.description('Unauthenticated users should be redirected to login when accessing /cart.html.');
    await allure.severity('blocker');
    await allure.feature('Authentication');
    await allure.story('Route Protection');

    await allure.step('Navigate directly to cart page', async () => {
      await page.goto('/cart.html');
    });
    await allure.step('Verify redirect to login page', async () => {
      await expect(page).toHaveURL('/');
    });
  });
});
