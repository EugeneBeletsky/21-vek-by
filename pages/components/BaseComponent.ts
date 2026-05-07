import { Locator, expect } from '@playwright/test';

export default class BaseComponent {
  protected readonly element: Locator;

  constructor(element: Locator) {
    this.element = element;
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.element).toBeHidden();
  }

  async isVisible(): Promise<boolean> {
    return this.element.isVisible();
  }

  async waitForVisible(timeout = 10_000): Promise<void> {
    await this.element.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(timeout = 10_000): Promise<void> {
    await this.element.waitFor({ state: 'hidden', timeout });
  }
}
