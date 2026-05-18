import { test, expect } from '../../../fixtures/api.fixture';
import { config } from '../../../utils/config';

const validEmail = config.credentials.email;
const validPassword = config.credentials.password;
const email = validEmail ?? '';
const password = validPassword ?? '';

type LogoutCase = {
  title: string;
  loginBeforeLogout: boolean;
  expectedStatus: number;
  priority: 'P1' | 'P2';
};

const logoutCases: LogoutCase[] = [
  {
    title: 'authenticated user can logout',
    loginBeforeLogout: true,
    expectedStatus: 204,
    priority: 'P1',
  },
  {
    title: 'anonymous user cannot logout',
    loginBeforeLogout: false,
    expectedStatus: 401,
    priority: 'P2',
  },
];

test.describe('[Logout]', () => {
  for (const testCase of logoutCases.filter(({ loginBeforeLogout }) => loginBeforeLogout)) {
    test(
      `[Logout] ${testCase.title}`,
      { tag: ['@api', '@regression', `@${testCase.priority}`] },
      async ({ authClient }) => {
        const loginResponse = await authClient.login(email, password);
        expect(loginResponse.status()).toBe(200);

        const logoutResponse = await authClient.logout();
        expect(logoutResponse.status()).toBe(testCase.expectedStatus);
        expect(await logoutResponse.statusText()).toBe('No Content');
      },
    );
  }

  for (const testCase of logoutCases.filter(({ loginBeforeLogout }) => !loginBeforeLogout)) {
    test(
      `[Logout] ${testCase.title}`,
      { tag: ['@api', '@regression', `@${testCase.priority}`] },
      async ({ authClient }) => {
        const logoutResponse = await authClient.logout();
        expect(logoutResponse.status()).toBe(testCase.expectedStatus);
        expect(await logoutResponse.statusText()).toBe('Unauthorized');
      },
    );
  }
});
