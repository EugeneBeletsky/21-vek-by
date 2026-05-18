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
errors?: {
  service: string,
  code: string,
  title: string,
  detail: string,
  sourcePointer: string
}
};

const invalidEmailCases: LoginCase[] = [
  {
    title: 'empty email',
    email: '',
    password,
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10201',
      title: 'Поле email является обязательным полем',
      detail: 'Поле email является обязательным полем',
      sourcePointer: 'email'
    }
  },
  {
    title: 'blank email',
    email: '   ',
    password,
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10201',
      title: 'Поле email является обязательным полем',
      detail: 'Поле email является обязательным полем',
      sourcePointer: 'email'
    }
  },
  {
    title: 'email without domain',
    email: 'qa.user',
    password,
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'email without local part',
    email: '@example.com',
    password,
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'email without top-level domain',
    email: 'qa.user@example',
    password,
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'literal null as email',
    email: 'null',
    password,
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'literal true as email',
    email: 'true',
    password,
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'SQL injection payload as email',
    email: '10 OR 1=1',
    password,
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'XSS payload as email',
    email: '<script>alert("auth")</script>',
    password,
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10204',
      title: 'Неверный формат поля email',
      detail: 'Неверный формат поля email',
      sourcePointer: 'email'
    }
  },
  {
    title: 'unregistered but valid email',
    email: 'qa.unregistered.user@example.com',
    password,
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10206',
      title: 'Проверьте email',
      detail: 'Проверьте email',
      sourcePointer: 'email'
    }
  },
];

const invalidPasswordCases: LoginCase[] = [
  {
    title: 'empty password',
    email,
    password: '',
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10301',
      title: 'Поле password является обязательным полем',
      detail: 'Поле password является обязательным полем',
      sourcePointer: 'password'
    }
  },
  {
    title: 'blank password',
    email,
    password: '   ',
    expectedStatus: 422,
    priority: 'P2',
    errors: {
      service: 'sso',
      code: '10303',
      title: 'Длина поля password должна быть от 6 до 32 символов',
      detail: 'Длина поля password должна быть от 6 до 32 символов',
      sourcePointer: 'password'
    }
  },
  {
    title: 'wrong password',
    email,
    password: 'DefinitelyWrongPassword123!',
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10304',
      title: 'Неверный пароль',
      detail: 'Неверный пароль',
      sourcePointer: 'password'
    }
  },
  {
    title: 'SQL injection payload as password',
    email,
    password: '\' OR \'1\'=\'1',
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10304',
      title: 'Неверный пароль',
      detail: 'Неверный пароль',
      sourcePointer: 'password'
    }
  },
  {
    title: 'XSS payload as password',
    email,
    password: '<script>alert("auth")</script>',
    expectedStatus: 422,
    priority: 'P1',
    errors: {
      service: 'sso',
      code: '10304',
      title: 'Неверный пароль',
      detail: 'Неверный пароль',
      sourcePointer: 'password'
    }
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

test.describe('API: [Login]', () => {

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

          //check response body
          const body = await response.json();
          expect(body).toHaveProperty('data.id');
          expect(body).toHaveProperty('data.name');
          expect(body).toHaveProperty('data.email');
          expect(body.data.email).toBe(validEmail);
          expect(body).toHaveProperty('data.phone');
          expect(body).toHaveProperty('data.gender');
          expect(body).toHaveProperty('data.birth');
          expect(body.data.status).toBe('active');

          //check response headers
          const headers = response.headers();

          expect(headers['content-type']).toBe('application/json');
          expect(headers['server']).toBe('envoy');
          expect(headers['vary']).toBe('Origin');
          expect(headers['access-control-allow-origin']).toBe('https://www.21vek.by');
          expect(headers['access-control-allow-credentials']).toBe('true');
          expect(headers).toHaveProperty('x-kong-request-id');
          expect(headers['x-gate-user-role']).toBe('personal');

          //check tokens
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

          expect(response.ok()).toBeFalsy();
          expect(response.status()).toBe(testCase.expectedStatus);
          expect(response.statusText()).toBe('Unprocessable Entity');

          //check response body
          const body = await response.json();
          expect(body.service).toBe(testCase.errors?.service);  
          expect(body.errors[0].code).toBe(testCase.errors?.code);
          expect(body.errors[0].title).toBe(testCase.errors?.title);
          expect(body.errors[0].detail).toBe(testCase.errors?.detail);
          expect(body.errors[0].source?.pointer).toBe(testCase.errors?.sourcePointer);      
          
          //check response headers
          const headers = response.headers();
          expect(headers['content-type']).toBe('application/json');
          expect(headers['server']).toBe('envoy');
          expect(headers['vary']).toBe('Origin');
          expect(headers['access-control-allow-origin']).toBe('https://www.21vek.by');
          expect(headers['access-control-allow-credentials']).toBe('true');
          expect(headers).toHaveProperty('x-kong-request-id');
          expect(headers['x-gate-user-role']).toBe('personal');
        },
      );
    }
  });
});