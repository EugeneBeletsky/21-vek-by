import BaseComponent from '../../components/BaseComponent';
import { Item } from './Item';
import { expect } from '@playwright/test';

export class SearchProductItemNEW extends BaseComponent {
  private productItem = this.element.locator('.style_product__xVGB6');
  private addToCartButton = this.element.getByRole('button', { name: 'Добавить в корзину' });
  private itemPriceBlock = this.element.getByTestId('card-price');
  private itemPriceFinal = this.element.getByTestId('card-current-price');
  private itemInfo = this.element.getByTestId('card-info');
  
  async waitForSearchResult(): Promise<void> {
    await this.element.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getItems() {
    const count = await this.productItem.count();
    if (count === 0) {
      throw new Error('Cannot find elements on the page with locator: .style_product__xVGB6');
    }
    let elements: Item[] = [];
    for (let i = 0; i < count; i++) {
      elements.push(new Item(this.productItem.nth(i)));
    }
    return elements;
  }

  async addToCart(searchBy: number): Promise<void> {
    let items = await this.getItems();
    let item = items[searchBy];
    await (await item?.getAddToCartButton()).click();
  }

  async checkItemPrice(searchBy: number, price: number): Promise<void> {
    let items = await this.getItems();
    let item = items[searchBy];
    let itemPrice = await item?.getItemPrice();
    expect(itemPrice).toBe(price);
  }

  async checkItemInfo(searchBy: number, info: string): Promise<void> {
    let items = await this.getItems();
    let item = items[searchBy];
    let itemInfo = await item?.getItemInfo();
    expect(itemInfo).toContain(info);
  }

  async checkAllPrices(price: number): Promise<void> {
    let items = await this.getItems();
    let itemPrices = await Promise.all(items.map(async (item) => {
      return await item?.getAllPrices();
    }));
    console.log(itemPrices);
    expect(itemPrices).toBeGreaterThan(price);
  } 

  async checkAllInfo(info: string): Promise<void> {
    let items = await this.getItems();
    let itemInfo = await Promise.all(items.map(async (item) => {
      return await item?.getAllInfo();
    }));
    console.log(itemInfo);
    expect(itemInfo).toContain(info);
  }


}