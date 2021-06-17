import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { UtilsService } from "../utils.service";
import { ConstantsService } from "../constants.service";
import { NftDataService } from '../nftDataService';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  nftList: any;

  constructor(public wallet:WalletService, public utils: UtilsService, public constants: ConstantsService, public nftDataService: NftDataService) { 
    this.nftList = [];
  }

  ngOnInit(): void {
    if (this.wallet.syncConnected) {
      this.loadData();
    }
    this.wallet.syncConnectedEvent.subscribe(() => {
      this.loadData();
    });
  }

  async loadData() {
    this.nftList = [];
    const state = await this.wallet.syncWallet.getAccountState(this.wallet.userAddress);
    for (let key in state.committed.nfts) {
      let data = await this.nftDataService.getData(key);
      this.nftList.push(data);
    }
  }

}
