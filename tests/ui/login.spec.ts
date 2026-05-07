import { test } from '../../fixtures/test.fixture';
import { config } from '../../utils/config';
import { faker } from '@faker-js/faker';
import { User } from '../../types/User';

const validEmail = config.credentials.email;
const validPassword = config.credentials.password;

type LoginCase = {
  title: string;
  user: User;
  expect: 'success' | { errorContains: string };
};

const loginCases: LoginCase[] = [
  {
    title: 'T1 [Login] valid credentials — login succeeds',
    user: { email: validEmail, password: validPassword },
    expect: 'success',
  },
  {
    title: 'T2 [Login] wrong password — shows error',
    user: { email: validEmail, password: faker.internet.password() },
    expect: { errorContains: 'Неправильный пароль. Сбросить пароль?' },
  },
  {
    title: 'T3 [Login] unregistered email — shows error',
    user: { email: faker.internet.email(), password: validPassword },
    expect: { errorContains: 'Проверьте электронную почту или зарегистрируйтесь' },
  },
  {
    title: 'T4 [Login] empty password — shows error',
    user: { email: validEmail, password: '' },
    expect: { errorContains: 'Пароль не указан' },
  },
  {
    title: 'T5 [Login] random email — shows error',
    user: { email: faker.internet.email(), password: validPassword },
    expect: { errorContains: 'Проверьте электронную почту или зарегистрируйтесь' },
  },
  {
    title: 'T6 [Login] email is literal "null" — invalid format error',
    user: { email: 'null', password: validPassword },
    expect: { errorContains: 'Неправильный формат электронной почты' },
  },
  {
    title: 'T7 [Login] email is literal "true" — invalid format error',
    user: { email: 'true', password: validPassword },
    expect: { errorContains: 'Неправильный формат электронной почты' },
  },
  {
    title: 'T8 [Login] email is SQL injection — invalid format error',
    user: { email: '10 OR 1=1', password: validPassword },
    expect: { errorContains: 'Неправильный формат электронной почты' },
  },
  {
    title: 'T9 [Login] email is XSS payload — invalid format error',
    user: { email: '<script>alert(\'pwned\')</script>', password: validPassword },
    expect: { errorContains: 'Неправильный формат электронной почты' },
  },
];

test.describe('[Login]', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.dismissCookies();
  });

  for (const testCase of loginCases) {
    test(testCase.title, { tag: ['@regression', '@P1'] }, async ({ homePage }) => {
      await homePage.header.openAccountMenu();
      await homePage.accountModal.clickLogin();
      await homePage.loginModal.expectVisible();
      await homePage.loginModal.login(testCase.user);

      if (testCase.expect === 'success') {
        await homePage.loginModal.expectHidden();
      } else {
        await homePage.loginModal.expectErrorMessage(testCase.expect.errorContains);
      }
    });
  }
});