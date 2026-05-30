import { test, expect, Locator } from '@playwright/test';
import { generateOrderCode } from '../suport/helpers';

// Arrange — preparar estado e dados do teste
const URL_BASE = 'http://localhost:5173/lookup';
const ORDER_ID = 'VLO-7KQ2P8';

let searchInput: Locator;
let searchButton: Locator;

test.describe("Consulta de Pedidos", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL_BASE);
    searchInput = page.getByTestId('search-order-id');
    searchButton = page.getByTestId('search-order-button');
    await expect(searchInput).toBeVisible();
  })

  async function searchOrder(orderId: string) {
    await searchInput.fill(orderId);
    await searchButton.click();
  }

  test('Deve consultar um pedido Aprovado', async ({ page }) => {
    // Act — executar a ação sob teste
    await searchOrder(ORDER_ID);

    // Assert — verificar o resultado
    const orderResult = page.getByTestId(`order-result-${ORDER_ID}`);
    await expect(orderResult).toBeVisible({ timeout: 10000 });
    await expect(orderResult).toContainText('APROVADO');
  });

  test('Deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {
    // Act — executar a ação sob teste
    await searchOrder(generateOrderCode());

    // Assert — verificar o resultado
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);
  });
})
