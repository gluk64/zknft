import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { UtilsService } from "../utils.service";
import { ConstantsService } from "../constants.service";
import { Router, ActivatedRoute } from '@angular/router';
import { utils as zkUtils} from "zksync";
import { NftDataService } from '../nftDataService';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  nftId: any;
  nft: any;
  isOwner: boolean;
  recipientAddress: any;
  nftData: any;
  hasExternalLink: boolean;
  showTransfer: boolean;
  
  selectedNftId: any;
  ownedNftList: any;
  showOfferModal: boolean;

  swapOffers: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public wallet: WalletService, public utils: UtilsService, public constants: ConstantsService, public nftDataService: NftDataService, public credentials: CredentialsService) {
    this.isOwner = false;
    this.nft = {
      "name": "...",
      "image": "../assets/placeholder.svg",
      "description": "..."
    };
    this.hasExternalLink = false;
    this.showTransfer = false;
    this.ownedNftList = [];
    this.showOfferModal = false;
    this.swapOffers = [];
   }

  ngOnInit(): void {
    this.nftId = this.activatedRoute.snapshot.paramMap.get('id');
    this.wallet.syncConnectedEvent.subscribe(() => {
      this.loadData();
    });

    this.activatedRoute.params.subscribe(routeParams => {
      this.nftId = routeParams.id;
      if (this.wallet.syncConnected) {
        this.loadData();
      }
    });
  }

  async loadData() {
    const state = await this.wallet.syncWallet.getAccountState(this.wallet.userAddress);
    this.nft = await this.nftDataService.getData(this.nftId);
    if (this.nftId in state.verified.nfts) {
      this.isOwner = true;
    }

    // Load swap offers from server
    let tradeEndpoint = this.credentials.TRADE_SERVER + 'assets/' + this.nftId;
    let response = await fetch(tradeEndpoint, {
      method: 'GET'
    });
    this.swapOffers = await response.json();

    // Get NFT data for each offer if applicable
    // Otherwise populate with blank object
    for (let o of this.swapOffers) {
      let id = parseInt(o.data.tokenSell);
      if (id !== NaN) {
        o["assetData"] = this.nftDataService.getData(id);
      }
      else {
        o["assetData"] = {};
      }
    }
  }

  async transfer() {
    let tx = await this.wallet.syncWallet.syncTransferNFT({
      to: this.recipientAddress,
      token: this.nft,
      feeToken: "ETH"
    });
    // note that tx is an array of two transactions so we just grab the second one for now
    this.wallet.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ZK_EXPLORER + tx[1].txHash.substring(8,)}" target="_blank">here</a>.
    `);
  }

  async offerNft() {
    const order = await this.wallet.syncWallet.getOrder({
      tokenSell: parseInt(this.selectedNftId),
      tokenBuy: parseInt(this.nftId),
      amount: 1,
      ratio: zkUtils.tokenRatio({
          [parseInt(this.selectedNftId)]: 1,
          [parseInt(this.nftId)]: 1
      })
    });
    let tradeEndpoint = this.credentials.TRADE_SERVER + 'assets/' + this.nftId;
    fetch(tradeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(order)
    });
    this.closeOfferModal();
  }

  async openOfferModal() {
    this.showOfferModal = true;
    if (this.ownedNftList.length === 0) {
      const state = await this.wallet.syncWallet.getAccountState(this.wallet.userAddress);
      for (let key in state.committed.nfts) {
        let data = await this.nftDataService.getData(key);
        this.ownedNftList.push(data);
      }
    }
  }

  async closeOfferModal() {
    this.showOfferModal = false;
  }

  async accept(order) {
    let order1 = order.data;
    let order2 = await this.wallet.syncWallet.getOrder({
      tokenSell: parseInt(this.nftId),
      tokenBuy: parseInt(order.data.tokenSell),
      amount: 1,
      ratio: zkUtils.tokenRatio({
          [parseInt(order.data.tokenSell)]: 1,
          [parseInt(this.nftId)]: 1
      })
    });
    const swap = await this.wallet.syncWallet.syncSwap({
      orders: [
        order1, order2
      ],
      feeToken: 'ETH'
    });
    this.wallet.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ZK_EXPLORER + swap.txHash.substring(8,)}" target="_blank">here</a>.
    `);
  }

  copy(s) {
    this.wallet.showToast("Copied!");
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value =  s;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  truncate(s) {
    return s.substring(0, 10) + "...";
  }

  toggleShowTransfer() {
    this.showTransfer = !this.showTransfer;
  }

  setSelectedNftId(id) {
    this.selectedNftId = id;
  }
}
