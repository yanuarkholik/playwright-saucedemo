import { test, expect } from "@playwright/test";
import { LoginPages } from "@pages/loginPages";

test.describe("Login scenario", () => {
  let loginPage: LoginPages;

  // setup hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPages(page)
    await loginPage.goto()
  });

  test("berhasil melakukan login dan menampilkan halaman dashboard", async () => {
    await loginPage.login('standard_user', 'secret_sauce')
  })
})


