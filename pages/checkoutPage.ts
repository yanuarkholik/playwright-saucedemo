import { expect, Page } from "@playwright/test";
import { fillInput } from "@utils/form-helper";
import { parseCurrency } from "@utils/helper";
import { appendToList, getValue, setValue } from "@utils/store";

export class CheckoutItems {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async checkCart() {
    // validate shopping cart 
    const shoppingCart = this.page.locator(".shopping_cart_link")
    await shoppingCart.click()

    // validate tampil halaman cart 
    await expect(this.page.getByText(/your cart/i)).toBeVisible()
    const items = getValue("items")

    for (let i = 0; i < items.length; ++i) {
      await expect(this.page.getByText(items?.[i]).first()).toBeVisible()
    }
    await this.page.getByRole("button", { name: /checkout/i }).click()
  }

  async userInformation() {
    await fillInput(this.page)
    await this.page.getByRole("button", { name: /continue/i }).click()
  }

  async overviewItemsAndPayment() {
    // validate halaman overview 
    await expect(this.page.getByText(/Checkout: Overview/i)).toBeVisible()

    // validasi items 
    const items = getValue("items")
    for (let i = 0; i < items.length; ++i) {
      await expect(this.page.getByText(items?.[i]).first()).toBeVisible()
    }
  }

  async validatePrice() {
    // get price each items 
    const priceElement = this.page.locator(".inventory_item_price")
    const priceCount = await priceElement.count()
    let calculatedPrice = 0

    // count price and sum price 
    for (let i = 0; i < priceCount; ++i) {
      const priceText = await priceElement.nth(i).textContent() || ''
      const value = parseCurrency(priceText)
      appendToList("item_prices", value)
      calculatedPrice += value
    }

    // validate jumlah harga 
    setValue("total_price", calculatedPrice)
    await expect(this.page.getByText(calculatedPrice.toString())).toBeVisible()

    // finish process 
    await this.page.getByRole("button", { name: /finish/i }).click()
    await expect(this.page.getByText(/Thank you for your order!/i)).toBeVisible()

    // back to home
    await this.page.getByRole("button", { name: /back home/i }).click()
    await expect(this.page.getByText(/products/i).first()).toBeVisible()
  }
}
