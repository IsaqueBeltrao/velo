import { test, expect } from '@playwright/test';

const LOOKUP_URL = 'http://localhost:5173/lookup';
const APPROVED_ORDER_ID = 'VLO-7KQ2P8';

test('Deve consultar um pedido Aprovado', async ({ page }) => {
  // Arrange — preparar estado e dados do teste
  await page.goto(LOOKUP_URL);
  await page.getByTestId('search-order-id').waitFor({ state: 'visible' });

  const searchInput = page.getByTestId('search-order-id');
  const searchButton = page.getByTestId('search-order-button');

  // Act — executar a ação sob teste
  await searchInput.fill(APPROVED_ORDER_ID);
  await searchButton.click();

  // Assert — verificar o resultado
  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
  await expect(page.getByText('Número do Pedido')).toBeVisible();
  await expect(searchInput).toHaveValue(APPROVED_ORDER_ID);

  await expect(page.getByText('Pedido', { exact: true })).toBeVisible();
  await expect(page.getByTestId(`order-result-${APPROVED_ORDER_ID}`)).toContainText('Pedido');
  await expect(page.getByTestId('order-result-id')).toHaveText(APPROVED_ORDER_ID);

  const statusBadge = page.getByTestId('order-result-status');
  await expect(statusBadge).toBeVisible();
  await expect(statusBadge).toContainText('APROVADO');
  await expect(statusBadge).toHaveClass(/bg-green-100/);
  await expect(statusBadge).toHaveClass(/text-green-700/);
});
