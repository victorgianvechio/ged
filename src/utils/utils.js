import { resolve } from 'path';
import fs from 'fs';

export const publicPath = resolve(__dirname, '..', '..', 'public');

export function createPublicDir() {
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }
}
