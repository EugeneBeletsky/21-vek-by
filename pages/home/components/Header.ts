import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class Header extends BaseComponent {
  public userToolsToggler = this.element.locator('button.styles_userToolsToggler__c2aHe');
  readonly search: Search;

  constructor(element: Locator) {
    super(element);
    this.search = new Search(element);
  }

  async getAccountModal() {
    return this.userToolsToggler;
  }

  async openAccountMenu() {
    await this.userToolsToggler.click();
  }
  
}

export class Search extends BaseComponent {
  private searchInput = this.element.locator('input#catalogSearch');
  private searchButton = this.element.locator('button.Search_searchBtn__Tk7Gw');
  private searchResults = this.element.locator('.SearchSuggestList_listContainer__v7wVv');

  constructor(element: Locator) {
    super(element);
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
    await this.clickSearch();
  }

  async searchByList(item: string) {
    await this.typeSearch(item);
    let searchResults = await this.getSearchResults();
    for (let result of searchResults) {
      if (await result.textContent() === item) {
        await result.click();
        break;
      }
    }
  }

  async getInput(): Promise<Locator> {
    return this.searchInput;
  }

  async getSearchResults(): Promise<Locator[]> {
    return this.searchResults.all();
  }
  
}