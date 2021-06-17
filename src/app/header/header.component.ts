import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { ConstantsService } from '../constants.service';
import { BigNumber } from "bignumber.js";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  noFunds: boolean
  notActivated: boolean;
  depositAmount: any;
  l1EthBalance: any;
  l2EthBalance: BigNumber;

  constructor(public wallet:WalletService, public constants: ConstantsService) {
    this.l1EthBalance = new BigNumber(0);
    this.l2EthBalance = new BigNumber(0);
    this.noFunds = false;
    this.notActivated = false;
   }

  ngOnInit(): void {
  }

  connectWallet() {
    this.wallet.connect(async () => {
      this.l1EthBalance = new BigNumber(await this.wallet.web3.eth.getBalance(this.wallet.userAddress)).div(this.constants.PRECISION);
      this.zkConnect();
    }, () => {}, false);
  }

  async zkConnect() {
    await this.wallet.zkConnect();
    this.l2EthBalance = new BigNumber((await this.wallet.syncWallet.getBalance("ETH"))/this.constants.PRECISION);
    if ((this.l2EthBalance).eq(new BigNumber(0))) {
      this.noFunds = true;
    }
    else if (!(await this.wallet.syncWallet.isSigningKeySet())) {
      if ((await this.wallet.syncWallet.getAccountId()) !== undefined) {  
        this.notActivated = true;
      }
    }
  }

  dismissNoFunds() {
    this.noFunds = false;
  }

  dismissNotActivated() {
    this.notActivated = false;
  }

  async depositETH() {
    const deposit = await this.wallet.syncWallet.depositToSyncFromEthereum({
      depositTo: this.wallet.syncWallet.address(),
      token: "ETH",
      amount: new BigNumber(this.depositAmount).times(this.constants.PRECISION).integerValue().toFixed(),
      ethTxOptions: {
        gasLimit: 200000
      }
    });
    this.wallet.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ETH_EXPLORER + deposit.ethTx.hash}" target='_blank'>here</a>.
    `);
    const depositReceipt = await deposit.awaitVerifyReceipt();
    this.wallet.showToast(`
    Your transaction was verified!
    `);
    await this.zkConnect();
  }

  async setSigningKey() {
    const changePubkey = await this.wallet.syncWallet.setSigningKey({
      feeToken: "ETH",
      ethAuthType: "ECDSA",
    });
    this.wallet.showToast(`
    Your transaction was submitted! Track it <a href="${this.constants.ZK_EXPLORER + changePubkey.txHash.substring(8,)}">here</a>.
    `);
  }
}
