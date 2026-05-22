import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test('webapp deve estar online', async ({ page }) => {
  // Act — acessar a aplicação
  await page.goto(BASE_URL);

  // Assert — verificar que a aplicação respondeu
  await expect(page).toHaveTitle(/Velô/);
});
