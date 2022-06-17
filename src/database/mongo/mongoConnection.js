import mongoose from 'mongoose';

import { uri, options } from './mongoConfig';

mongoose.Promise = global.Promise;
mongoose.connect(uri, options);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection connected to ${uri}`);
});
mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

// module.exports = mongoose;
export default mongoose;
