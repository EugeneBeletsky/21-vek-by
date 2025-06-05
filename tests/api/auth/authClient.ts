/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIRequestContext, APIResponse, Cookie } from '@playwright/test';
import { config } from '../../../utils/config';

export class AuthClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private cookies: Cookie[] = [];

  constructor(private request: APIRequestContext) {}

  async login(email = config.credentials.valid.email, password = config.credentials.valid.password): Promise<APIResponse> {
    const response = await this.request.post('/sso/login-by-email', {
      data: { email, password },
    });

    const cookies = response.headers()['set-cookie'];
    if (cookies) {
      this.accessToken = this.extractCookie(cookies, 'accessToken');
      this.refreshToken = this.extractCookie(cookies, 'refreshToken');
    }

    return response;
  }

  private extractCookie(rawCookies: string | string[], name: string): string | null {
    const allCookies = Array.isArray(rawCookies) ? rawCookies : [rawCookies];
    for (const cookie of allCookies) {
      const match = cookie.match(new RegExp(`${name}=([^;]+)`));
      if (match) return match[1] || null;
    }
    return null;
  }

  getTokens() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }

  getCookies() {
    return this.cookies;
  }

  async logout(): Promise<APIResponse> {
    const response = await this.request.post('/sso/logout');
    return response;
  }
}
