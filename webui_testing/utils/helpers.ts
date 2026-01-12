import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PASSWORD } from '../data/users';

export async function loginAs(page: Page, user: string) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user, PASSWORD);
}
