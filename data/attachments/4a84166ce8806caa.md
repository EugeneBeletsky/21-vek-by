# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/logout.spec.ts >> [Logout] >> T1 [Logout] authenticated user can log out successfully
- Location: tests/ui/logout.spec.ts:4:3

# Error details

```
TimeoutError: page.goto: Timeout 45000ms exceeded.
Call log:
  - navigating to "https://www.21vek.by/", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | 
  3  | export default class BasePage {
  4  |   protected readonly page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  | 
  10 |   async goto(path: string = '/'): Promise<void> {
> 11 |     await this.page.goto(path, { waitUntil: 'domcontentloaded' });
     |                     ^ TimeoutError: page.goto: Timeout 45000ms exceeded.
  12 |   }
  13 | 
  14 |   async expectTitle(expectedTitle: string): Promise<void> {
  15 |     await expect(this.page).toHaveTitle(expectedTitle);
  16 |   }
  17 | 
  18 |   async expectUrl(expectedUrl: string | RegExp): Promise<void> {
  19 |     await expect(this.page).toHaveURL(expectedUrl);
  20 |   }
  21 | }
  22 | 
```