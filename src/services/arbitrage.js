const { ethers } = require('ethers');
const { getBalance, getBestPrice, executeTrade } = require('./dex');
const { executeFlashloan } = require('./flashloan');
const { UniswapV2Router02 } = require('@uniswap/v2-periphery');
const abi = require('../abis/uniswapV2Router02.json');

const privateKey = process.env.PRIVATE_KEY;
const dex1Address = process.env.DEX_1_ADDRESS;
const dex2Address = process.env.DEX_2_ADDRESS;
const flashloanAmount = process.env.FLASHLOAN_AMOUNT;
const tokenAddress = process.env.TOKEN_ADDRESS;

async function getBestOpportunities() {
const [balanceDex1, balanceDex2, bestPriceDex1, bestPriceDex2] = await Promise.all([
getBalance(dex1Address, tokenAddress, ethers.utils.getAddress(privateKey)),
getBalance(dex2Address, tokenAddress, ethers.utils.getAddress(privateKey)),
getBestPrice(dex1Address, dex2Address, tokenAddress, flashloanAmount),
getBestPrice(dex2Address, dex1Address, tokenAddress, flashloanAmount),
]);

const profitDex1 = bestPriceDex1[0].sub(balanceDex1);
const profitDex2 = bestPriceDex2[0].sub(balanceDex2);

if (profitDex1.gt(0) && profitDex2.gt(0)) {
if (profitDex1.gt(profitDex2)) {
return {
dexAddress: dex1Address,
tokenAddress,
amount: flashloanAmount,
profit: profitDex1.toString(),
};
} else {
return {
dexAddress: dex2Address,
tokenAddress,
amount: flashloanAmount,
profit: profitDex2.toString(),
};
}
} else if (profitDex1.gt(0)) {
return {
dexAddress: dex1Address,
tokenAddress,
amount: flashloanAmount,
profit: profitDex1.toString(),
};
} else if (profitDex2.gt(0)) {
return {
dexAddress: dex2Address,
tokenAddress,
amount: flashloanAmount,
profit: profitDex2.toString(),
};
} else {
return null;
}
}

async function executeArbitrage() {
const bestOpportunity = await getBestOpportunities();

if (bestOpportunity) {
const txHash = await executeFlashloan(bestOpportunity.dexAddress, bestOpportunity.tokenAddress, bestOpportunity.amount);

console.log(`Flashloan executed with tx hash: ${txHash}`);

const profit = ethers.BigNumber.from(bestOpportunity.profit);

await executeTrade(bestOpportunity.dexAddress, bestOpportunity.tokenAddress, bestOpportunity.amount, profit);
} else {
  console.log('No arbitrage opportunity found');
  }
  }
  
  module.exports = { getBestOpportunities, executeArbitrage };