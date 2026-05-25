import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export type DeliveryTerm = 'doesnt_matter' | 'today_or_tomorrow' | 'up_to_5_days';

export class CatalogFilters extends BaseComponent {
  private readonly sortSelectBlock = this.element.getByTestId('sortSelectBlock');
  private readonly priceFilter = this.element.getByTestId('priceFilter');
  private readonly priceFrom = this.priceFilter.getByTestId('multi-select-from-');
  private readonly priceTo = this.priceFilter.getByTestId('multi-select-to-');
  private readonly deliveryTerms = this.element.getByTestId('short-delivery-terms');
  private readonly producerBlock = this.element.getByTestId('producerBlock');
  private readonly expandFiltersButton = this.element.getByTestId('expand-products-filters');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async setPriceFrom(price: number): Promise<void> {
    await this.priceFrom.fill(String(price));
    await this.priceFrom.press('Enter');
  }

  async setPriceTo(price: number): Promise<void> {
    await this.priceTo.fill(String(price));
    await this.priceTo.press('Enter');
  }

  async setPriceRange(from: number, to: number): Promise<void> {
    await this.setPriceFrom(from);
    await this.setPriceTo(to);
  }

  async selectDeliveryTerm(term: DeliveryTerm): Promise<void> {
    await this.element.getByTestId(`delivery-term-${term}`).click();
  }

  /**
   * Clicks a producer filter button by slug (e.g. 'samsung', 'lg', 'xiaomi').
   * The slug corresponds to the `producer-<slug>` data-testid on the button.
   */
  async selectProducer(slug: string): Promise<void> {
    await this.element.getByTestId(`producer-${slug.toLowerCase()}`).click();
  }

  async expandAllFilters(): Promise<void> {
    await this.expandFiltersButton.click();
  }

  // --- Assertions ---

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectPriceFilterVisible(): Promise<void> {
    await expect(this.priceFilter).toBeVisible();
  }

  async expectProducerVisible(slug: string): Promise<void> {
    await expect(this.element.getByTestId(`producer-${slug.toLowerCase()}`)).toBeVisible();
  }

  async expectDeliveryTermsVisible(): Promise<void> {
    await expect(this.deliveryTerms).toBeVisible();
  }
}
