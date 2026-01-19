import { Page, expect } from "@playwright/test";

export class LoginPages {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/', { waitUntil: "networkidle" })
    await expect(this.page.getByText("Swag Labs")).toBeVisible()
  }

  async login(username: string, password: string) {
    await this.page.locator("input#user-name").fill(username)
    await this.page.locator("input#password").fill(password)
    await this.page.locator("#login-button").click()

    // validasi halaman dashboard
    await expect(this.page.locator("[class*='header']").first()).toBeVisible()
  }
}
