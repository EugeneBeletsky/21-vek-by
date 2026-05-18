import { APIRequestContext, APIResponse } from '@playwright/test';
import { URLSearchParams } from 'node:url';

type CartItemType = 'product';

type CartUserData = {
  email: string;
  name?: string;
  phone?: string;
};

type DeliveryDetailsParams = {
  cityId?: number;
  xCoordinate?: number;
  yCoordinate?: number;
};

export class CartClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getCart(): Promise<APIResponse> {
    return this.request.get('/cart/carts');
  }

  async getCartInfo(): Promise<APIResponse> {
    return this.request.get('/cart/carts/info');
  }

  async addItem(productId: number, count = 1, type: CartItemType = 'product'): Promise<APIResponse> {
    return this.request.post('/cart/carts/items', {
      data: {
        id: productId,
        type,
        count,
      },
    });
  }

  async deleteItem(itemId: string): Promise<APIResponse> {
    return this.request.delete(`/cart/carts/items/${itemId}`);
  }

  async updateUser(data: CartUserData): Promise<APIResponse> {
    return this.request.patch('/cart/carts/user', { data });
  }

  async getDeliveryDetails({
    cityId = 17030,
    xCoordinate = 53.928218,
    yCoordinate = 27.491594,
  }: DeliveryDetailsParams = {}): Promise<APIResponse> {
    const params = new URLSearchParams({
      'filter[cityId]': String(cityId),
      'filter[xCoordinate]': String(xCoordinate),
      'filter[yCoordinate]': String(yCoordinate),
    });

    return this.request.get(`/cart/v3/delivery/details?${params.toString()}`);
  }

  async clearCart(): Promise<void> {
    const response = await this.getCart();
    if (!response.ok()) return;

    const cart = await response.json();
    const items = cart.data?.items ?? [];

    for (const item of items) {
      await this.deleteItem(item.id);
    }
  }
}
