import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { HomeComponent } from './home/home.component';
import { MintComponent } from './mint/mint.component';
import { ViewComponent } from './view/view.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mint',
    component: MintComponent
  },
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
