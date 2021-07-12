# zknft

zkNFT is a proof of concept NFT marketplace using the zkSync NFT API.

Steps to run locally:

1. Install all dependencies using npm
2. Fix issues in `node_modules` detailed [here](https://github.com/ChainSafe/web3.js/issues/1555) for `crypto` and `stream`.
3. Fill in the credentials in `credentials.service.ts` with your own API keys.