import { test } from '@playwright/test'
import { generateOrderCode } from '../suport/helpers'
import { HeaderComponent } from '../suport/components/HeaderComponent'
import { LandingPage } from '../suport/pages/LandingPage'
import { OrderLookupPage, OrderDetails } from '../suport/pages/OrderLookupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  let orderLookupPage: OrderLookupPage

  test.beforeEach(async ({ page }) => {
    const landingPage = new LandingPage(page)
    await landingPage.open()

    const header = new HeaderComponent(page)
    await header.orderLockupLink()

    orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.assertLoaded()
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
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.validateOrderDetails(order)
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
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.validateOrderDetails(order)
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
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    // Act
    await orderLookupPage.searchOrder(order)

    // Assert
    await orderLookupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido esta fora do padrão', async ({ page }) => {
    const order = "abc123-XPTO"

    // Act
    await orderLookupPage.searchOrder(order)

    // Assert
    await orderLookupPage.validateOrderNotFound()
  })
})
