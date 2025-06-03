import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class AuthClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string): Promise<APIResponse> {
    const res = await this.request.post('/sso/login-by-email', {
      data: { email, password },
    });

    const cookies = res.headers()['set-cookie'];
    if (cookies) {
      this.accessToken = this.extractCookie(cookies, 'accessToken');
      this.refreshToken = this.extractCookie(cookies, 'refreshToken');
    }

    return res;
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

  async logout(): Promise<APIResponse> {
    return this.request.post('/sso/logout');
  }
}
