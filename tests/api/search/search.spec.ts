import { test, expect } from '../../../fixtures/api.fixture';
import { parsePrice } from '../../../utils/parsePrice';

type SuggestItem = {
  type: string;
  name: string;
  url?: string;
  product_id?: string;
  image?: string;
  price?: string;
  price_without_discount?: string | null;
  id?: string;
  category_id?: string;
  is_adult?: boolean;
};

type SuggestGroup = {
  group_type: string;
  items: SuggestItem[];
};

type SearchProductCase = {
  query: string;
  expected: {
    name: string;
    url: string;
    productId: string;
    categoryId: string;
    price: string;
    priceWithoutDiscount: string;
    isAdult: boolean;
  };
};

const products: SearchProductCase[] = [
  {
    query: 'Телевизор LG 55" OLED AI B4 OLED55B4RLA (OLED)',
    expected: {
      name: 'Телевизор LG 55" OLED AI B4 OLED55B4RLA (OLED)',
      url: '/tv/55oledaib4oled55b4rla_lg_8932740.html',
      productId: '8.932.740',
      categoryId: '111',
      price: '4 179,00 р.', //harcoded value that can be dynamically changed
      priceWithoutDiscount: '5 559,00 р.', //harcoded value that can be dynamically changed
      isAdult: false,
    },
  },
  {
    query: 'Смартфон Apple iPhone 17 Pro 256GB (космический оранжевый)',
    expected: {
      name: 'Смартфон Apple iPhone 17 Pro 256GB (космический оранжевый)',
      url: '/mobile/iphone17pro256gb_apple_10019147.html',
      productId: '10.019.147',
      categoryId: '99',
      price: '5 299,00 р.', //harcoded value that can be dynamically changed
      priceWithoutDiscount: '6 099,00 р.', //harcoded value that can be dynamically changed
      isAdult: false,
    },
  },
  {
    query: 'Холодильник с морозильником LG DoorCooling+ GA-B509CMQM',
    expected: {
      name: 'Холодильник с морозильником LG DoorCooling+ GA-B509CMQM',
      url: '/refrigerators/doorcolinggab509cmqm_lg.html',
      productId: '6.353.906',
      categoryId: '24',
      price: '2 599,00 р.', //harcoded value that can be dynamically changed
      priceWithoutDiscount: '2 739,14 р.', //harcoded value that can be dynamically changed
      isAdult: false,
    },
  },
];

function getProductsGroup(groups: SuggestGroup[]): SuggestGroup {
  const productsGroup = groups.find(group => group.group_type === 'products');
  expect(productsGroup).toBeTruthy();
  return productsGroup!;
}

test.describe('API: [Search]', () => {
  for (const { query, expected } of products) {
    test(
      `T1 [Search] product suggest contains expected data for "${expected.name}"`,
      { tag: ['@api', '@regression', '@P1'] },
      async ({ authCatalog }) => {
        const searchResponse = await authCatalog.searchSuggest(query);
        expect(searchResponse.ok()).toBeTruthy();
        expect(searchResponse.status()).toBe(200);

        const searchBody = await searchResponse.json();
        expect(searchBody.request).toBe(query);
        expect(searchBody.total).toBeGreaterThan(0);

        const productsGroup = getProductsGroup(searchBody.data);
        const product = productsGroup.items.find(item => item.type === 'product' && item.name === expected.name);

        expect(product).toBeTruthy();
        expect(typeof product).toBe('object');

        //only if static hardcoded values
        // expect(product).toMatchObject({
        //   type: 'product',
        //   name: expected.name,
        //   url: expected.url,
        //   product_id: expected.productId,
        //   price: expected.price,
        //   price_without_discount: expected.priceWithoutDiscount,
        //   category_id: expected.categoryId,
        //   is_adult: expected.isAdult,
        // });

        expect(product?.type).toBe('product');
        expect(product?.name).toBe(expected.name);
        expect(product?.url).toBe(expected.url);
        expect(product?.product_id).toBe(expected.productId);
        expect(parsePrice(product?.price ?? null)).toBeGreaterThan(1000);
        expect(parsePrice(product?.price_without_discount ?? null)).toBeGreaterThan(1000);
        expect(product?.category_id).toBe(expected.categoryId);
        expect(product?.is_adult).toBe(expected.isAdult);
        expect(product?.id).toBeTruthy();
        expect(product?.image).toBeTruthy();
      },
    );
  }
});
