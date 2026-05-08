import { Page } from '@playwright/test';
import BasePage from '../BasePage';
import { BasketItemList } from './components/BasketItemList';
import { OrderTotal } from './components/OrderTotal';
import { PartleyPayOrderModal } from './components/PartlyPayOrderModal';
import { OrderPromocode } from './components/OrderPromocode';

export class OrderPage extends BasePage {
  public readonly basketItems: BasketItemList;
  public readonly orderTotal: OrderTotal;
  public readonly orderModal: PartleyPayOrderModal;
  public readonly orderPromocode: OrderPromocode;

  constructor(page: Page) {
    super(page);
    this.basketItems = new BasketItemList(page.getByTestId('basket-container'));
    this.orderTotal = new OrderTotal(page.getByTestId('order-total-container'));
    this.orderModal = new PartleyPayOrderModal(page.getByTestId('partly-pay-offer-modal'));
    this.orderPromocode = new OrderPromocode(page.locator('.Basket_promocode__dBfv4'));
  }

  async waitForBasket(): Promise<void> {
    await this.orderModal.close();
    await this.basketItems.expectVisible();
  }

  async waitForTotal(): Promise<void> {
    await this.orderModal.close();
    await this.orderTotal.expectVisible();
  }

  async waitForPartleyPayOrderModal(): Promise<void> {
    await this.orderModal.expectVisible();
  }

  async waitForPromoCodesResponse() {
    await this.page.waitForResponse('https://gate.21vek.by/cart/carts/promo-codes');
  }
}