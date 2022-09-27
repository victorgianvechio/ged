import multer from 'multer';
import { publicPath } from '../utils/utils';

export default {
  storage: multer.diskStorage({
    destination: publicPath,
    filename: (req, file, cb) => {
      // cb(null, `${Date.now()}.pdf`);
      cb(null, `${file.originalname}`);
    },
  }),
};
