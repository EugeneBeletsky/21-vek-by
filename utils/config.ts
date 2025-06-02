// src/utils/config.ts
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
      password: 'wrong_password',
    },
  },
};
