function isEmail(email) {
  // Regular expression to validate email addresses
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isPassword(password) {
  // Password must be at least 8 characters long
  return password.length >= 8;
}

function validateAddress(address) {
  if (!/^(0x)?[0-9a-fA-F]{40}$/i.test(address)) {
    throw new Error('Invalid address');
  }
}

function validatePrivateKey(privateKey) {
  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error('Invalid private key');
  }
}

function validateNumber(value) {
  if (typeof value !== 'number' || isNaN(value) || value <= 0) {
    throw new Error('Invalid number');
  }
}

module.exports = {
  isEmail,
  isPassword,
  validateAddress,
  validatePrivateKey,
  validateNumber,
};
