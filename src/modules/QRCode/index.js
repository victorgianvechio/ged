import qrcode from 'qrcode';
import { resolve } from 'path';

import { publicPath } from '../../utils/utils';

class QRCode {
  async generate(value, filename) {
    qrcode.toFile(
      resolve(publicPath, `${filename}.png`),
      value,
      {
        color: {
          dark: '#000',
          light: '#FFF',
        },
      },
      err => {
        if (err) throw err;
      }
    );
  }
}

export default new QRCode();
