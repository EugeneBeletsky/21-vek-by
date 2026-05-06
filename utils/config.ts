import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || 'https://www.21vek.by',
  credentials: {
    email: process.env.LOGIN_EMAIL,
    password: process.env.LOGIN_PASSWORD,
  },
};
