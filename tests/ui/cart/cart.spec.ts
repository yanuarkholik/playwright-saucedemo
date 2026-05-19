import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login/login.page';
import { CartPage } from '@pages/cart/cart.page';

const PASSWORD = process.env.PASSWORD!;
const STANDARD_USER = process.env.STANDARD_USER!;

test.describe('Cart Functionality', () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
  });

  test('TC-CART-01 | Menambahkan satu item ke keranjang', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-backpack');
    const removeButton = cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack');
    expect.soft(removeButton.first()).toBeVisible();

    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.openCart();
    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    expect.soft(await cartPage.getCartItemsCount()).toBeGreaterThanOrEqual(1);

    const backpackName = cartPage.getCartItemByName('Sauce Labs Backpack');
    expect.soft(backpackName.first()).toBeVisible();
  });

  test('TC-CART-02 | Menambahkan semua item ke keranjang', async ({ page }) => {
    expect.soft(await cartPage.getInventoryItemsCount()).toBeGreaterThanOrEqual(6);

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-bike-light');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-bike-light').first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-bolt-t-shirt');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-bolt-t-shirt').first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-fleece-jacket');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-fleece-jacket').first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-onesie');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-onesie').first()).toBeVisible();

    await cartPage.addToCart('test.allthethings()-t-shirt-(red)');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-test.allthethings()-t-shirt-(red)').first()).toBeVisible();

    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(6);

    const addToCartButtons = await cartPage.getAllAddToCartButtonsOnInventory();
    for (const btn of addToCartButtons) {
      expect.soft(await btn.isVisible()).toBe(false);
    }

    await cartPage.openCart();
    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    expect.soft(await cartPage.getCartItemsCount()).toBeGreaterThanOrEqual(6);

    const itemNames = await cartPage.getAllCartItemNames();
    expect.soft(itemNames.some(name => name.includes('Sauce Labs Backpack'))).toBe(true);
    expect.soft(itemNames.some(name => name.includes('Sauce Labs Bike Light'))).toBe(true);
    expect.soft(itemNames.some(name => name.includes('Sauce Labs Bolt T-Shirt'))).toBe(true);
    expect.soft(itemNames.some(name => name.includes('Sauce Labs Fleece Jacket'))).toBe(true);
    expect.soft(itemNames.some(name => name.includes('Sauce Labs Onesie'))).toBe(true);
    expect.soft(itemNames.some(name => name.includes('Test.allTheThings() T-Shirt (Red)'))).toBe(true);

    const itemPrices = await cartPage.getAllCartItemPrices();
    expect.soft(itemPrices.some(price => price.includes('$29.99'))).toBe(true);
    expect.soft(itemPrices.some(price => price.includes('$9.99'))).toBe(true);
    expect.soft(itemPrices.some(price => price.includes('$15.99'))).toBe(true);
    expect.soft(itemPrices.some(price => price.includes('$49.99'))).toBe(true);
    expect.soft(itemPrices.some(price => price.includes('$7.99'))).toBe(true);
  });

  test('TC-CART-03 | Menambahkan item lalu menghapus semua item dari keranjang', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-bike-light');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-bike-light').first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-bolt-t-shirt');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-bolt-t-shirt').first()).toBeVisible();

    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(3);

    await cartPage.openCart();
    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    expect.soft(await cartPage.getCartItemsCount()).toBeGreaterThanOrEqual(3);

    await cartPage.removeItemFromCartByName('Sauce Labs Backpack');
    const backpackItem = cartPage.getCartItemByName('Sauce Labs Backpack');
    expect.soft(await backpackItem.count()).toBe(0);
    expect.soft(await cartPage.getBadgeCount()).toBe(2);

    await cartPage.removeItemFromCartByName('Sauce Labs Bike Light');
    const bikeLightItem = cartPage.getCartItemByName('Sauce Labs Bike Light');
    expect.soft(await bikeLightItem.count()).toBe(0);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.removeItemFromCartByName('Sauce Labs Bolt T-Shirt');
    const boltTShirtItem = cartPage.getCartItemByName('Sauce Labs Bolt T-Shirt');
    expect.soft(await boltTShirtItem.count()).toBe(0);
    expect.soft(await cartPage.isBadgeVisible()).toBe(false);

    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    expect.soft(await cartPage.getCartItemsCount()).toBe(0);
    expect.soft(cartPage.continueShoppingButton.first()).toBeVisible();
    expect.soft(cartPage.checkoutButton.first()).toBeVisible();
  });

  test('TC-CART-04 | Badge keranjang tidak terlihat saat keranjang kosong', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(false);
  });

  test('TC-CART-05 | Menghapus item langsung dari halaman inventory', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.removeFromInventory('sauce-labs-backpack');
    const addToCartBtn = cartPage.getAddToCartButton('add-to-cart-sauce-labs-backpack');
    expect.soft(addToCartBtn.first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(false);
  });

  test('TC-CART-06 | Tombol Continue Shopping kembali ke halaman inventory', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.openCart();
    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    const backpackItem = cartPage.getCartItemByName('Sauce Labs Backpack');
    expect.soft(backpackItem.first()).toBeVisible();

    await cartPage.clickContinueShopping();
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();
  });

  test('TC-CART-07 | Menambahkan item yang sama berulang kali tidak menggandakan item', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.removeFromInventory('sauce-labs-backpack');
    const addToCartBtn = cartPage.getAddToCartButton('add-to-cart-sauce-labs-backpack');
    expect.soft(addToCartBtn.first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(false);

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(await cartPage.getBadgeCount()).toBe(1);
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();

    await cartPage.openCart();
    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    expect.soft(await cartPage.getCartItemsCount()).toBe(1);

    const backpackItem = cartPage.getCartItemByName('Sauce Labs Backpack yang tidak ada');
    expect.soft(backpackItem.first()).toBeVisible();
    expect.soft(await cartPage.getItemQuantity(0)).toBe('1');
  });

  test.only('TC-CART-08 | Menghapus semua item dari cart lalu menambahkan item baru', async ({ page }) => {
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-backpack');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-backpack').first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.openCart();
    await cartPage.removeItemFromCartByName('Sauce Labs Backpack');
    const backpackItem = cartPage.getCartItemByName('Sauce Labs Backpack');
    expect.soft(await backpackItem.count()).toBe(0);
    expect.soft(await cartPage.isBadgeVisible()).toBe(false);

    await cartPage.clickContinueShopping();
    expect.soft(cartPage.inventoryTitle.first()).toBeVisible();

    await cartPage.addToCart('sauce-labs-fleece-jacket');
    expect.soft(cartPage.getRemoveButtonOnInventory('remove-sauce-labs-fleece-jacket').first()).toBeVisible();
    expect.soft(await cartPage.isBadgeVisible()).toBe(true);
    expect.soft(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.openCart();
    expect.soft(cartPage.cartTitle.first()).toBeVisible();
    expect.soft(await cartPage.getCartItemsCount()).toBe(1);

    const fleeceJacketItem = cartPage.getCartItemByName('Sauce Labs Fleece Jacket');
    expect.soft(fleeceJacketItem.first()).toBeVisible();

    const fleeceJacketPrice = await cartPage.getCartItemPrice(0);
    expect.soft(fleeceJacketPrice).toContain('$49.99');
  });
});
