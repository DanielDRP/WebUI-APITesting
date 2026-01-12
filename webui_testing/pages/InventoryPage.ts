import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item', { hasText: itemName });
    await item.locator('button').click();
  }

  async getCartItemCount(): Promise<string> {
    return await this.cartBadge.textContent() || '0';
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstItemName(): Promise<string> {
    return await this.inventoryItems.first().locator('.inventory_item_name').textContent() || '';
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}