import './config/dotenv';
import App from './App';
import { createPublicDir } from './utils/utils';

const port = process.env.PORT || process.env.APP_PORT;

createPublicDir();

App.listen(port, () => {
  console.log(
    `[${process.env.NODE_ENV}] ${process.env.APP_NAME} is running on port ${port}`
  );
});
