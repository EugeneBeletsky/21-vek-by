import { test, expect } from '../../../fixtures/api.fixture';

test.describe('API: [Catalog]', () => {
  test('T1 [Catalog] Check catalog big category length', { tag: ['@api', '@regression', '@P1'] }, async ({ authenticatedCatalog }) => {
    const response = await authenticatedCatalog.getCatalog();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    const responseJSON = await response.json();
    expect(responseJSON).toHaveLength(25);
  });

  test('T2 [Catalog] Each category have 5 obligatory property', { tag: ['@api', '@regression', '@P1'] }, async ({ authenticatedCatalog }) => {
    const response = await authenticatedCatalog.getCatalog();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    const responseJSON = await response.json();
    expect(responseJSON[0]).toHaveProperty('name');
    expect(responseJSON[0]).toHaveProperty('url');
    expect(responseJSON[0]).toHaveProperty('id');
    expect(responseJSON[0]).toHaveProperty('isVirtual');
    expect(responseJSON[0]).toHaveProperty('children');
  });

  test('T3 [Catalog] Check first category', { tag: ['@api', '@regression', '@P1'] }, async ({ authenticatedCatalog }) => {
    const response = await authenticatedCatalog.getCatalog();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    const responseJSON = await response.json();
    expect(responseJSON[0].name).toBe('Бытовая техника');
    expect(responseJSON[0].url).toBe('https://www.21vek.by/kitchen/');
    expect(responseJSON[0].id).toBe(1);
    expect(responseJSON[0].children).toHaveLength(13);
  });
});
