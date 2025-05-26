// pages/components/HeaderComponent.ts
import BaseComponent from '../../components/BaseComponent';
import { Page } from '@playwright/test';

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

  constructor(page: Page) {
    super(page);
  }

  async typeSearch(query: string) {
    await this.searchInput.fill(query);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async search(query: string) {
    await this.typeSearch(query);
    await this.clickSearch();
  }

  async isVisible(): Promise<boolean> {
    return this.searchInput.isVisible();
  }
  
}