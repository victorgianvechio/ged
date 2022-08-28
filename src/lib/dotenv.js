import dotenv from 'dotenv';
import { resolve } from 'path';
import { expand } from 'dotenv-expand';

const myEnv = dotenv.config({
  path: resolve(__dirname, '..', '..', '.env'),
});

expand(myEnv);
