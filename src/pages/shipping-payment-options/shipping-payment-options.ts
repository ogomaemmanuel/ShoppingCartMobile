import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Order } from '../../models/order';
import { BillingInfo } from '../../models/billingInfo';
import { CheckOutProvider } from '../../providers/check-out/check-out';
import { CheckoutOption } from '../../models/checkoutOption';
import { CartProvider } from '../../providers/cart/cart';
import { Product } from '../../models/product';
import { OrderItem } from '../../models/orderItem';

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

  orderSubTotal: number = 0;
  orderLineItems:any=[]
  orderTotalItems: number = 0;
  shipmentMethod: any = "";
  paymentMethod: string = "";
  checkoutOption: CheckoutOption =
    { paymentMethods: [], shipmentMethods: [] };
  private order: any={};
  constructor(
    public navCtrl: NavController,
    private cartProvider: CartProvider,
    public checkOutProvider: CheckOutProvider,
    public alertCtrl: AlertController,
    private toarsCtrl:ToastController,   
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    let billingInfo: BillingInfo = this.navParams.get("billingInfo");
    this.order = {
      paymentMethodId: this.paymentMethod,
      shipmentMethodId: this.shipmentMethod,
      orderDate:new Date(),
      status: "",
      notifyShopper: true,
      customerId: "",
      billingInfo: billingInfo,
      email: "",
      orderItems: []
    };
    console.log("Billing info in paymentPage", this.order.billingInfo);
  }

  ionViewDidLoad() {
    this.getShiCheckoutOptions();
  }

  showOrderSummary() {
    this.getOrderSummary();    
  }

  getShiCheckoutOptions() {
    this.checkOutProvider.getCheckOutOption().subscribe(options => {
      this.checkoutOption = options;
    })
  }
  getOrderSummary() {
  this.cartProvider.getCartItemsRemote().subscribe(products => {
      this.orderLineItems=products;      
      const reducer = (accumulator, currentValue: Product) => accumulator + (currentValue.price * currentValue.quantity);
      this.orderTotalItems = this.orderLineItems.length;
      this.orderSubTotal = this.orderLineItems.reduce(reducer, 0).toFixed(2);      
      let confirm = this.alertCtrl.create({
        title: 'Your order summary',
        message: '<p>Order subtotal ' + this.orderSubTotal +
                  '</p> <p>Total Items ' + this.orderTotalItems + '</p>',
        buttons: [
          {
            text: 'Comfirm',
            handler: () => {
              this.submitOrder();
            }
          },
          {
            text: 'Dismiss',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    })
  }

  submitOrder() {
    this.order.orderItems=this.orderLineItems;
    this.order.shipmentMethodId= this.shipmentMethod;
    this.order.paymentMethodId= this.paymentMethod;       
     this.checkOutProvider.submitOrder(this.order).subscribe(resp=>{
       let toast = this.toarsCtrl.create({
         message:"You order has been confirmed",
         duration: 5000,
       });
       toast.present();
      });
  }
}
