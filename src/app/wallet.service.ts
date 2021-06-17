import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Web3Enabled } from './web3Enabled';
import Web3 from 'web3';
import { WEB3 } from './web3';
import { isNullOrUndefined } from 'util';
import { closestPackableTransactionFee, getDefaultProvider, Provider, Wallet } from "zksync";
import { ConstantsService } from './constants.service';
import {ethers} from 'ethers'
import { HotToastService } from '@ngneat/hot-toast';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends Web3Enabled {
  connectedEvent: EventEmitter<null>;
  errorEvent: EventEmitter<null>;

  syncWallet: any;
  syncProvider: any;
  syncConnected: boolean;
  syncConnectedEvent: EventEmitter<null>;

  constructor(@Inject(WEB3) public web3: Web3, public constants: ConstantsService, private toastService: HotToastService, public credentials: CredentialsService) {
    super(web3, credentials);
    this.connectedEvent = new EventEmitter<null>();
    this.errorEvent = new EventEmitter<null>();
    this.syncConnectedEvent = new EventEmitter<null>();
    this.syncConnected = false;
  }

  public get userAddress(): string | null {
    return this.state.address;
  }

  public get connected(): boolean {
    return !isNullOrUndefined(this.userAddress);
  }

  async connect(onConnected, onError, isStartupMode: boolean) {
    const _onConnected = () => {
      this.connectedEvent.emit();
      onConnected();
    };
    const _onError = () => {
      this.errorEvent.emit();
      onError();
    }
    await super.connect(_onConnected, _onError, isStartupMode);
  }

  async zkConnect() {
    const ethWallet: ethers.providers.JsonRpcSigner = new ethers.providers.Web3Provider(this.web3.currentProvider as any).getSigner();
    this.syncProvider = await getDefaultProvider((this.constants.ZKNETWORK as any), "HTTP");
    this.syncWallet = await Wallet.fromEthSigner(ethWallet, this.syncProvider);
    this.syncConnected = true;
    this.syncConnectedEvent.emit();
  }

  showToast(msg) {
    this.toastService.show(
      msg, 
      {
        autoClose: true,
        dismissible: true,
        position: 'bottom-right',
        style: {
          border: '1px solid #333333',
          color: '#ffffff',
          backgroundColor: '#000000',
          borderRadius: '4px',
          padding: '0.5rem 0.5rem'
        }
      });
  }

  async depositETH(amount) {
    const deposit = await this.syncWallet.depositToSyncFromEthereum({
      depositTo: this.syncWallet.address(),
      token: "ETH",
      amount: amount,
      ethTxOptions: {
        gasLimit: 200000
      }
    });
    this.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ETH_EXPLORER + deposit.ethTx.hash}" target='_blank'>here</a>.
    `);
    const depositReceipt = await deposit.awaitVerifyReceipt();
    console.log(depositReceipt);
    this.showToast(`
    Your transaction was verified!
    `);
  }

  async withdrawETH(amount) {
    const withdraw = await this.syncWallet.withdrawFromSyncToEthereum({
      ethAddress: this.userAddress,
      token: "ETH",
      amount: amount,
    });
    this.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ETH_EXPLORER + withdraw.txHash.substring(8,)}" target='_blank'>here</a>.
    `);
  }
}
