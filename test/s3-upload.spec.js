import '../src/lib/dotenv';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import config from '../src/config/aws-s3';

const { accessKeyId, secretAccessKey, Bucket } = config;

const filename = 'test.pdf';
const folder = 'prontuarios';
const file = fs.readFileSync(path.resolve(__dirname, filename));

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
});

const params = {
  Bucket,
  Key: `${folder}/${filename}`,
  Body: file,
};

s3.upload(params, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
