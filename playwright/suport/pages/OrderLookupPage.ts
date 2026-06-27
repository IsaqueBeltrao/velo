import { Page, expect } from '@playwright/test'

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

export class OrderLockupPage {
  constructor(private page: Page) { }
  async searchOrder(code: string) {
    await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
    await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
  }

  async validateStatusBadge(status: OrderStatus) {
    const statusClasses = {

      APROVADO: {
        bgClass: 'bg-green-100',
        textClass: 'text-green-700',
        iconClass: 'lucide-circle-check-big'
      },
      REPROVADO: {
        bgClass: 'bg-red-100',
        textClass: 'text-red-700',
        iconClass: 'lucide-circle-x'
      },
      EM_ANALISE: {
        bgClass: 'bg-amber-100',
        textClass: 'text-amber-700',
        iconClass: 'lucide-clock'
      }
    } as const

    const statusClass = statusClasses[status]
    const statusBadge = this.page.getByRole('status').filter({ hasText: status })

    await expect(statusBadge).toHaveClass(new RegExp(statusClass.bgClass))
    await expect(statusBadge).toHaveClass(new RegExp(statusClass.textClass))
    await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(statusClass.iconClass))
  }

}