import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly appLogo: Locator;
  readonly pageTitle: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.appLogo = page.locator('.app_logo');
    this.pageTitle = page.locator('[data-test="title"]');
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto(process.env.BASE_URL!);
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.navigate();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async attemptLoginWithoutPassword(username: string): Promise<void> {
    await this.navigate();
    await this.fillUsername(username);
    await this.clickLogin();
  }

  async attemptLoginWithoutUsername(password: string): Promise<void> {
    await this.navigate();
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
