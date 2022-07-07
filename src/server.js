import './lib/dotenv';
import App from './App';

const port = process.env.PORT || process.env.APP_PORT;
const URL = `${process.env.APP_URL}/api`;

App.set('port', port);

App.listen(port, () => {
  console.log(`GED API is running on ${URL}`);
});
