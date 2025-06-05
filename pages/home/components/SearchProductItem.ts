import BaseComponent from '../../components/BaseComponent';
import { Page, Locator } from '@playwright/test';


export class SearchProductItem extends BaseComponent {
  private searchProductList = this.page.getByTestId('search-result-product-list');
  private productItem = this.searchProductList.locator('.style_product__xVGB6');
  private addToCartButton = this.productItem.getByRole('button', { name: 'Добавить в корзину' });
  private itemPriceBlock = this.productItem.getByTestId('card-price');
  private itemPriceFinal = this.itemPriceBlock.getByTestId('card-current-price');
  private itemInfo = this.productItem.getByTestId('card-info');
  
  
  constructor(page: Page) {
    super(page);
  }

  async waitForSearchResult() {
    await this.searchProductList.waitFor({ state: 'visible' });
  }

  async getAllItems(): Promise<Locator[]> {
    return this.productItem.all();
  }
  
  async getItemsByName(name: string): Promise<Locator> {
    return this.productItem.filter({ hasText: name });
  }
  
  async getItemByIndex(index: number): Promise<Locator> {
    return this.productItem.nth(index);
  }
  
  async getItemPrice(searchBy: string|number): Promise<number> {
    let item: Locator;
    if (typeof searchBy === 'string') {
      item = await this.getItemsByName(searchBy);
    } else {
      item = await this.getItemByIndex(searchBy);
    }
    let priceText = await item.getByTestId('card-current-price').textContent();
    let price = Number(priceText?.replace(/[^\d,]/g, '').replace(',', '.'));
    return price;
  }
  
  async getItemInfo(searchBy: string|number): Promise<string | null> {
    let item: Locator;
    if (typeof searchBy === 'string') {
      item = await this.getItemsByName(searchBy);
    } else {
      item = await this.getItemByIndex(searchBy);
    }
    let info = await item.getByTestId('card-info').textContent();
    return info;
  }
    
  async getAllPrices(): Promise<number[]> {
    let items = await this.getAllItems();
    let prices = await Promise.all(items.map(async (item) => {
      let priceText = await item.getByTestId('card-current-price').textContent();
      return Number(priceText?.replace(/[^\d,]/g, '').replace(',', '.'));
    }));
    return prices;
  }

  async getAllInfo() {
    let items = await this.getAllItems();
    let info = await Promise.all(items.map(async (item) => {
      return await item.getByTestId('card-info').textContent();
    }));
    return info;
  }
}