import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PASSWORD, users } from '../data/users';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.goto();
    await loginPage.login(users.standard, PASSWORD);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
  });

  test('should complete full checkout process', async () => {
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillInformation('Ruth', 'Alberto', '12345');
    await checkoutPage.continue();
    await checkoutPage.finish();
    
    const completeMsg = await checkoutPage.getCompleteMessage();
    expect(completeMsg).toContain('Thank you for your order');
  });

  test('should show error when checkout without first name', async () => {
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillInformation('', 'Alberto', '12345');
    await checkoutPage.continue();
    
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('should show error when checkout without last name', async () => {
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillInformation('Ruth', '', '12345');
    await checkoutPage.continue();
    
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('should show error when checkout without postal code', async () => {
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillInformation('Ruth', 'Alberto', '');
    await checkoutPage.continue();
    
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('should remove item from cart', async () => {
    await cartPage.goto();
    const initialCount = await cartPage.getItemCount();
    expect(initialCount).toBe(1);
    
    await cartPage.removeItem('Sauce Labs Backpack');
    const finalCount = await cartPage.getItemCount();
    expect(finalCount).toBe(0);
  });
});