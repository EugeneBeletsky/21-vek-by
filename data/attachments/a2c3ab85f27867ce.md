# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/search/search.spec.ts >> API: [Search] >> T1 [Search] product suggest contains expected data for "Смартфон Apple iPhone 17 Pro 256GB (космический оранжевый)"
- Location: tests/api/search/search.spec.ts:82:5

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 1000
Received:   0
```

# Test source

```ts
  16  | 
  17  | type SuggestGroup = {
  18  |   group_type: string;
  19  |   items: SuggestItem[];
  20  | };
  21  | 
  22  | type SearchProductCase = {
  23  |   query: string;
  24  |   expected: {
  25  |     name: string;
  26  |     url: string;
  27  |     productId: string;
  28  |     categoryId: string;
  29  |     price: string;
  30  |     priceWithoutDiscount: string;
  31  |     isAdult: boolean;
  32  |   };
  33  | };
  34  | 
  35  | const products: SearchProductCase[] = [
  36  |   {
  37  |     query: 'Телевизор LG 55" OLED AI B4 OLED55B4RLA (OLED)',
  38  |     expected: {
  39  |       name: 'Телевизор LG 55" OLED AI B4 OLED55B4RLA (OLED)',
  40  |       url: '/tv/55oledaib4oled55b4rla_lg_8932740.html',
  41  |       productId: '8.932.740',
  42  |       categoryId: '111',
  43  |       price: '4 179,00 р.', //harcoded value that can be dynamically changed
  44  |       priceWithoutDiscount: '5 559,00 р.', //harcoded value that can be dynamically changed
  45  |       isAdult: false,
  46  |     },
  47  |   },
  48  |   {
  49  |     query: 'Смартфон Apple iPhone 17 Pro 256GB (космический оранжевый)',
  50  |     expected: {
  51  |       name: 'Смартфон Apple iPhone 17 Pro 256GB (космический оранжевый)',
  52  |       url: '/mobile/iphone17pro256gb_apple_10019147.html',
  53  |       productId: '10.019.147',
  54  |       categoryId: '99',
  55  |       price: '5 299,00 р.', //harcoded value that can be dynamically changed
  56  |       priceWithoutDiscount: '6 099,00 р.', //harcoded value that can be dynamically changed
  57  |       isAdult: false,
  58  |     },
  59  |   },
  60  |   {
  61  |     query: 'Холодильник с морозильником LG DoorCooling+ GA-B509CMQM',
  62  |     expected: {
  63  |       name: 'Холодильник с морозильником LG DoorCooling+ GA-B509CMQM',
  64  |       url: '/refrigerators/doorcolinggab509cmqm_lg.html',
  65  |       productId: '6.353.906',
  66  |       categoryId: '24',
  67  |       price: '2 599,00 р.', //harcoded value that can be dynamically changed
  68  |       priceWithoutDiscount: '2 739,14 р.', //harcoded value that can be dynamically changed
  69  |       isAdult: false,
  70  |     },
  71  |   },
  72  | ];
  73  | 
  74  | function getProductsGroup(groups: SuggestGroup[]): SuggestGroup {
  75  |   const productsGroup = groups.find(group => group.group_type === 'products');
  76  |   expect(productsGroup).toBeTruthy();
  77  |   return productsGroup!;
  78  | }
  79  | 
  80  | test.describe('API: [Search]', () => {
  81  |   for (const { query, expected } of products) {
  82  |     test(
  83  |       `T1 [Search] product suggest contains expected data for "${expected.name}"`,
  84  |       { tag: ['@api', '@regression', '@P1'] },
  85  |       async ({ authCatalog }) => {
  86  |         const searchResponse = await authCatalog.searchSuggest(query);
  87  |         expect(searchResponse.ok()).toBeTruthy();
  88  |         expect(searchResponse.status()).toBe(200);
  89  | 
  90  |         const searchBody = await searchResponse.json();
  91  |         expect(searchBody.request).toBe(query);
  92  |         expect(searchBody.total).toBeGreaterThan(0);
  93  | 
  94  |         const productsGroup = getProductsGroup(searchBody.data);
  95  |         const product = productsGroup.items.find(item => item.type === 'product' && item.name === expected.name);
  96  | 
  97  |         expect(product).toBeTruthy();
  98  |         expect(typeof product).toBe('object');
  99  | 
  100 |         //only if static hardcoded values
  101 |         // expect(product).toMatchObject({
  102 |         //   type: 'product',
  103 |         //   name: expected.name,
  104 |         //   url: expected.url,
  105 |         //   product_id: expected.productId,
  106 |         //   price: expected.price,
  107 |         //   price_without_discount: expected.priceWithoutDiscount,
  108 |         //   category_id: expected.categoryId,
  109 |         //   is_adult: expected.isAdult,
  110 |         // });
  111 | 
  112 |         expect(product?.type).toBe('product');
  113 |         expect(product?.name).toBe(expected.name);
  114 |         expect(product?.url).toBe(expected.url);
  115 |         expect(product?.product_id).toBe(expected.productId);
> 116 |         expect(parsePrice(product?.price ?? null)).toBeGreaterThan(1000);
      |                                                    ^ Error: expect(received).toBeGreaterThan(expected)
  117 |         expect(parsePrice(product?.price_without_discount ?? null)).toBeGreaterThan(1000);
  118 |         expect(product?.category_id).toBe(expected.categoryId);
  119 |         expect(product?.is_adult).toBe(expected.isAdult);
  120 |         expect(product?.id).toBeTruthy();
  121 |         expect(product?.image).toBeTruthy();
  122 |       },
  123 |     );
  124 |   }
  125 | });
  126 | 
```