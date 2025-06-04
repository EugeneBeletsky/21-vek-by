import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../api/request';
import { AuthClient } from './authClient';
import { config } from '../../../utils/config';

test.describe('API: [Login]', () => {
  let authClient: AuthClient;

  test.beforeEach(async () => {
    const context = await createAPIContext();
    authClient = new AuthClient(context);
  });

  test('T1 [Login] Success login', { tag: ['@regression', '@P1'] }, async () => {
    const response = await authClient.login();
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    const body = await response.json();
    expect(body).toHaveProperty('data.id');
  });

  test('T2 [Login] Failed login with invalid password', { tag: ['@regression', '@P2'] }, async () => {
    const response = await authClient.login(config.credentials.valid.email, config.credentials.invalid.password);

    expect(response.status()).toBe(422);
  });

  test('T3 [Login] Failed login with invalid email', { tag: ['@regression', '@P2'] }, async () => {
    const response = await authClient.login(config.credentials.invalid.email, config.credentials.valid.password);

    expect(response.status()).toBe(422);
  });

  test('T4 [Logout] Success logout', { tag: ['@regression', '@P2'] }, async () => {
    await authClient.login();
    const response = await authClient.logout();

    expect(response.status()).toBe(204);
  });
});
