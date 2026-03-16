import BaseComponent from '../components/BaseComponent';
import { Locator } from '@playwright/test';

export class ProductCard extends BaseComponent {
  readonly price = this.element.getByTestId('card-current-price');
  readonly oldPrice = this.element.getByTestId('card-old-price');
  readonly info = this.element.getByTestId('card-info');
  readonly rating = this.element.getByTestId('card-rating-value');
  readonly reviewCount = this.element.getByTestId('card-review-count');
  readonly cartButton = this.element.getByTestId('card-basket-action');
  readonly comparisonButton = this.element.getByTestId('card-comparison');
  readonly favoritesButton = this.element.getByTestId('card-favorites');
  readonly monthlyPayment = this.element.getByTestId('card-monthly-payment');

  constructor(element: Locator) {
    super(element);
  }

  async getPrice(): Promise<number> {
    const text = await this.price.textContent();
    return Number(text?.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  async getOldPrice(): Promise<number> {
    const text = await this.oldPrice.textContent();
    return Number(text?.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  async getInfo(): Promise<string | null> {
    return this.info.textContent();
  }

  async getRating(): Promise<string | null> {
    return this.rating.textContent();
  }

  async addToCart(): Promise<void> {
    await this.cartButton.click();
  }

  async getCartButtonText(): Promise<string | null> {
    return this.cartButton.textContent();
  }

  async addToFavorites(): Promise<void> {
    await this.favoritesButton.click();
  }

  async addToComparison(): Promise<void> {
    await this.comparisonButton.click();
  }
}
