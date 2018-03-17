import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingPaymentOptionsPage } from './shipping-payment-options';

@NgModule({
  declarations: [
    ShippingPaymentOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingPaymentOptionsPage),
  ],
})
export class ShippingPaymentOptionsPageModule {}
