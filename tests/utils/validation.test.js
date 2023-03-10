const validation = require('../../src/utils/validation');

describe('Validation', () => {
  describe('isEmail', () => {
    it('should return true for a valid email', () => {
      const result = validation.isEmail('john.doe@example.com');
      expect(result).toBe(true);
    });

    it('should return false for an invalid email', () => {
      const result = validation.isEmail('john.doe');
      expect(result).toBe(false);
    });
  });

  describe('isPassword', () => {
    it('should return true for a valid password', () => {
      const result = validation.isPassword('password123');
      expect(result).toBe(true);
    });

    it('should return false for a password less than 8 characters', () => {
      const result = validation.isPassword('pw123');
      expect(result).toBe(false);
    });
  });
});
