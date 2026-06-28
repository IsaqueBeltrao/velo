import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../suport/helpers'
import { OrderLockupPage, OrderDetails } from '../suport/pages/OrderLookupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-0F2H3N',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Isaque Teste Teste QA',
        email: 'isaqueteste@gmaiil.com'
      },
      payment: 'À Vista'
    } as const

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-VZ9Z46',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Peter Parker',
        email: 'spiderman@gmail.com'
      },
      payment: 'À Vista'
    } as const

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-RUSMVS',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Bruce Batman',
        email: 'morcegao@gmail.com'
      },
      payment: 'À Vista'
    } as const

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })

  test('deve exibir mensagem quando o código do pedido esta fora do padrão', async ({ page }) => {
    const order = "abc123-XPTO"

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)

    // Assert
    await orderLockupPage.validadeOrderNotFound()
  })
})