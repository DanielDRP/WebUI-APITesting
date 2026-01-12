import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, PASSWORD } from '../data/users';

test('Performance user can login even if slow', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const start = Date.now();

  await loginPage.goto();
  await loginPage.login(users.performance, PASSWORD);

  await expect(page).toHaveURL(/inventory.html/);

  const duration = Date.now() - start;
  console.log(`Duration: ${duration} ms`);
});
