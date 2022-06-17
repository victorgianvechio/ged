import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';
import { tempDir } from '../../utils/publicPaths';

const dataBuffer = fs.readFileSync(
  path.join(tempDir, '1655395749320-test.pdf')
);

export default async function pdfToText(req, res) {
  const { file } = req;

  await pdf(dataBuffer).then(data => {
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text

    // const text = data.text.replace(/\n/g, " ");
    const { text } = data;
    return text;
    s;
  });
}
