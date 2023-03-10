const { ethers } = require('ethers');
const { UniswapV2Router02 } = require('@uniswap/v2-periphery');
const abi = require('../abis/uniswapV2Router02.json');

const INFURA_API_KEY = 'YOUR_INFURA_API_KEY_HERE';
const provider = new ethers.providers.InfuraProvider('mainnet', INFURA_API_KEY);

const dex = new ethers.Contract(
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  abi,
  provider
);

const getBalance = async (dexAddress, tokenAddress, address) => {
  const balance = await dex.balanceOf(tokenAddress, address);
  return balance.toNumber();
};

const getBestPrice = async (dexAddress1, dexAddress2, tokenAddress, amount) => {
  const router1 = new UniswapV2Router02(dexAddress1, abi);
  const router2 = new UniswapV2Router02(dexAddress2, abi);

  const [amountIn1, amountOut1] = await router1.getAmountsOut(amount, [tokenAddress, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']);
  const [amountIn2, amountOut2] = await router2.getAmountsOut(amount, [tokenAddress, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']);

  return amountOut1 > amountOut2 ? [amountOut1, dexAddress1] : [amountOut2, dexAddress2];
};

const executeTrade = async (dexAddress, tokenAddress, amount, slippage) => {
  const router = new UniswapV2Router02(dexAddress, abi);
  const path = [tokenAddress, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'];
  const to = 'YOUR_PUBLIC_ADDRESS_HERE';
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountOutMin = Math.floor(amount - amount * slippage);
  const gasPrice = ethers.utils.parseUnits('30', 'gwei');

  const tx = await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
    amount,
    amountOutMin,
    path,
    to,
    deadline,
    { gasPrice }
  );

  await tx.wait();
};

module.exports = {
  getBalance,
  getBestPrice,
  executeTrade,
};
