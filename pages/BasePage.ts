import { Page, expect } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  public async waitForPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  public async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  public async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  public async click(selector: string): Promise<void> {
    await this.page.click(selector, { timeout: 2000 });
  }

  public async type(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text, { timeout: 2000 });
  }

  public async getText(selector: string): Promise<string> {
    return this.page.locator(selector).innerText();
  }
}