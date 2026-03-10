import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../api/request';
import { AuthClient } from '../auth/authClient';
import { Catalog } from './catalog';

test.describe('API: [Catalog]', () => {
  let authClient: AuthClient;
  let catalog: Catalog;

  test.beforeEach(async () => {
    const context = await createAPIContext();
    authClient = new AuthClient(context);
    catalog = new Catalog(context);
  });

  test('T1 [Catalog] Check catalog big category length', { tag: ['@api', '@regression', '@P1'] }, async () => {
    await authClient.login();

    const response = await catalog.getCatalog();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    let responseJSON = await response.json();
    expect(responseJSON).toHaveLength(25);
  });


  test('T2 [Catalog] Each category have 5 obligatory property', { tag: ['@api', '@regression', '@P1'] }, async () => {
    await authClient.login();

    const response2 = await catalog.getCatalog();
    expect(response2.ok()).toBeTruthy();
    expect(response2.status()).toBe(200);
    expect(response2.statusText()).toBe('OK');
    let responseJSON = await response2.json();
    expect(responseJSON[0]).toHaveProperty('name');
    expect(responseJSON[0]).toHaveProperty('url');
    expect(responseJSON[0]).toHaveProperty('id');
    expect(responseJSON[0]).toHaveProperty('isVirtual');
    expect(responseJSON[0]).toHaveProperty('children');
  });


  test('T3 [Catalog] Check first category', { tag: ['@api', '@regression', '@P1'] }, async () => {
    await authClient.login();

    const response2 = await catalog.getCatalog();
    expect(response2.ok()).toBeTruthy();
    expect(response2.status()).toBe(200);
    expect(response2.statusText()).toBe('OK');
    let responseJSON = await response2.json();
    expect(responseJSON[0].name).toBe('Бытовая техника');
    expect(responseJSON[0].url).toBe('https://www.21vek.by/kitchen/');
    expect(responseJSON[0].id).toBe(1);
    expect(responseJSON[0].children).toHaveLength(13);
  });  
});
