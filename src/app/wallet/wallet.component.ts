import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { ConstantsService } from '../constants.service';
import { BigNumber } from "bignumber.js";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  depositAmount: any;
  withdrawAmount: any;
  l1EthBalance: BigNumber;
  l2EthBalance: BigNumber;

  constructor(public wallet:WalletService, public constants: ConstantsService) {
    this.l1EthBalance = new BigNumber(0);
    this.l2EthBalance = new BigNumber(0);
   }

  ngOnInit(): void {
    if (this.wallet.syncConnected) {
      this.loadData();
    }
    this.wallet.syncConnectedEvent.subscribe(() => {
      this.loadData();
    });
  }

  setDepositAmount() {
    this.depositAmount = this.l1EthBalance;
  }

  setWithdrawAmount() {
    this.withdrawAmount = this.l2EthBalance;
  }

  async loadData() {
    this.l1EthBalance = new BigNumber(await this.wallet.web3.eth.getBalance(this.wallet.userAddress)).div(this.constants.PRECISION);
    this.l2EthBalance = new BigNumber((await this.wallet.syncWallet.getBalance("ETH"))/this.constants.PRECISION);
  }

  async depositETH() {
    await this.wallet.depositETH(new BigNumber(this.depositAmount).times(this.constants.PRECISION).integerValue().toFixed());
  }

  async withdrawETH() {
    await this.wallet.withdrawETH(new BigNumber(this.withdrawAmount).times(this.constants.PRECISION).integerValue().toFixed());
  }
}
