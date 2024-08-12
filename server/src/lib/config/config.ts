import * as env from 'dotenv';

env.config();
export const configurations = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET || '',
  },
};
