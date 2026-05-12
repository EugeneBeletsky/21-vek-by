import { Page } from '@playwright/test';
import BasePage from '../BasePage';
import { BasketItemList } from './components/BasketItemList';
import { OrderTotal } from './components/OrderTotal';
import { PartleyPayOrderModal } from './components/PartlyPayOrderModal';
import { OrderPromocode } from './components/OrderPromocode';
import { DeliveryPage } from './components/DeliveryPage';
import { PaymentPage } from './components/PaymentPage';
import { PrivacyAgreementModal } from './components/PrivacyAgreementModal';

export class OrderPage extends BasePage {
  public readonly basketItems: BasketItemList;
  public readonly orderTotal: OrderTotal;
  public readonly orderModal: PartleyPayOrderModal;
  public readonly orderPromocode: OrderPromocode;
  public readonly deliveryPage: DeliveryPage;
  public readonly paymentPage: PaymentPage;
  public readonly privacyAgreementModal: PrivacyAgreementModal;

  constructor(page: Page) {
    super(page);
    this.basketItems = new BasketItemList(page.getByTestId('basket-container'));
    this.orderTotal = new OrderTotal(page.getByTestId('order-total-container'));
    this.orderModal = new PartleyPayOrderModal(page.getByTestId('partly-pay-offer-modal'));
    this.orderPromocode = new OrderPromocode(page.locator('.Basket_promocode__dBfv4'));
    this.deliveryPage = new DeliveryPage(page.getByTestId('delivery-page'));
    this.paymentPage = new PaymentPage(page.getByTestId('payment-page'));
    this.privacyAgreementModal = new PrivacyAgreementModal(page.getByTestId('modal'));
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

  async waitForDelivery(): Promise<void> {
    await this.expectUrl(/\/order\/\?step=delivery/);
    await this.deliveryPage.expectReady();
  }

  async waitForPayment(): Promise<void> {
    await this.expectUrl(/\/order\/\?step=payment/);
    await this.paymentPage.expectReady();
  }

  async waitForCanceledOrder(): Promise<void> {
    await this.expectUrl(/\/order\/\?step=canceled-order/);
  }
}
