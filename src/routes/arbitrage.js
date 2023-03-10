const { getBalance, getBestPrice, executeTrade } = require('./dex');
const { getFlashLoan } = require('./flashloan');

async function getBestOpportunities() {
  const dex1Address = '0x1234567890abcdef';
  const dex2Address = '0xabcdef1234567890';
  const tokenAddress = '0x1111111111111111';
  const flashloanAmount = 1000; // in wei

  const [balanceDex1, balanceDex2, bestPriceDex1, bestPriceDex2] = await Promise.all([
    getBalance(dex1Address, tokenAddress),
    getBalance(dex2Address, tokenAddress),
    getBestPrice(dex1Address, dex2Address, tokenAddress, flashloanAmount),
    getBestPrice(dex2Address, dex1Address, tokenAddress, flashloanAmount),
  ]);

  const maxProfitDex1 = balanceDex1 * bestPriceDex1 - flashloanAmount;
  const maxProfitDex2 = balanceDex2 * bestPriceDex2 - flashloanAmount;

  if (maxProfitDex1 > 0 && maxProfitDex1 > maxProfitDex2) {
    return {
      dex1Address,
      dex2Address,
      tokenAddress,
      amount: flashloanAmount,
      profit: maxProfitDex1,
    };
  } else if (maxProfitDex2 > 0 && maxProfitDex2 > maxProfitDex1) {
    return {
      dex1Address: dex2Address,
      dex2Address: dex1Address,
      tokenAddress,
      amount: flashloanAmount,
      profit: maxProfitDex2,
    };
  }

  return null;
}

async function executeArbitrage() {
  const opportunity = await getBestOpportunities();

  if (!opportunity) {
    console.log('No arbitrage opportunity found.');
    return;
  }

  const { dex1Address, dex2Address, tokenAddress, amount } = opportunity;

  const [flashloan, bestPrice] = await Promise.all([
    getFlashLoan(dex1Address, dex2Address, tokenAddress, amount),
    getBestPrice(dex1Address, dex2Address, tokenAddress, amount),
  ]);

  if (!flashloan || !bestPrice) {
    console.log('Unable to get flashloan or best price.');
    return;
  }

  const profit = amount * bestPrice - flashloan;

  if (profit <= 0) {
    console.log('No arbitrage opportunity found.');
    return;
  }

  console.log(`Profit: ${profit}`);

  const txHash = await executeTrade(dex1Address, dex2Address, tokenAddress, amount, bestPrice);
  console.log(`Trade executed with tx hash: ${txHash}`);
}

module.exports = { getBestOpportunities, executeArbitrage };
