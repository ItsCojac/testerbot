require('dotenv').config();

module.exports = {
  web3ProviderUrl: process.env.WEB3_PROVIDER_URL,
  flashloanProvider: process.env.FLASHLOAN_PROVIDER,
  aaveV2ProviderUrl: process.env.AAVE_V2_PROVIDER_URL,
  aaveV2LendingPoolAddress: process.env.AAVE_V2_LENDING_POOL_ADDRESS,
  aaveV2ReferralCode: process.env.AAVE_V2_REFERRAL_CODE,
  uniswapV2RouterAddress: process.env.UNISWAP_V2_ROUTER_ADDRESS,
  sushiswapRouterAddress: process.env.SUSHISWAP_ROUTER_ADDRESS,
  userPrivateKey: process.env.USER_PRIVATE_KEY,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
};
