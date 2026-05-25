import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export class CatalogQuickFilters extends BaseComponent {
  private readonly links = this.element.getByRole('link');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async selectFilter(name: string): Promise<void> {
    await this.links.filter({ hasText: name }).first().click();
  }

  // --- Getters ---

  async getFilterNames(): Promise<string[]> {
    const all = await this.links.all();
    const texts = await Promise.all(all.map(link => link.textContent()));
    return texts.filter((t): t is string => t !== null).map(t => t.trim());
  }

  // --- Assertions ---

  async expectFilterVisible(name: string): Promise<void> {
    await expect(this.links.filter({ hasText: name }).first()).toBeVisible();
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }
}
