import mongoose from 'mongoose';

const uri = process.env.MONGO_DATABASE_URL;
// const options = {
//   user: process.env.MONGO_USER,
//   pass: process.env.MONGO_PASS,
//   useNewUrlParser: true,
// };

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${uri}`);
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connection is open');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

export default mongoose;
