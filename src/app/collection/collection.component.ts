import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { UtilsService } from "../utils.service";
import { ConstantsService } from "../constants.service";
import { NftDataService } from '../nftDataService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  nftList: any;
  address: any;

  constructor(private activatedRoute: ActivatedRoute, public wallet:WalletService, public utils: UtilsService, public constants: ConstantsService, public nftDataService: NftDataService) { 
    this.nftList = [];
  }

  ngOnInit(): void {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');

    this.wallet.syncConnectedEvent.subscribe(() => {
      this.loadData();
    });

    this.activatedRoute.params.subscribe(routeParams => {
      this.address = routeParams.address;
      if (this.wallet.syncConnected) {
        this.loadData();
      }
    });
  }

  async loadData() {
    this.nftList = [];
    const state = await this.wallet.syncProvider.getState(this.address);
    for (let key in state.committed.nfts) {
      let data = await this.nftDataService.getData(key);
      this.nftList.push(data);
    }
  }

}
