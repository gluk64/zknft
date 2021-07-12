import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  PINATA_SECRET = // used for uploading metdata JSON to IPFS, obtainable from pinata.cloud
  PINATA_SECRET = // used for uploading metdata JSON to IPFS, obtainable from pinata.cloud
  BLOCKNATIVE_KEY = // used for web3 onboarding modal
  INFURA_KEY = // used for zksync SDK, powers ethers.js integration 
  TRADE_SERVER = // used for posting off-chain trade orders
  NFTSTORAGE_KEY = // used for uploading images from IPFS, obtainable from nft.storage
}