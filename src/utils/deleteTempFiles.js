/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import { tempDir } from './publicPaths';

export default function deleteTempFiles() {
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      console.log(`${file} : File Deleted Successfully.`);
      fs.unlinkSync(path.resolve(tempDir, file));
    }
  });
}
