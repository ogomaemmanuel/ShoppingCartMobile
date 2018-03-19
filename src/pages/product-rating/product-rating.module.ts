import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductRatingPage } from './product-rating';
import { Ionic2RatingModule } from "ionic2-rating";
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    ProductRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductRatingPage),
    Ionic2RatingModule ,
    TooltipsModule

  ],
})
export class ProductRatingPageModule {}
