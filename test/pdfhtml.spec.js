/* eslint-disable no-unused-vars */
import pdf2html from 'pdf2html';
import path from 'path';

function toHtml() {
  pdf2html.html(path.resolve(__dirname, 'test.pdf'), (err, html) => {
    if (err) {
      console.error(`Conversion error: ${err}`);
    } else {
      console.log(html);
    }
  });
}

function toText() {
  pdf2html.text(path.resolve(__dirname, 'test.pdf'), (err, text) => {
    if (err) {
      console.error(`Conversion error: ${err}`);
    } else {
      console.log(text);
    }
  });
}

// toHtml();
toText();
