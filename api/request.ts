import { request, APIRequestContext, Cookie } from '@playwright/test';

const API_HEADERS = {
  'accept': 'application/json',
  'content-type': 'application/json',
  'origin': 'https://www.21vek.by',
  'referer': 'https://www.21vek.by/',
};

export async function createAPIContext(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: 'https://gate.21vek.by',
    extraHTTPHeaders: API_HEADERS,
  });
}

export async function createAuthenticatedAPIContext(
  cookies: Cookie[]
): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: 'https://gate.21vek.by',
    extraHTTPHeaders: API_HEADERS,
    storageState: { cookies, origins: [] },
  });
}
