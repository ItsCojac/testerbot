const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const paddedKey = key.padEnd(32, '\0').slice(0, 32);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(paddedKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}


function decrypt(text, key) {
  const [ivString, encryptedString] = text.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const paddedKey = key.padEnd(32, '\0').slice(0, 32);
  const encrypted = Buffer.from(encryptedString, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(paddedKey), iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}


module.exports = {
  encrypt,
  decrypt,
};
