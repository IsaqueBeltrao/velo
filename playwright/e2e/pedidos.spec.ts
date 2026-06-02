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
    await expect(page.getByTestId(`order-result-${ORDER_ID}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${ORDER_ID}
    - img
    - text: APROVADO
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: Lunar White
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: aero Wheels
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: Isaque Teste Teste QA
    - paragraph: Email
    - paragraph: isaqueteste@gmaiil.com
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: À Vista
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);
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
