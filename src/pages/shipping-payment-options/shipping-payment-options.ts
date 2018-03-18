import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order';
import { BillingInfo } from '../../models/billingInfo';
import { CheckOutProvider } from '../../providers/check-out/check-out';
import { CheckoutOption } from '../../models/checkoutOption';

/**
 * Generated class for the ShippingPaymentOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shipping-payment-options',
  templateUrl: 'shipping-payment-options.html',
})
export class ShippingPaymentOptionsPage implements OnInit {

  shipmentMethod: any = "";
  paymentMethod: string = "";
  checkoutOption:CheckoutOption=
  {paymentMethods:[],shipmentMethods:[]};
  private order: Order;
  constructor(
    public navCtrl: NavController,
    public checkOutProvider:CheckOutProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    let billingInfo: BillingInfo = this.navParams.get("billingInfo");
    this.order={
      billingInfo:billingInfo,
      customerId:"",
      email:"",
      notifyShopper:true,
      orderDate:"",
      orderId:"",
      orderItems:[],
      orderNo:0,
      paymentMethodId:this.paymentMethod,
      shipmentMethodId:this.shipmentMethod,
      status:""
    };
    console.log("Billing info in paymentPage", this.order.billingInfo);
  }

  ionViewDidLoad() {
   this.getShiCheckoutOptions();
  }

  checkOut() {
    //this.
  }

  getShiCheckoutOptions(){
    this.checkOutProvider.getCheckOutOption().subscribe(options=>{
      this.checkoutOption=options;
    })

    
  }
}
