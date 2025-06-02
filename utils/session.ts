import { BrowserContext, request } from '@playwright/test';
import { AuthClient } from '../tests/api/auth/authClient';
import * as dotenv from 'dotenv';

dotenv.config();

export async function createLoggedInContext(
  browser: BrowserContext,
  email = process.env.LOGIN_EMAIL!,
  password = process.env.LOGIN_PASSWORD!,
  guestCookies = []
) {
  const apiContext = await request.newContext({
    baseURL: 'https://gate.21vek.by',
    extraHTTPHeaders: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'origin': 'https://www.21vek.by',
      'referer': 'https://www.21vek.by/',
      // Добавьте нужные заголовки, если требуется
    },
    // Передаём гостевые куки
    storageState: { cookies: guestCookies, origins: [{ origin: 'https://www.21vek.by', localStorage: [] }] }
  });

  const authClient = new AuthClient(apiContext);
  await authClient.login(email, password);
  const { accessToken, refreshToken } = authClient.getTokens();

  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);

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

  const cookies = await browser.cookies();
  console.log('Cookies in context:', cookies);
}
