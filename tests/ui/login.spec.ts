import { test, expect } from '../../fixtures/test.fixture';
import { config } from '../../utils/config';
import { User } from '../../pages/home/components/LoginModal';
import { faker } from '@faker-js/faker';


const validEmail = config.credentials.valid.email;
const validPassword = config.credentials.valid.password;

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(config.baseURL);
  await homePage.cookieModal1.reject();
  await homePage.cookieModal2.reject();
});

test.describe('[Login tests]', () => {
  const loginCases: Array<{
    title: string;
    user: User;
    expect: 'success' | { errorContains: string };
  }> = [
    {
      title: 'T1 [Login] should login successfully with valid credentials',
      user: { email: validEmail, password: validPassword },
      expect: 'success',
    },
    {
      title: 'T2 [Login] should show error on wrong password',
      user: { email: validEmail, password: faker.internet.password() },
      expect: { errorContains: 'Неправильный пароль' },
    },
    {
      title: 'T3 [Login] should show error on wrong email',
      user: { email: faker.internet.email(), password: validPassword },
      expect: { errorContains: 'Проверьте электронную почту или зарегистрируйтесь' },
    },
    {
      title: 'T4 [Login] should show error empty password',
      user: { email: validEmail, password: '' },
      expect: { errorContains: 'Пароль не указан' },
    },
    {
      title: 'T5 [Login] email is a random email',
      user: { email: faker.internet.email(), password: validPassword },
      expect: { errorContains: 'Проверьте электронную почту или зарегистрируйтесь' },
    },
    {
      title: 'T6 [Login] email is null',
      user: { email: 'null', password: validPassword },
      expect: { errorContains: 'Неправильный формат электронной почты' },
    },
    {
      title: 'T7 [Login] email is a boolean',
      user: { email: 'true', password: validPassword },
      expect: { errorContains: 'Неправильный формат электронной почты' },
    },
    {
      title: 'T8 [Login] email is a SQL injection',
      user: { email: '10 OR 1=1', password: validPassword },
      expect: { errorContains: 'Неправильный формат электронной почты' },
    },
    {
      title: 'T9 [Login] email is a XSS attack',
      user: { email: `<script>alert('pwned')</script>`, password: validPassword },
      expect: { errorContains: 'Неправильный формат электронной почты' },
    },
  ];

  for (const testCase of loginCases) {
    test(testCase.title, { tag: ['@regression', '@P1'] }, async ({ homePage }) => {
      await homePage.header.openAccountMenu();
      await homePage.accountModal.clickLoginButton();
      await expect(await homePage.loginModal.getModal()).toBeVisible();
      await homePage.loginModal.login(testCase.user);

      if (testCase.expect === 'success') {
        await expect(await homePage.loginModal.getModal()).toBeHidden();
        return;
      }

      await expect(await homePage.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
      expect.soft(await homePage.loginModal.getErrorMessageText()).toContain(testCase.expect.errorContains);
    });
  }
});
