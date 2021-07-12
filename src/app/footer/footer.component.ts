import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  zkscan: any;
  zkwallet: any;

  constructor(constants: ConstantsService) {
    this.zkscan = constants.ZK_EXPLORER;
    this.zkwallet = constants.ZK_WALLET;
   }

  ngOnInit(): void {
  }

}
