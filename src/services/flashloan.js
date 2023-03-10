const { ethers } = require('ethers');
const abi = require('./flashloan-abi.json');

async function flashloan(dexAddress, tokenAddress, amount) {
  const privateKey = process.env.PRIVATE_KEY;
  const providerUrl = process.env.PROVIDER_URL;
  const flashloanAddress = process.env.FLASHLOAN_ADDRESS;

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const flashloanContract = new ethers.Contract(flashloanAddress, abi, wallet);

  const data = flashloanContract.interface.encodeFunctionData('flashloan', [dexAddress, tokenAddress, amount]);

  const tx = await wallet.sendTransaction({
    to: flashloanAddress,
    data: data,
    gasLimit: 3000000,
  });

  const receipt = await tx.wait();

  return receipt;
}

module.exports = {
  flashloan,
};
