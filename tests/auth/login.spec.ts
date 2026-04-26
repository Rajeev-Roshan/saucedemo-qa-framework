import { test, expect } from '../../src/fixtures';
import { USERS, INVALID_USERS } from '../../src/data/users';

test.describe('Authentication', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // ─── Happy Path ───────────────────────────────────────────────

  test('@smoke Login with valid standard user credentials', async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('@smoke Login page displays logo', async ({ loginPage }) => {
    expect(await loginPage.isLoginLogoVisible()).toBe(true);
  });

  test('@regression Login with performance glitch user completes eventually', async ({ loginPage, page }) => {
    await loginPage.login(USERS.performance.username, USERS.performance.password);
    await expect(page).toHaveURL('/inventory.html', { timeout: 15000 });
  });

  // ─── Negative Tests ───────────────────────────────────────────

  test('@regression Locked out user cannot login', async ({ loginPage, page }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    expect(await loginPage.isErrorVisible()).toBe(true);
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('locked out');
    await expect(page).toHaveURL('/');
  });

  test('@regression Wrong password shows error', async ({ loginPage }) => {
    await loginPage.login(INVALID_USERS.wrongPassword.username, INVALID_USERS.wrongPassword.password);
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Username and password do not match');
  });

  test('@regression Wrong username shows error', async ({ loginPage }) => {
    await loginPage.login(INVALID_USERS.wrongUsername.username, INVALID_USERS.wrongUsername.password);
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Username and password do not match');
  });

  test('@regression Empty credentials show username required error', async ({ loginPage }) => {
    await loginPage.login(INVALID_USERS.empty.username, INVALID_USERS.empty.password);
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Username is required');
  });

  test('@regression Empty password shows password required error', async ({ loginPage }) => {
    await loginPage.login(INVALID_USERS.emptyPassword.username, INVALID_USERS.emptyPassword.password);
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Password is required');
  });

  test('@regression Error message can be dismissed', async ({ loginPage }) => {
    await loginPage.login(INVALID_USERS.empty.username, INVALID_USERS.empty.password);
    expect(await loginPage.isErrorVisible()).toBe(true);
    await loginPage.closeError();
    expect(await loginPage.isErrorVisible()).toBe(false);
  });

  // ─── Session Tests ────────────────────────────────────────────

  test('@regression Cannot access inventory without login', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
  });

  test('@regression Cannot access cart without login', async ({ page }) => {
    await page.goto('/cart.html');
    await expect(page).toHaveURL('/');
  });
});
