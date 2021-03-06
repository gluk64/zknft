import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { UtilsService } from "../utils.service";
import { ConstantsService } from "../constants.service";
import { CredentialsService } from '../credentials.service';
import { DomSanitizer} from '@angular/platform-browser';
import { NFTStorage } from 'nft.storage';
const pinataSDK = require('@pinata/sdk');

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.css']
})
export class MintComponent implements OnInit {

  pinata: any;
  nftStorageClient: NFTStorage;

  name: any;
  description: any;
  image: any;
  imageURL: any;
  notUpload: boolean;
  externalURL: any;
  recipientAddress: any;

  isLoading: any;
  loadingMessage: any;

  constructor(public wallet:WalletService, public utils: UtilsService, public constants: ConstantsService, public credentials: CredentialsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageURL = "../assets/placeholder.svg";
    this.pinata = pinataSDK(this.credentials.PINATA_KEY, this.credentials.PINATA_SECRET);
    this.nftStorageClient = new NFTStorage({token: this.credentials.NFTSTORAGE_KEY});
    this.isLoading = false;
  }

  async mintNFT() {
    this.isLoading = true;
    
    // Activate account if it's not activated
    if (!(await this.wallet.syncWallet.isSigningKeySet())) {
      this.loadingMessage = "Activating Account..."
      if ((await this.wallet.syncWallet.getAccountId()) !== undefined) {
        const changePubkey = await this.wallet.syncWallet.setSigningKey({
          feeToken: "ETH",
          ethAuthType: "ECDSA",
        });
        this.wallet.showToast(`
        Your transaction was submitted! Track it <a href="${this.constants.ZK_EXPLORER + changePubkey.txHash.substring(8,)}">here</a>.
        `);
      }
    }

    this.loadingMessage = "Uploading Data...";
    
    const body = {
      "name": this.name,
      "image": this.image,
      "description": this.description,
      "external_url": this.externalURL
    }
    let results = await this.pinata.pinJSONToIPFS(body);
    let ipfsHash = results["IpfsHash"];

    let contentHash = this.utils.buf2hex(this.utils.fromB58(ipfsHash, this.constants.MAP)).substring(4,);
    this.loadingMessage = "Minting NFT..."
    let mintTx = await this.wallet.syncWallet.mintNFT({
      recipient: this.wallet.userAddress,
      contentHash: "0x" + contentHash,
      feeToken: "ETH"
    });
    this.wallet.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ZK_EXPLORER + mintTx.txHash.substring(8,)}" target="_blank">here</a>.
    `);
    this.isLoading = false;
  }

  async uploadImage(files) {
    let file = files.item(0);
    let ipfasHash = await this.nftStorageClient.storeBlob(file);
    this.image = this.constants.IPFS_GATEWAY + ipfasHash;
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

}
