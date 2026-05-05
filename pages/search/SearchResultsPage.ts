import { Page } from '@playwright/test';
import BasePage from '../BasePage';
import { SearchProductList } from './components/SearchProductList';

export class SearchResultsPage extends BasePage {
  public readonly products: SearchProductList;

  constructor(page: Page) {
    super(page);
    this.products = new SearchProductList(page.getByTestId('search-result-product-list'));
  }

  async waitForResults(timeout = 10000): Promise<void> {
    await this.products.waitForResults(timeout);
  }
}

