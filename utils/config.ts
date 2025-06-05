/* eslint-env node */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL!,
  credentials: {
    valid: {
      email: process.env.LOGIN_EMAIL!,
      password: process.env.LOGIN_PASSWORD!,
    },
    invalid: {
      email: 'invalid_email@gmail.com',
      password: 'wrong_password',
    },
  },
};
