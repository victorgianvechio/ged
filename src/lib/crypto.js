import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const iv_length = 16;
const algorithm = 'aes-256-cbc';

const encrypt = (text, key) => {
  const iv = randomBytes(iv_length);
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (text, key) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const generateKey = () => {
  const secretKey = randomBytes(iv_length);
  return secretKey.toString('hex');
};

export { encrypt, decrypt, generateKey };
