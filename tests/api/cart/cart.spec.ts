import { test, expect } from '../../../fixtures/api.fixture';
import { config } from '../../../utils/config';

type SuggestItem = {
  type: string;
  name: string;
  product_id?: string;
  price?: string;
};

type SuggestGroup = {
  group_type: string;
  items: SuggestItem[];
};

const availableProductQuery = 'horizont 32';
const testPhone = '+375291234567';
const checkoutUserData = {
  email: config.credentials.email!,
  ...(process.env.NAME ? { name: process.env.NAME } : {}),
  phone: testPhone,
};

function toProductCode(productId: string): number {
  return Number(productId.replace(/\D/g, ''));
}

test.describe('API: [Cart]', () => {
  test(
    'T1 [Cart] authenticated user can search product, add it to cart and prepare checkout data',
    { tag: ['@api', '@regression', '@P1'] },
    async ({ authCatalog, authCartClient }) => {
      const searchResponse = await authCatalog.searchSuggest(availableProductQuery);
      expect(searchResponse.ok()).toBeTruthy();
      expect(searchResponse.status()).toBe(200);

      const searchBody = await searchResponse.json();
      const productGroup = searchBody.data.find((group: SuggestGroup) => group.group_type === 'products') as SuggestGroup;
      const product = productGroup.items.find(
        item => item.type === 'product' && item.product_id && item.price?.includes(','),
      );

      expect(product).toBeTruthy();
      expect(product?.name.toLowerCase()).toContain('horizont');

      const productCode = toProductCode(product!.product_id!);
      expect(productCode).toBeGreaterThan(0);

      const addResponse = await authCartClient.addItem(productCode);
      expect(addResponse.status()).toBe(204);
      expect(addResponse.statusText()).toBe('No Content');

      const cartResponse = await authCartClient.getCart();
      expect(cartResponse.ok()).toBeTruthy();
      expect(cartResponse.status()).toBe(200);

      const cart = await cartResponse.json();
      const cartItem = cart.data.items.find((item: { code: number }) => item.code === productCode);
      expect(cartItem).toBeTruthy();
      expect(cartItem.count).toBe(1);
      expect(cartItem.name.toLowerCase()).toContain('horizont');
      expect(cart.data.count.goods).toBeGreaterThan(0);

      const updateUserResponse = await authCartClient.updateUser(checkoutUserData);
      expect(updateUserResponse.status()).toBe(204);

      const deliveryDetailsResponse = await authCartClient.getDeliveryDetails();
      expect(deliveryDetailsResponse.ok()).toBeTruthy();
      expect(deliveryDetailsResponse.status()).toBe(200);

      const deliveryDetails = await deliveryDetailsResponse.json();
      expect(deliveryDetails.data.attributes.courier).toHaveProperty('available');
      expect(deliveryDetails.data.attributes.self).toHaveProperty('available');
    },
  );
});
