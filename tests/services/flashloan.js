const { ethers } = require('ethers');
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenBorrow",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountBorrow",
        "type": "uint256"
      }
    ],
    "name": "flashloan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
require('dotenv').config();

async function flashloan(providerUrl, contractAddress, amount) {
  // Connect to Ethereum network
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // Load contract
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Execute flashloan
  const tx = await contract.flashloan(amount);

  return tx.hash;
}

module.exports = {
  flashloan,
};
