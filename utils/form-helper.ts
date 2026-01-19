import { Page, expect } from "@playwright/test"
import { getTodayDatetime } from "./helper"

//====================================================
//===================Fill Input=======================
//====================================================

// fill input 
export async function fillInput(page: Page) {
  const input = page.locator("form input")
  const countAllInput = await input.count()

  // loop allinput 
  for (let i = 0; i < countAllInput; ++i) {
    const element = input.nth(i)
    await expect(element.first()).toBeVisible()
    const elementType = await element.getAttribute("type")

    // bypass element dengan tipe button-like
    if (elementType === 'submit' || elementType === 'button' || elementType === 'hidden') {
      continue;
    }

    if (elementType === "text") {
      const labelName = await element.getAttribute("placeholder")
      await element.highlight()
      const text = labelName + " " + getTodayDatetime()
      await element.fill(text)
      await expect(element).toHaveValue(text)
    }
  }
}



