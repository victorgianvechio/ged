import './lib/dotenv';
import App from './App';
import { createPublicDir } from './utils/utils'

const port = process.env.PORT || process.env.APP_PORT;

createPublicDir();

App.listen(port, () => {
  console.log(`GED API is running`);
});
