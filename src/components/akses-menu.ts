import { Page, expect } from "playwright/test";

export const SIDEBAR_MENU = {
  TRANSACTION_ORDER: {
    TRANSACTION: 'Transaction',
  },
  TICKETING: {
    EVENTS: 'Events',
    TICKETS: 'Tickets',
    BANNERS: 'Banners',
  },
  MASTER_DATA: {
    MERCHANTS: 'Merchants',
    TICKET_CLASSES: 'Ticket Classes',
    TICKET_TYPES: 'Ticket Types',
    TEMPLATE_ATTRIBUTES: 'Template Attributes',
    CATEGORIES: 'Categories',
    TAGS: 'Tags',
    PROVINCES: 'Provinces',
    REGENCIES: 'Regencies',
    USERS: 'Users',
  },
  OTHER: {
    SETTINGS: 'Settings',
    HELPS: 'Helps',
  },
} as const;

export type MenuName =
  | typeof SIDEBAR_MENU.TRANSACTION_ORDER[keyof typeof SIDEBAR_MENU.TRANSACTION_ORDER]
  | typeof SIDEBAR_MENU.TICKETING[keyof typeof SIDEBAR_MENU.TICKETING]
  | typeof SIDEBAR_MENU.MASTER_DATA[keyof typeof SIDEBAR_MENU.MASTER_DATA]
  | typeof SIDEBAR_MENU.OTHER[keyof typeof SIDEBAR_MENU.OTHER];


export class Sidebar {
  constructor(private readonly page: Page) {
  }

  async navigateTo(name: MenuName): Promise<void> {
    await this.page.waitForLoadState("networkidle")
    const targetLink = this.page.locator("a p")
      .filter({ has: this.page.getByText(name, { exact: true }) })
    await targetLink.click()

    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.page.
      locator("header p.font-bold")
      .getByText(name)).toBeVisible()
  }
}
