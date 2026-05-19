import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login/login.page';

test.describe('Login Seed', () => {
  test('Login Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.getByText('Swag Labs').first()).toBeVisible();
  });
});