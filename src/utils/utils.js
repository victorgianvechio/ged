import { resolve } from 'path';
import fs from 'fs';

export const publicPath = resolve(__dirname, '..', '..', 'public');

export const rootPath = resolve(__dirname, '..', '..');

export function createPublicDir() {
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }
}
