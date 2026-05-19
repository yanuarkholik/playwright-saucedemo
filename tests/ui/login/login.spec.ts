import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login/login.page';

const PASSWORD = process.env.PASSWORD!;
const STANDARD_USER = process.env.STANDARD_USER!;
const LOCKED_OUT_USER = process.env.LOCKED_OUT_USER!;
const PROBLEM_USER = process.env.PROBLEM_USER!;
const PERFORMANCE_GLITCH_USER = process.env.PERFORMANCE_GLITCH_USER!;
const ERROR_USER = process.env.ERROR_USER!;
const VISUAL_USER = process.env.VISUAL_USER!;

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-LOGIN-01 | Login berhasil sebagai standard_user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
    expect.soft(loginPage.appLogo.first()).toBeVisible();
    expect.soft(loginPage.pageTitle.first()).toBeVisible();
    expect.soft(await page.locator('.inventory_item').count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-LOGIN-02 | Login ditolak sebagai locked_out_user (akun diblokir)', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(LOCKED_OUT_USER, PASSWORD);
    await expect.soft(loginPage.errorMessage.first()).toBeVisible();
    await expect.soft(loginPage.usernameField.first()).toHaveClass(/error/);
    await expect.soft(loginPage.passwordField.first()).toHaveClass(/error/);
  });

  test('TC-LOGIN-03 | Login berhasil sebagai problem_user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(PROBLEM_USER, PASSWORD);
    expect.soft(loginPage.appLogo.first()).toBeVisible();
    expect.soft(loginPage.pageTitle.first()).toBeVisible();
    expect.soft(await page.locator('.inventory_item').count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-LOGIN-04 | Login berhasil sebagai performance_glitch_user', async ({ page }) => {
    test.setTimeout(60_000);
    loginPage = new LoginPage(page);
    await loginPage.login(PERFORMANCE_GLITCH_USER, PASSWORD);
    await page.waitForLoadState('networkidle');
    expect.soft(loginPage.appLogo.first()).toBeVisible();
    expect.soft(loginPage.pageTitle.first()).toBeVisible();
    expect.soft(await page.locator('.inventory_item').count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-LOGIN-05 | Login berhasil sebagai error_user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(ERROR_USER, PASSWORD);
    expect.soft(loginPage.appLogo.first()).toBeVisible();
    expect.soft(loginPage.pageTitle.first()).toBeVisible();
    expect.soft(await page.locator('.inventory_item').count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-LOGIN-06 | Login berhasil sebagai visual_user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(VISUAL_USER, PASSWORD);
    expect.soft(loginPage.appLogo.first()).toBeVisible();
    expect.soft(loginPage.pageTitle.first()).toBeVisible();
    expect.soft(await page.locator('.inventory_item').count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-LOGIN-07 | Login gagal saat username dikosongkan', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.attemptLoginWithoutUsername(PASSWORD);
    await expect.soft(loginPage.errorMessage.first()).toBeVisible();
    await expect.soft(loginPage.usernameField.first()).toHaveClass(/error/);
  });

  test('TC-LOGIN-08 | Login gagal saat password dikosongkan', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.attemptLoginWithoutPassword(STANDARD_USER);
    await expect.soft(loginPage.errorMessage.first()).toBeVisible();
    await expect.soft(loginPage.passwordField.first()).toHaveClass(/error/);
  });

  test('TC-LOGIN-09 | Login gagal dengan kredensial yang tidak valid', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(`wrong_user_${Date.now()}`, `wrong_pass_${Date.now()}`);
    await expect.soft(loginPage.errorMessage.first()).toBeVisible();
    await expect.soft(loginPage.usernameField.first()).toHaveClass(/error/);
    await expect.soft(loginPage.passwordField.first()).toHaveClass(/error/);
  });
});
