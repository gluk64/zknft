import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  PRECISION = 1e18;
  ZKNETWORK = "ropsten";
  MAP = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  IPFS_GATEWAY = "https://ipfs.io/ipfs/";
  ZK_EXPLORER = "https://ropsten.zkscan.io/explorer/transactions/";
  ETH_EXPLORER = "https://ropsten.etherscan.io/tx/";
  ZK_WALLET = "https://wallet.zksync.io/";
}