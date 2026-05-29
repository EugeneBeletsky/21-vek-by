import { test, expect } from '../../fixtures/test.fixture';
import { CatalogPage } from '../../pages/catalog/CatalogPage';

async function applyWaterheaterFilters(catalogPage: CatalogPage): Promise<void> {
  await catalogPage.filters.expandAllFilters();
  await catalogPage.filters.selectProducer('midea');
  await catalogPage.filters.selectAttributeOption('attribute-1421', 'накопительный');
  await catalogPage.filters.selectAttributeOption('attribute-1422', 'электрический');
  await catalogPage.filters.selectAttributeOption('attribute-266824', 'настенный');
  await catalogPage.filters.setVolumeMax(60);
  await catalogPage.filters.selectAttributeOption('attribute-14395', 'сухой');
  await catalogPage.waitForProducts();
}

test.describe('[CatalogNavigation]', () => {
  test(
    'T1 [CatalogNavigation] catalog menu opens and shows "Бытовая техника" category',
    { tag: ['@ui', '@smoke', '@P1'] },
    async ({ authHomePage }) => {
      await authHomePage.header.openCatalogMenu();
      await authHomePage.header.catalogMenu.expectVisible();
      await authHomePage.header.catalogMenu.expectCategoryVisible('Бытовая техника');
    },
  );

  test(
    'T2 [CatalogNavigation] hovering "Бытовая техника" reveals "Климатическая техника" section and "Водонагреватели" link',
    { tag: ['@ui', '@regression', '@P1'] },
    async ({ authHomePage }) => {
      await authHomePage.header.openCatalogMenu();
      await authHomePage.header.catalogMenu.hoverCategory('Бытовая техника');
      await authHomePage.header.catalogMenu.subMenu.expectSectionVisible('Климатическая техника');
      await authHomePage.header.catalogMenu.subMenu.expectItemVisible('Водонагреватели');
    },
  );

  test(
    'T3 [CatalogNavigation] clicking "Водонагреватели" in the submenu navigates to /waterheaters/',
    { tag: ['@ui', '@smoke', '@P1'] },
    async ({ authHomePage, catalogPage }) => {
      await authHomePage.header.openCatalogMenu();
      await authHomePage.header.catalogMenu.hoverCategory('Бытовая техника');
      await authHomePage.header.catalogMenu.subMenu.clickItem('Водонагреватели');
      await catalogPage.expectUrl(/\/waterheaters\//);
      await catalogPage.waitForProducts();
      await catalogPage.expectCategoryName('Водонагреватели');
    },
  );
});

test.describe('[WaterheaterFilters]', () => {
  test.beforeEach(async ({ authHomePage, catalogPage }) => {
    await authHomePage.header.openCatalogMenu();
    await authHomePage.header.catalogMenu.hoverCategory('Бытовая техника');
    await authHomePage.header.catalogMenu.subMenu.clickItem('Водонагреватели');
    await catalogPage.waitForProducts();
    await catalogPage.dismissCookies();
  });

  test(
    'T4 [WaterheaterFilters] filter sidebar is visible with producer and price groups',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ catalogPage }) => {
      await catalogPage.filters.expectVisible();
      await catalogPage.filters.expectPriceFilterVisible();
      await catalogPage.filters.expectProducerVisible('midea');
    },
  );

  test(
    'T5 [WaterheaterFilters] applying all attribute filters returns non-empty product list',
    { tag: ['@ui', '@regression', '@P1'] },
    async ({ catalogPage }) => {
      await applyWaterheaterFilters(catalogPage);
      const count = await catalogPage.productList.getItemCount();
      expect(count).toBeGreaterThan(0);
    },
  );

  test(
    'T6 [WaterheaterFilters] all products after filtering have prices greater than 0',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ catalogPage }) => {
      await applyWaterheaterFilters(catalogPage);
      await catalogPage.productList.expectAllPricesGreaterThan(0);
    },
  );
});
