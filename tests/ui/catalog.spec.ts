import { test, expect } from '../../fixtures/test.fixture';

type QuickFilterCase = {
  title: string;
  filterName: string;
  expectedUrlPart: string;
};

const quickFilterCases: QuickFilterCase[] = [
  {
    title: 'T6 [Catalog] quick filter "4K" navigates to 4K subcategory',
    filterName: '4K',
    expectedUrlPart: '/tv/16062/',
  },
  {
    title: 'T7 [Catalog] quick filter "Smart TV" navigates to Smart TV subcategory',
    filterName: 'Smart TV',
    expectedUrlPart: '/tv/smart_tv/',
  },
  {
    title: 'T8 [Catalog] quick filter "OLED" navigates to OLED subcategory',
    filterName: 'OLED',
    expectedUrlPart: '/tv/oled/',
  },
];

test.describe('[Catalog]', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.open('/tv/');
    await catalogPage.waitForProducts();
    await catalogPage.dismissCookies();
  });

  test(
    'T1 [Catalog] TV page shows heading "Телевизоры" and at least one product',
    { tag: ['@ui', '@smoke', '@P1'] },
    async ({ catalogPage }) => {
      await catalogPage.expectCategoryName('Телевизоры');
      const count = await catalogPage.productList.getItemCount();
      expect(count).toBeGreaterThan(0);
    },
  );

  test(
    'T2 [Catalog] breadcrumbs and related category links are visible',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ catalogPage }) => {
      await catalogPage.expectBreadcrumbsVisible();
      await catalogPage.expectRelatedLinksVisible();
    },
  );

  test(
    'T3 [Catalog] all visible products have a price greater than 0',
    { tag: ['@ui', '@regression', '@P1'] },
    async ({ catalogPage }) => {
      await catalogPage.productList.expectAllPricesGreaterThan(0);
    },
  );

  test(
    'T4 [Catalog] filter panel shows price range, producers, and delivery term controls',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ catalogPage }) => {
      await catalogPage.filters.expectPriceFilterVisible();
      await catalogPage.filters.expectDeliveryTermsVisible();
      await catalogPage.filters.expectProducerVisible('samsung');
    },
  );

  test(
    'T5 [Catalog] pagination navigates to page 2 and loads new products',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ catalogPage }) => {
      await catalogPage.pagination.goToNextPage();
      await catalogPage.expectUrl(/\/tv\/page:2\//);
      await catalogPage.waitForProducts();
      await catalogPage.pagination.expectCurrentPage(2);
    },
  );

  for (const testCase of quickFilterCases) {
    test(
      testCase.title,
      { tag: ['@ui', '@regression', '@P2'] },
      async ({ catalogPage }) => {
        await catalogPage.quickFilters.selectFilter(testCase.filterName);
        await catalogPage.expectUrl(new RegExp(testCase.expectedUrlPart.replace('/', '\\/')));
        await catalogPage.waitForProducts();
      },
    );
  }
});
