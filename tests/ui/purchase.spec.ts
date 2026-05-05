import { test, expect } from '../../fixtures/test.fixture';

test.describe('[Purchase tests]', () => {

  test('T1 [Purchase] Search for a product and add it to cart', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchResultsPage, emptyCart: _emptyCart, page }) => {
    await authenticatedHomePage.header.search.searchItem('телевизор');
    await searchResultsPage.waitForResults();

    const product = searchResultsPage.products.getItem(0);
    expect(await product.getPrice()).toBeGreaterThan(0);
    expect((await product.getInfo())?.toLowerCase()).toContain('телевизор');

    await product.addToCart();
    await page.waitForLoadState('domcontentloaded');
    await expect(product.cartButton).toContainText('В корзине');
  });

  test('T2 [Purchase] Check if user redirected to order page', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchResultsPage, emptyCart: _emptyCart, page }) => {
    await authenticatedHomePage.header.search.searchItem('телевизор');
    await searchResultsPage.waitForResults();

    const product = searchResultsPage.products.getItem(0);
    expect(await product.getPrice()).toBeGreaterThan(0);
    expect((await product.getInfo())?.toLowerCase()).toContain('телевизор');

    await product.addToCart();
    await page.waitForLoadState('domcontentloaded');
    await expect(product.cartButton).toContainText('В корзине');

    await product.addToCart();
    await page.waitForLoadState('domcontentloaded');
    let url = page.url();
    expect(url).toContain('/order');
  });

  test('T3 [Purchase] Check order details', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchResultsPage, emptyCart: _emptyCart, page, orderPage }) => {
    await authenticatedHomePage.header.search.searchItem('телевизор');
    await searchResultsPage.waitForResults();

    const product = searchResultsPage.products.getItem(0);
    expect(await product.getPrice()).toBeGreaterThan(0);
    expect((await product.getInfo())?.toLowerCase()).toContain('телевизор');

    await product.addToCart();
    await page.waitForLoadState('domcontentloaded');
    await expect(product.cartButton).toContainText('В корзине');

    await product.addToCart();
    await page.waitForLoadState('domcontentloaded');
    let url = page.url();
    expect(url).toContain('/order');
    await orderPage.waitForBasket();

    const basketItem = orderPage.basketItems.getItem(0);
    let title = await basketItem.getTitle();
    expect(title).toContain('Телевизор');
    let price = await basketItem.getPrice();
    expect(price).toBeGreaterThan(0);
    let oldPrice = await basketItem.getOldPrice();
    expect(oldPrice).toBeGreaterThan(0);
    let discount = await basketItem.getDiscount();
    expect(discount).toBeGreaterThan(0);
    let counter = await basketItem.getCounter();
    //Check counter
    expect(counter).toBe('1');
    //Check price is more than 0
    expect(price).toBeGreaterThan(0);
    //Check that price is less than old price
    expect(price).toBeLessThan(oldPrice);
    //Check that price is equal to old price minus discount
    expect(price).toBe(oldPrice - discount);
  });

});