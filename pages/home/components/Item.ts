import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export class Item extends BaseComponent {
  private searchProductList = this.element.getByTestId('search-result-product-list');
  private productItem = this.element.locator('.style_product__xVGB6');
  private addToCartButton = this.element.getByRole('button', { name: 'Добавить в корзину' });
  private itemPriceBlock = this.element.getByTestId('card-price');
  private itemPriceFinal = this.element.getByTestId('card-current-price');
  private itemInfo = this.element.getByTestId('card-info');


  async getAddToCartButton(): Promise<Locator> {
    return await this.addToCartButton;
  }
  
  async getItemPrice(): Promise<number> {
    let price = await this.itemPriceFinal.textContent();
    return Number(price?.replace(/[^\d,]/g, '').replace(',', '.'));
  }
  
  async getItemInfo(): Promise<string | null> {
    let info = await this.itemInfo.textContent();
    return info;
  }

  async getAllPrices(): Promise<number[]> {
    let prices = await this.itemPriceFinal.allTextContents();
    let pricesNumber = prices.map(price => Number(price.replace(/[^\d,]/g, '').replace(',', '.')));
    return pricesNumber;
  }

  async getAllInfo(): Promise<string[]> {
    let info = await this.itemInfo.allTextContents();
    return info;
  }
    
  // async getAllPrices(): Promise<number[]> {
  //   let prices = await Promise.all(this.element.locator(this.itemPriceFinal).all().map(async (item) => {
  //     let priceText = await item.textContent();
  //     return Number(priceText?.replace(/[^\d,]/g, '').replace(',', '.'));
  //   }));
  //   return prices;
  // }

  // async getAllInfo() {
  //   let info = await Promise.all(this.element.locator(this.itemInfo).all().map(async (item) => {
  //     return await item.textContent();
  //   }));
  //   return info;
  // }
}