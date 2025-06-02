import { request, APIRequestContext } from '@playwright/test';

export async function createAPIContext(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: 'https://gate.21vek.by',
    extraHTTPHeaders: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'origin': 'https://www.21vek.by',
      'referer': 'https://www.21vek.by/',
    },
  });
}
