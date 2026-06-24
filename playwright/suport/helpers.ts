import { Page } from '@playwright/test'

export async function searchOrder(page: Page, orderNumber: string) {
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
}

export function generateOrderCode(): string {
  const prefix = 'VLO-'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomSuffix = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomSuffix += characters.charAt(randomIndex)
  }

  return `${prefix}${randomSuffix}`
}
