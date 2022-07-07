import '../src/lib/dotenv';
import AWS from 'aws-sdk';

import config from '../src/config/aws-s3';

const { accessKeyId, secretAccessKey, Bucket } = config;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
});

const params2 = {
  Bucket,
  Prefix: 'prontuarios/test.pdf',
};

s3.listObjectsV2(params2, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
