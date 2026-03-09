import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';


export class SearchProductItem extends BaseComponent {
  private searchProductList = this.element;
  private productItem = this.searchProductList.locator('.style_product__xVGB6');
  private addToCartButton = this.productItem.getByRole('button', { name: 'Добавить в корзину' });
  private itemPriceBlock = this.productItem.getByTestId('card-price');
  private itemPriceFinal = this.itemPriceBlock.getByTestId('card-current-price');
  private itemInfo = this.productItem.getByTestId('card-info');
  
  
  constructor(element: Locator) {
    super(element);
  }

  async waitForSearchResult() {
    await this.searchProductList.waitFor({ state: 'visible', timeout: 10000 });
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
    const page = this.element.page();
    const itemsWithPrice = this.productItem.filter({ has: page.getByTestId('card-current-price') });
    const items = await itemsWithPrice.all();
    const prices = await Promise.all(items.map(async (item) => {
      const priceText = await item.getByTestId('card-current-price').textContent();
      return Number(priceText?.replace(/[^\d,]/g, '').replace(',', '.'));
    }));
    return prices;
  }

  async getAllInfo() {
    const page = this.element.page();
    const itemsWithInfo = this.productItem.filter({ has: page.getByTestId('card-info') });
    const items = await itemsWithInfo.all();
    const info = await Promise.all(items.map(async (item) => {
      return await item.getByTestId('card-info').textContent();
    }));
    return info;
  }

  async addToCart(index: number): Promise<void> {
    await this.addToCartButton.nth(index).click();
  }
}