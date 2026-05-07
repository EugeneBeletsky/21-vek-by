import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';
import { parsePrice } from '../../../utils/parsePrice';

export class ProductCard extends BaseComponent {
  private readonly price = this.element.getByTestId('card-current-price');
  private readonly oldPrice = this.element.getByTestId('card-old-price');
  private readonly info = this.element.getByTestId('card-info');
  private readonly rating = this.element.getByTestId('card-rating-value');
  private readonly reviewCount = this.element.getByTestId('card-review-count');
  private readonly cartButton = this.element.getByTestId('card-basket-action');
  private readonly comparisonButton = this.element.getByTestId('card-comparison');
  private readonly favoritesButton = this.element.getByTestId('card-favorites');
  private readonly monthlyPayment = this.element.getByTestId('card-monthly-payment');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async addToCart(): Promise<void> {
    await this.cartButton.click();
  }

  async addToFavorites(): Promise<void> {
    await this.favoritesButton.click();
  }

  async addToComparison(): Promise<void> {
    await this.comparisonButton.click();
  }

  // --- Getters ---

  async getPrice(): Promise<number> {
    return parsePrice(await this.price.textContent());
  }

  async getOldPrice(): Promise<number> {
    return parsePrice(await this.oldPrice.textContent());
  }

  async getInfo(): Promise<string | null> {
    return this.info.textContent();
  }

  async getRating(): Promise<string | null> {
    return this.rating.textContent();
  }

  async getReviewCount(): Promise<string | null> {
    return this.reviewCount.textContent();
  }

  async getCartButtonText(): Promise<string | null> {
    return this.cartButton.textContent();
  }

  // --- Assertions ---

  async expectInCart(): Promise<void> {
    await expect(this.cartButton).toContainText('В корзине');
  }

  async expectPriceGreaterThan(min: number): Promise<void> {
    const price = await this.getPrice();
    expect(price).toBeGreaterThan(min);
  }

  async expectInfoContains(text: string): Promise<void> {
    const info = await this.getInfo();
    expect(info?.toLowerCase()).toContain(text.toLowerCase());
  }
}