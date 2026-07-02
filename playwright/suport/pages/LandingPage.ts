import { Page, expect } from '@playwright/test'


export class LandingPage {
  constructor(private page: Page) { }

  async open() {
    await this.page.goto('/')
    const title = await this.page.title()
    expect(title).toBe('Velô by Papito')
  }

}
