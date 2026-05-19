import { Page } from '@playwright/test';
import BasePage from '../BasePage';
import { SearchProductList } from './components/SearchProductList';
import { FloaterModal } from './components/FloaterModal';

export class SearchResultsPage extends BasePage {
  public readonly products: SearchProductList;
  public readonly floaterModal: FloaterModal;

  constructor(page: Page) {
    super(page);
    this.products = new SearchProductList(page.getByTestId('search-result-product-list'));
    this.floaterModal = new FloaterModal(page.getByTestId('floater'));
  }

  async waitForResults(timeout = 30_000): Promise<void> {
    await this.products.waitForVisible(timeout);
    await this.floaterModal.acceptIfVisible();
  }
}
