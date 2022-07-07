import AWS from 'aws-sdk';

import config from '../../../../config/aws-s3';

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

  // console.log('4- chamou s3.upload');
  const result = s3.upload(params).promise();
  // console.log('5- finalizou s3.upload');
  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return err;
  //   }
  //   // console.log(data);
  //   console.log('5- finalizou s3.upload');
  //   return data;
  // });
  return result;
};

const list = async filter => {
  const params = {
    Bucket,
    Prefix: filter,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(data);
    return data;
  });
};

export default { upload, list };
