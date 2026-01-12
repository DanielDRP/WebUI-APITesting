import {test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'

test.describe('Inventory Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test('Should display all inventory items', async () => {
    const itemCount = await inventoryPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('Should add items to cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe('1');
  })

  test('should add multiple items to cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe('2');
  });

  test('should sort items by name A to Z', async () => {
    await inventoryPage.sortBy('az');
    const firstName = await inventoryPage.getFirstItemName();
    expect(firstName).toContain('Sauce Labs Backpack');
  });

  test('should sort items by name Z to A', async () => {
    await inventoryPage.sortBy('za');
    const firstName = await inventoryPage.getFirstItemName();
    expect(firstName).toContain('Test.allTheThings() T-Shirt (Red)');
  });

  test('should sort items by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const firstName = await inventoryPage.getFirstItemName();
    expect(firstName).toContain('Sauce Labs Onesie');
  });

  test('should sort items by price high to low', async () => {
    await inventoryPage.sortBy('hilo');
    const firstName = await inventoryPage.getFirstItemName();
    expect(firstName).toContain('Sauce Labs Fleece Jacket');
  });

})