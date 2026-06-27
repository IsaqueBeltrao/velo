import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test('webapp deve estar online', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle(/Velô/);
});
