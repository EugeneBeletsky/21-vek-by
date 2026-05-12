import { test, expect } from '../../../fixtures/api.fixture';
import { config } from '../../../utils/config';

const validEmail = config.credentials.email;
const validPassword = config.credentials.password;
const email = validEmail ?? '';
const password = validPassword ?? '';

type LoginCase = {
  title: string;
  email: string;
  password: string;
  expectedStatus: number;
  priority: 'P1' | 'P2';
};

const invalidEmailCases: LoginCase[] = [
  {
    title: 'empty email',
    email: '',
    password,
    expectedStatus: 422,
    priority: 'P1',
  },
  {
    title: 'blank email',
    email: '   ',
    password,
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'email without domain',
    email: 'qa.user',
    password,
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'email without local part',
    email: '@example.com',
    password,
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'email without top-level domain',
    email: 'qa.user@example',
    password,
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'literal null as email',
    email: 'null',
    password,
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'literal true as email',
    email: 'true',
    password,
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'SQL injection payload as email',
    email: '10 OR 1=1',
    password,
    expectedStatus: 422,
    priority: 'P1',
  },
  {
    title: 'XSS payload as email',
    email: '<script>alert("auth")</script>',
    password,
    expectedStatus: 422,
    priority: 'P1',
  },
  {
    title: 'unregistered but valid email',
    email: 'qa.unregistered.user@example.com',
    password,
    expectedStatus: 422,
    priority: 'P1',
  },
];

const invalidPasswordCases: LoginCase[] = [
  {
    title: 'empty password',
    email,
    password: '',
    expectedStatus: 422,
    priority: 'P1',
  },
  {
    title: 'blank password',
    email,
    password: '   ',
    expectedStatus: 422,
    priority: 'P2',
  },
  {
    title: 'wrong password',
    email,
    password: 'DefinitelyWrongPassword123!',
    expectedStatus: 422,
    priority: 'P1',
  },
  {
    title: 'SQL injection payload as password',
    email,
    password: '\' OR \'1\'=\'1',
    expectedStatus: 422,
    priority: 'P1',
  },
  {
    title: 'XSS payload as password',
    email,
    password: '<script>alert("auth")</script>',
    expectedStatus: 422,
    priority: 'P1',
  },
];

const successfulLoginCases: LoginCase[] = [
  {
    title: 'valid credentials',
    email,
    password,
    expectedStatus: 200,
    priority: 'P1',
  },
];

const failedLoginCases: LoginCase[] = [
  ...invalidEmailCases,
  ...invalidPasswordCases,
];

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

test.describe('API: [Auth]', () => {
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(!validEmail || !validPassword, 'LOGIN_EMAIL and LOGIN_PASSWORD must be set for auth API tests');

  test.describe('[Login]', () => {
    for (const testCase of successfulLoginCases) {
      test(
        `[Login] ${testCase.title}`,
        { tag: ['@api', '@regression', `@${testCase.priority}`] },
        async ({ authClient }) => {
          const response = await authClient.login(testCase.email, testCase.password);

          expect(response.ok()).toBeTruthy();
          expect(response.status()).toBe(testCase.expectedStatus);
          expect(response.statusText()).toBe('OK');

          const body = await response.json();
          expect(body).toHaveProperty('data.id');

          const tokens = authClient.getTokens();
          expect(tokens.accessToken).toBeTruthy();
          expect(tokens.refreshToken).toBeTruthy();
        },
      );
    }

    for (const testCase of failedLoginCases) {
      test(
        `[Login] ${testCase.title}`,
        { tag: ['@api', '@regression', `@${testCase.priority}`] },
        async ({ authClient }) => {
          const response = await authClient.login(testCase.email, testCase.password);

          expect(response.status()).toBe(testCase.expectedStatus);
          expect(response.ok()).toBeFalsy();
        },
      );
    }
  });

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
          expect(await logoutResponse.text()).toBe('');
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
        },
      );
    }
  });
});
