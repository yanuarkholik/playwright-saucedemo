import { Page, Locator, expect } from "playwright/test";
import { Utils } from "@utils/utils";

// form components
export class FormComponents {
  private readonly page: Page;
  readonly textInput: Locator;
  readonly textareaInput: Locator;
  readonly listBoxInput: Locator;
  readonly dialogInput: Locator;
  readonly regularButton: Locator;
  readonly editableContent: Locator;
  readonly toggleButtton: Locator;
  readonly uploadButton: Locator

  constructor(page: Page) {
    this.page = page;
    // locator

    this.uploadButton = this.page
      .getByRole("button", { name: /upload/i })
    this.textInput = this.page
      .locator("input[type='text'][data-slot='form-control']")
      .filter({ visible: true });
    this.listBoxInput = this.page
      .locator("button[aria-haspopup='listbox']")
      .filter({ visible: true });
    this.dialogInput = this.page
      .locator("button[aria-haspopup='dialog']")
      .filter({ visible: true });
    this.regularButton = this.page
      .locator("button:not([aria-haspopup])[data-slot='form-control']")
      .filter({ visible: true });
    this.textareaInput = this.page
      .locator("textarea")
      .filter({ visible: true });
    this.editableContent = this.page
      .locator("div[role='textbox']")
      .filter({ visible: true });
    this.toggleButtton = this.page
      .locator("button[aria-checked='false']")
      .filter({ visible: true });
  }

  async formDetector(): Promise<void> {
    await this.autoTextInput();
    await this.autoListBoxInput();
  }

  async uploadButtonImage(field: string = null, text: string = " "): Promise<void> {
    const uploadButtons = await this.uploadButton.all();

    for (let i = 0; i < uploadButtons.length; i++) {
      const element = uploadButtons[i];

      if (field) {
        await element.click();
        const [fileChooser] = await Promise.all([
          this.page.waitForEvent('filechooser'),
        ]);
        await fileChooser.setFiles(text);
      } else {
        await element.click();
        const [fileChooser] = await Promise.all([
          this.page.waitForEvent('filechooser'),
        ]);
        await fileChooser.setFiles('./media/img/dummy.jpg');
      }

      await this.page.waitForTimeout(500);
    }
  }

  async autoTextInput(inputs: { field: string; text: string }[] = null): Promise<void> {
    const textInputs = await this.textInput.all();

    if (textInputs.length === 0) {
      return;
    }

    const notFound: string[] = [];

    for (let i = 0; i < textInputs.length; i++) {
      const element = textInputs[i];
      const rawLabel = element.locator("xpath=./preceding-sibling::label");
      const rawLabelText = await rawLabel.textContent();
      const label = rawLabelText?.trim() || `Field-${i}`;

      await expect(element).toBeVisible();
      const foundInput = inputs?.find(
        (input) => input.field?.toLocaleLowerCase() === rawLabelText?.toLocaleLowerCase()
      );

      if (foundInput) {
        await element.fill(foundInput.text);
      } else if (!inputs) {
        const labelElement = `${label} ${Utils.getTimestamp()}`;
        await element.fill(labelElement);
      } else {
        notFound.push(label);
      }
    }

    if (notFound.length > 0) {
      throw new Error(`Field not found on page: ${notFound.join(', ')}`);
    }
  }

  async autoDialogInput() {
    const inputs = await this.dialogInput.all();

    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      await element.click();

      const alpha = Utils.getTodayDate(i);
      const pickDate = this.page.locator(`button[data-value="${alpha}"]`);

      await expect(pickDate).toBeVisible();
      await pickDate.click();
      await this.page.keyboard.press("Escape");
      await expect(pickDate).toBeHidden();
    }
  }

  async autoListBoxInput(
    field: string = null,
    text: string = null,
  ): Promise<void> {
    const inputs = await this.listBoxInput.all();
    const listBox = this.page
      .locator("div[role='listbox']")
      .locator("div[role='option']");

    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      const rawLabel = element.locator("xpath=../preceding-sibling::label");
      const rawLabelText = await rawLabel.textContent();
      await element.click();

      await expect(element).toBeVisible();
      const listBoxAll = await listBox.all();
      const chooseListBox = Utils.getRandomNumberInRange(1, listBoxAll.length);
      const listBoxElement = listBox.nth(chooseListBox - 1);

      // jika terdapat kecocokan nama field
      if (field === rawLabelText) {
        const specificListBox = listBox.getByText(new RegExp(`${text}`, "i"));
        await specificListBox.scrollIntoViewIfNeeded();
        await specificListBox.click();
      } else {
        await listBoxElement.scrollIntoViewIfNeeded();
        await expect(listBoxElement).toBeEnabled();
        await listBoxElement.click();
      }

      // tunggu listBox hide
      await expect(listBoxElement).toBeHidden();
    }
  }
}
