import { Page } from '@playwright/test';
import BasePage from '../BasePage';
import { BasketItemList } from './components/BasketItemList';

export class OrderPage extends BasePage {
  public readonly basketItems: BasketItemList;

  constructor(page: Page) {
    super(page);
    this.basketItems = new BasketItemList(page.getByTestId('basket-container'));
  }

  async waitForBasket(timeout = 10000): Promise<void> {
    await this.basketItems.waitForResults(timeout);
  }
}

