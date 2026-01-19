import { test } from "@playwright/test"
import { LoginPages } from "@pages/loginPages"
import { SelecItems } from "@pages/selectItem"
import { CheckoutItems } from "@pages/checkoutPage";

test.describe("Checkout item in the cart", () => {
  let selectItem: SelecItems;
  let loginPage: LoginPages;
  let checkoutItem: CheckoutItems;
  // setup hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPages(page)
    selectItem = new SelecItems(page)
    checkoutItem = new CheckoutItems(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

  });
  //
  // test("berhasil add item ke dalam cart", async () => {
  //   await selectItem.addItem()
  // })

  test("berhasil add semua item ke dalam cart", async () => {
    await selectItem.addAllItem()
    await checkoutItem.checkCart()
    await checkoutItem.userInformation()
    await checkoutItem.overviewItemsAndPayment()
    await checkoutItem.validatePrice()
  })
})
