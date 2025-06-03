// pages/components/HeaderComponent.ts
import BaseComponent from '../../components/BaseComponent';
import { Page, Locator } from '@playwright/test';

export default class Header extends BaseComponent {
  readonly search: Search;

  constructor(page: Page) {
    super(page);
    this.search = new Search(page);
  }
}

export class Search extends BaseComponent {
  private searchInput = this.page.locator('input#catalogSearch');
  private searchButton = this.page.locator('button.Search_searchBtn__Tk7Gw');
  private searchResults = this.page.locator('.SearchSuggestList_listContainer__v7wVv');

  constructor(page: Page) {
    super(page);
  }

  async typeSearch(query: string) {
    await this.searchInput.fill(query);
  }

  async clickSearch() {
    await this.searchButton.waitFor({ state: 'visible' });
    await this.searchButton.click();
  }

  async searchItem(item: string) {
    await this.typeSearch(item);
    await this.searchInput.click();
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState();
    await this.clickSearch();
  }

  async searchByList(item: string) {
    await this.typeSearch(item);
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState();
    let searchResults = await this.getSearchResults();
    for (let result of searchResults) {
      if (await result.textContent() === item) {
        await result.click();
        break;
      }
    }
  }

  async isVisible(): Promise<boolean> {
    return this.searchInput.isVisible();
  }

  async getSearchResults(): Promise<Locator[]> {
    return this.searchResults.all();
  }
  
}