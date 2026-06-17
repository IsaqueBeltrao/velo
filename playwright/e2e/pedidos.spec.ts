import { test, expect, Locator } from '@playwright/test';
import { generateOrderCode } from '../suport/helpers';

// Arrange — preparar estado e dados do teste
const URL_BASE = 'http://localhost:5173/lookup';

const order = {
  approved: {
    id: 'VLO-0F2H3N',
    status: 'APROVADO',
    color: 'Lunar White',
    wheelType: 'aero Wheels',
    name: 'Isaque Teste Teste QA',
    email: 'isaqueteste@gmaiil.com',
    payment: 'À Vista',

  },
  rejected: {
    id: 'VLO-VZ9Z46',
    status: 'REPROVADO',
    color: 'Midnight Black',
    wheelType: 'sport Wheels',
    name: 'Peter Parker',
    email: 'spiderman@gmail.com',
    payment: 'À Vista',
  },
  analysis: {
    id: 'VLO-RUSMVS',
    status: 'EM_ANALISE',
    color: 'Lunar White',
    wheelType: 'sport Wheels',
    name: 'Bruce Batman',
    email: 'morcegao@gmail.com',
    payment: 'À Vista',
  },
}
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
    await searchOrder(order.approved.id);
    // Assert — verificar o resultado
    await expect(page.getByTestId(`order-result-${order.approved.id}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.approved.id}
    - img
    - text: APROVADO
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.approved.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.approved.wheelType}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.approved.name}
    - paragraph: Email
    - paragraph: ${order.approved.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.approved.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    // const statusBadge = page.getByRole('status', {name: 'APROVADO'});
    // await expect(statusBadge).toHaveClass('bg-green-100');

  });

  test('Deve consultar um pedido Reprovado', async ({ page }) => {
    // Act — executar a ação sob teste
    await searchOrder(order.rejected.id);
    // Assert — verificar o resultado
    await expect(page.getByTestId(`order-result-${order.rejected.id}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.rejected.id}
    - img
    - text: REPROVADO
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.rejected.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.rejected.wheelType}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.rejected.name}
    - paragraph: Email
    - paragraph: ${order.rejected.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.rejected.payment}
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

  test('Deve consultar um pedido em análise', async ({ page }) => {
    // Act — executar a ação sob teste
    await searchOrder(order.analysis.id);
    // Assert — verificar o resultado
    await expect(page.getByTestId(`order-result-${order.analysis.id}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.analysis.id}
    - img
    - text: EM_ANALISE
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.analysis.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.analysis.wheelType}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.analysis.name}
    - paragraph: Email
    - paragraph: ${order.analysis.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.analysis.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);
  });
})
