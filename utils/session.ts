import { BrowserContext, request } from '@playwright/test';
import { AuthClient } from '../tests/api/auth/authClient';
import { config } from './config';

export async function createLoggedInContext(
  browser: BrowserContext,
  email = config.credentials.valid.email,
  password = config.credentials.valid.password,
  guestCookies = []
) {
  const apiContext = await request.newContext({
    baseURL: 'https://gate.21vek.by',
    extraHTTPHeaders: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'origin': config.baseURL,
      'referer': config.baseURL,
    },
    storageState: { cookies: guestCookies, origins: [{ origin: config.baseURL, localStorage: [] }] }
  });

  const authClient = new AuthClient(apiContext);
  await authClient.login(email, password);
  const { accessToken, refreshToken } = authClient.getTokens();

  await browser.addCookies([
    {
      name: 'accessToken',
      value: accessToken!,
      domain: '21vek.by',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    },
    {
      name: 'refreshToken',
      value: refreshToken!,
      domain: '21vek.by',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    },
  ]);

  await browser.cookies();
}