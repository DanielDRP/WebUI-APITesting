import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, PASSWORD } from '../data/users';

test('Standard user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard, PASSWORD);

  await expect(page).toHaveURL(/inventory.html/);
});
