import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { PASSWORD, users } from '../data/users';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with standard user', async ({ page }) => {
    await loginPage.login(users.standard, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should login successfully with performance_glitch_user', async ({ page }) => {
    await loginPage.login(users.performance, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error with locked out user', async ({ page }) => {
    await loginPage.login(users.locked, PASSWORD);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username and password do not match');
  });

  test('should show error with empty username', async ({ page }) => {
    await loginPage.login('', PASSWORD);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username is required');
  });

  test('should show error with empty password', async ({ page }) => {
    await loginPage.login(users.standard, '');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Password is required');
  });

  test('should logout successfully', async ({ page }) => {
    await loginPage.login(users.standard, PASSWORD);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
  });
});