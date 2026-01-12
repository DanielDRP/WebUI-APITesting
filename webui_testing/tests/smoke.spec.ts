import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, PASSWORD } from '../data/users';

test('User can login and see products', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard, PASSWORD);

  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6);
});
