import { request } from '@playwright/test';
import { config } from './config';

export async function loginViaApi() {
  const apiContext = await request.newContext();

  const response = await apiContext.post('https://gate.21vek.by/sso/login-by-email', {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    data: {
      email: config.credentials.valid.email,
      password: config.credentials.valid.password,
    },
  });

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()} - ${await response.text()}`);
  }

  const { cookies } = await apiContext.storageState();
  await apiContext.dispose();

  return { cookies };
}