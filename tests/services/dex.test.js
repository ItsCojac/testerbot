const { getBalance, getBestPrice, executeTrade } = require('../../src/services/dex');

test('gets balance from dex', async () => {
  const dexAddress = '0x1234567890abcdef';
  const tokenAddress = '0x1111111111111111';
  const userAddress = '0x9999999999999999';
  const balance = await getBalance(dexAddress, tokenAddress, userAddress);
  expect(balance.toNumber()).toBeGreaterThan(0); // change toNumber() to convert BigNumber to number
});

test('gets best price from dexes', async () => {
  const dex1Address = '0x1234567890abcdef';
  const dex2Address = '0xabcdef0123456789';
  const tokenAddress = '0x1111111111111111';
  const bestPrice = await getBestPrice(dex1Address, dex2Address, tokenAddress);
  expect(bestPrice.toNumber()).toBeGreaterThan(0); // change toNumber() to convert BigNumber to number
});

test('executes trade on dex', async () => {
  const dexAddress = '0x1234567890abcdef';
  const tokenAddress = '0x1111111111111111';
  const amount = 10;
  const price = 100;
  await executeTrade(dexAddress, tokenAddress, amount, price);
  // TODO: add assertion after trade is executed
});
