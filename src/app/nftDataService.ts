import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';
import { UtilsService } from "./utils.service";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: 'root'
})
export class NftDataService {

  constructor(public wallet:WalletService, public utils:UtilsService, public constants:ConstantsService) {}

  keySuffix = "_key";

  getKey(id) {
    return id + this.keySuffix;
  }

  storeData(id, data) {
    let key = this.getKey(id);
    window[key] = data;
  }

  exists(id) {
    let key = this.getKey(id);
    return window[key] !== undefined;
  }

  async getData(id) {

    // Read from local storage
    if (this.exists(id)) {
      let key = this.getKey(id);
      return window[key];
    }

    // Read from zksync + parse from IPFS
    else {
      
      let nft = await this.wallet.syncProvider.getNFT(parseInt(id));

      // Assume we don't know anything about it at first
      let baseNftData = {
        "name": "Name Unknown",
        "image": "https://i.imgur.com/nwZRdjr.png"
      };
              
      // Grab info from the syncProvider
      baseNftData["id"] = nft.id;
      baseNftData["address"] = nft.address;
      baseNftData["creatorAddress"] = nft.creatorAddress;
      baseNftData["contentHash"] = nft.contentHash;

      // Grab info from IPFS
      let contentHash = "1220" + nft.contentHash.substring(2,);
      let ipfsHash = this.utils.toB58(this.utils.hex2huf(contentHash), this.constants.MAP);
      let dataResponse = await fetch(this.constants.IPFS_GATEWAY + ipfsHash);
      
      let nftData = await dataResponse.json();

      // Parse as much information as possible
      for (let k in nftData) {
        if (nftData[k] !== "") {
          baseNftData[k] = nftData[k];
          // Add https to URL if missing
          if (k === "external_url") {
            let link = nftData[k];
            link = (link.indexOf('://') === -1) ? 'https://' + link : link;
            baseNftData[k] = link;
          }
        }
      }

      // Cache data
      this.storeData(nft.id, baseNftData);
      return baseNftData;
      }
    }
}