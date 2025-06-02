// tests/api/auth/auth.test.ts
import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../api/request';
import { AuthClient } from './authClient';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('API: Login', () => {
  let authClient: AuthClient;

  test.beforeEach(async () => {
    const context = await createAPIContext();
    authClient = new AuthClient(context);
  });

  test('Success login', async () => {
    const res = await authClient.login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('body:', body);
    expect(body).toHaveProperty('data.id');
  });

  test('Failed login', async () => {
    const res = await authClient.login(process.env.LOGIN_EMAIL!, 'wrong_password');
    expect(res.status()).toBe(422);
  });
});
