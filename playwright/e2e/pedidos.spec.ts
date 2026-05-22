import { test, expect } from '@playwright/test';

test('Deve consultar um pedido Aprovado', async ({ page }) => {
    await page.goto('http://localhost:5173/lookup');

    //checkpont: verificar se está na página de consulta de pedidos
    await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    
    //checkpoint: verificar se o campo de busca está visível
    await expect(page.getByText('Número do Pedido')).toBeVisible();
    await expect(page.locator('label')).toContainText('Número do Pedido');

    //checkpoint: inserir o número do pedido
    await page.getByTestId('search-order-id').click();
    await page.getByTestId('search-order-id').fill('VLO-7KQ2P8');

    //checkpoint: verificar se o campo de busca está com o valor inserido
    await expect(page.getByTestId('search-order-id')).toHaveValue('VLO-7KQ2P8');

    //checkpoint: clicar no botão de buscar
    await page.getByTestId('search-order-button').click();

    //checkpoint: verificar se o pedido foi encontrado
    await expect(page.getByText('Pedido', { exact: true })).toBeVisible();
    await expect(page.getByTestId('order-result-VLO-7KQ2P8')).toContainText('Pedido');
    await expect(page.getByTestId('order-result-id')).toHaveText('VLO-7KQ2P8');

    //checkpoint: verificar se o pedido foi aprovado
    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
    await expect(page.getByTestId('order-result-status')).toHaveClass(/bg-green-100/);
    await expect(page.getByTestId('order-result-status')).toHaveClass(/text-green-700/);
});