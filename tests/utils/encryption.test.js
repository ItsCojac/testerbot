const { encrypt, decrypt } = require('../../src/utils/encryption');

describe('Encryption', () => {
  test('should encrypt and decrypt plaintext', () => {
    const plaintext = 'This is a secret message';
    const key = 'mySecretKey12345';
    const encryptedText = encrypt(plaintext, key);
    const decryptedText = decrypt(encryptedText, key);
    expect(decryptedText).toBe(plaintext);
  });
});
