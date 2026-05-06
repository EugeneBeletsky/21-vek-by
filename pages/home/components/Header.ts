import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export default class Header extends BaseComponent {
  private readonly accountToggler = this.element.locator('button.styles_userToolsToggler__c2aHe');
  public readonly search: Search;

  constructor(element: Locator) {
    super(element);
    this.search = new Search(element);
  }

  async openAccountMenu(): Promise<void> {
    await this.accountToggler.waitFor({ state: 'visible', timeout: 10_000 });
    await this.accountToggler.click();
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }
}

export class Search extends BaseComponent {
  private readonly searchInput = this.element.locator('input#catalogSearch');
  private readonly searchButton = this.element.locator('button.Search_searchBtn__Tk7Gw');
  private readonly suggestList = this.element.locator('.SearchSuggestList_listContainer__v7wVv');

  constructor(element: Locator) {
    super(element);
  }

  async searchItem(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.click();
    await this.searchButton.waitFor({ state: 'visible' });
    await this.searchButton.click();
  }

  /**
   * Types query, waits for suggest list, then clicks the exact match.
   * Throws if no matching suggestion is found.
   */
  async searchByExactSuggestion(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.suggestList.waitFor({ state: 'visible' });

    const suggestions = this.suggestList.locator('li');
    const match = suggestions.filter({ hasText: query }).first();
    await match.click();
  }

  async expectSuggestVisible(): Promise<void> {
    await expect(this.suggestList).toBeVisible();
  }
}
