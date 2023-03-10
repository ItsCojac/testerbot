const { getBestOpportunities } = require('../../src/services/arbitrage');

test('gets best arbitrage opportunities', async () => {
  const opportunities = await getBestOpportunities();
  expect(opportunities).toHaveLength(1);
  expect(opportunities[0]).toHaveProperty('token');
  expect(opportunities[0]).toHaveProperty('dex1');
  expect(opportunities[0]).toHaveProperty('dex2');
  expect(opportunities[0]).toHaveProperty('profit');
});
