export const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

export const options = {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  useNewUrlParser: true,
};
