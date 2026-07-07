import { Page } from '@playwright/test'

export class HeaderComponent {
  constructor(private page: Page) { }

  async orderLockupLink() {
    await this.page.getByRole('link', { name: 'Consultar Pedido' }).click()
  }
}
