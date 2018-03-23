import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { TooltipsModule } from 'ionic-tooltips';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    TooltipsModule,  
    DirectivesModule, 
    IonicPageModule.forChild(ProductsPage),
  ],
})
export class ProductsPageModule {}
