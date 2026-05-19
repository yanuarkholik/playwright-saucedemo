import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  readonly inventoryTitle: Locator;
  readonly cartTitle: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly inventoryItems: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly itemQuantities: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryTitle = page.locator('[data-test="title"]');
    this.cartTitle = page.locator('[data-test="title"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  getAddToCartButton(itemDataTest: string): Locator {
    return this.page.locator(`[data-test="${itemDataTest}"]`);
  }

  getRemoveButtonOnInventory(itemDataTest: string): Locator {
    return this.page.locator(`[data-test="${itemDataTest}"]`);
  }

  getRemoveButtonOnCart(itemDataTest: string): Locator {
    return this.page.locator(`[data-test="remove-${itemDataTest}"]`);
  }

  getCartItemByName(itemName: string): Locator {
    return this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName });
  }

  async addToCart(itemDataTest: string): Promise<void> {
    await this.getAddToCartButton(`add-to-cart-${itemDataTest}`).click();
  }

  async removeFromInventory(itemDataTest: string): Promise<void> {
    await this.getRemoveButtonOnInventory(`remove-${itemDataTest}`).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async removeItemFromCart(itemIndex: number): Promise<void> {
    await this.getRemoveButtonOnCart(itemIndex).click();
  }

  async removeItemFromCartByName(itemName: string): Promise<void> {
    const dataTestName = itemName.toLowerCase().replace(/[^a-z0-9()]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    await this.page.locator(`[data-test="remove-${dataTestName}"]`).click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getBadgeCount(): Promise<number> {
    const text = await this.shoppingCartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  async isBadgeVisible(): Promise<boolean> {
    return await this.shoppingCartBadge.isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getCartItemName(index: number): Promise<string> {
    return await this.itemNames.nth(index).textContent();
  }

  async getCartItemPrice(index: number): Promise<string> {
    return await this.itemPrices.nth(index).textContent();
  }

  async getItemQuantity(index: number): Promise<string> {
    return await this.itemQuantities.nth(index).textContent();
  }

  async getAllCartItemNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getAllCartItemPrices(): Promise<string[]> {
    return await this.itemPrices.allTextContents();
  }

  async getAllRemoveButtonsOnInventory(): Promise<Locator[]> {
    return await this.page.locator('[data-test^="remove-"]').all();
  }

  async getAllAddToCartButtonsOnInventory(): Promise<Locator[]> {
    return await this.page.locator('[data-test^="add-to-cart-"]').all();
  }
}
