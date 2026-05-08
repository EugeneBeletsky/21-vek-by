import { Page } from '@playwright/test';
import BasePage from '../BasePage';
import { BasketItemList } from './components/BasketItemList';
import { OrderTotal } from './components/OrderTotal';

export class OrderPage extends BasePage {
  public readonly basketItems: BasketItemList;
  public readonly orderTotal: OrderTotal;

  constructor(page: Page) {
    super(page);
    this.basketItems = new BasketItemList(page.getByTestId('basket-container'));
    this.orderTotal = new OrderTotal(page.getByTestId('order-total-container'));
  }

  async waitForBasket(): Promise<void> {
    await this.basketItems.expectVisible();
  }

  async waitForTotal(): Promise<void> {
    await this.orderTotal.expectVisible();
  }

  async waitForPromoCodesResponse() {
    await this.page.waitForResponse('https://gate.21vek.by/cart/carts/promo-codes');
  }
}