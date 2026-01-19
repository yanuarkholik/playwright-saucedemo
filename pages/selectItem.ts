import { expect, Page } from "@playwright/test"
import { appendToList, initStore, setValue } from "@utils/store";


export class SelecItems {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // add item to the cart 
  async addItem() {
    const item = this.page.locator(".inventory_item").first()
    const itemName = await item.locator(".inventory_item_name").textContent()

    // store value 
    setValue("item_name", itemName)

    // klik button add to cart 
    await item.getByRole('button', { name: /add to cart/i }).click()
    await expect(item.locator("button").filter({ hasText: /remove/i })).toBeVisible()
  }

  async addAllItem() {
    const item = this.page.locator(".inventory_item")
    const itemCount = await item.count()

    initStore()
    for (let i = 0; i < itemCount; ++i) {
      // set value nama item 
      const itemName = await item.nth(i).locator(".inventory_item_name").textContent()
      appendToList("items", itemName)
      // select item 
      await item.nth(i).getByRole('button', { name: /add to cart/i }).click()
      await expect(item.nth(i).locator("button").filter({ hasText: /remove/i })).toBeVisible()
    }
  }
}
