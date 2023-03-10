# Flashloan Arbitrage Bot

This is a flashloan arbitrage bot for cryptocurrency trading.

## Getting started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - `PRIVATE_KEY` - Private key for the account used by the bot
   - `INFURA_PROJECT_ID` - Project ID for Infura
   - `ETHERSCAN_API_KEY` - API key for Etherscan
   - `DB_URL` - URL for the database
   - `JWT_SECRET` - Secret for JWT
4. Start the server: `npm start`

## Usage

### Authentication

Before using the API, you must authenticate by sending an `X-API-Key` header with a valid API key.

#### Signup

POST /auth/signup

{
"username": "user",
"password": "password"
}
POST /auth/signup

{
"username": "user",
"password": "password"
}


#### Login

POST /auth/login

{
"username": "user",
"password": "password"
}


### Arbitrage

#### Get best arbitrage opportunities

GET /arbitrage


#### Execute arbitrage trade

POST /arbitrage

{
"token": "0x1111111111111111",
"dex1": "0x1234567890abcdef",
"dex2": "0xabcdef0123456789",
"amount": 100
}


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
