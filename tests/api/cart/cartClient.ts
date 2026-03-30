import { APIRequestContext, APIResponse } from '@playwright/test';

export class CartClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getCart(): Promise<APIResponse> {
    return this.request.get('/cart/carts');
  }

  async deleteItem(itemId: string): Promise<APIResponse> {
    return this.request.delete(`/cart/carts/items/${itemId}`);
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
