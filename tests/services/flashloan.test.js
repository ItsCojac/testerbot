const { flashloan } = require('../../src/services/flashloan');

test('should execute flashloan', async () => {
  const dexAddress = '0x1234567890abcdef';
  const tokenAddress = '0x1111111111111111';
  const amount = 100;

  const receipt = await flashloan(dexAddress, tokenAddress, amount);

  expect(receipt.status).toBe(1);
});
