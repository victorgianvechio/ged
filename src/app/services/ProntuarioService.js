/* eslint-disable no-unused-vars */
import pdf2html from 'pdf2html';

export default async function pdfToText(req, res) {
  const { file } = req;

  pdf2html.text(file, async (err, text) => {
    if (err) {
      console.error(`Conversion error: ${err}`);
      return err;
    }
    return text;
  });
}
