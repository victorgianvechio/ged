import multer from 'multer';
import { tempDir } from '../utils/publicPaths';

export default {
  storage: multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
      // cb(null, `${Date.now()}.pdf`);
      cb(null, `${file.originalname}`);
    },
  }),
};
