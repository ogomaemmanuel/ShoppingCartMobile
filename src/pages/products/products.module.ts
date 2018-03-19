import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    TooltipsModule,   
    IonicPageModule.forChild(ProductsPage),
  ],
})
export class ProductsPageModule {}
