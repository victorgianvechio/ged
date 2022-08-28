import AWS from 'aws-sdk';

import config from '../../../config/aws-s3';

const { accessKeyId, secretAccessKey, Bucket } = config;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
});

const upload = async (file, filename) => {
  const params = {
    Bucket,
    Key: filename,
    Body: file,
  };

  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return err;
  //   }
  //   // console.log(data);
  //   return data;
  // });
  const result = s3.upload(params).promise();
  return result;
};

const list = async filter => {
  const params = {
    Bucket,
    Prefix: filter,
  };

  // s3.listObjectsV2(params, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return err;
  //   }
  //   console.log(data);
  //   return data;
  // });
  const result = s3.upload(params).promise();
  return result;
};

export default { upload, list };
