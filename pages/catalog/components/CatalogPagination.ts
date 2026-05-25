import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export class CatalogPagination extends BaseComponent {
  // The `pagination` testid is on the <nav> itself, so `this.element` IS the nav.
  // The "next page" link sits outside the <nav>, so it is scoped to the full page.
  private readonly nextPageLink = this.element.page().getByRole('link', { name: 'Следующая страница' });
  private readonly pageButtons = this.element.locator('button');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async goToNextPage(): Promise<void> {
    await this.nextPageLink.click();
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.pageButtons.filter({ hasText: String(pageNumber) }).click();
  }

  // --- Getters ---

  async getCurrentPage(): Promise<number> {
    const allButtons = await this.pageButtons.all();
    for (const btn of allButtons) {
      const classes = (await btn.getAttribute('class')) ?? '';
      const text = (await btn.textContent())?.trim() ?? '';
      if (classes.includes('Pagination-module__active') && /^\d+$/.test(text)) {
        return Number(text);
      }
    }
    return 1;
  }

  // --- Assertions ---

  async expectCurrentPage(pageNumber: number): Promise<void> {
    // Active page is not HTML-disabled; it gets the `Pagination-module__active` class.
    await expect(
      this.pageButtons.filter({ hasText: String(pageNumber) })
    ).toHaveClass(/Pagination-module__active/);
  }

  async expectNextPageVisible(): Promise<void> {
    await expect(this.nextPageLink).toBeVisible();
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }
}
