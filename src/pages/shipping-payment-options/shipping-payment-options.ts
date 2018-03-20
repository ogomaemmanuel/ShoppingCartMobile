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
    this.getOrderSummary().then(() => {

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
    });
  }

  getShiCheckoutOptions() {
    this.checkOutProvider.getCheckOutOption().subscribe(options => {
      this.checkoutOption = options;
    })
  }
  getOrderSummary() {
    return this.cartProvider.getCartItems().then(products => {
      const reducer = (accumulator, currentValue: Product) => accumulator + (currentValue.price * currentValue.quantity);
      this.orderTotalItems = products.length;
      this.orderSubTotal = products.reduce(reducer, 0).toFixed(2);
    })
  }

  submitOrder() {
    return this.cartProvider.getCartItems().then(products => {
      let orderItems: any=[];
      products.forEach(element => {
        orderItems.push({
          price: element.price,
          qty: element.quantity,
          productId: element.productId,
          total: element.price * element.quantity,
        });
        this.order.orderItems=orderItems;
        this.order.shipmentMethodId= this.shipmentMethod;
        this.order.paymentMethodId= this.paymentMethod;
      });  
      console.log("The order sent to the server is",this.order);   
       this.checkOutProvider.submitOrder(this.order).subscribe(resp=>{
         console.log("The order sent to the server is",this.order);
         let toast = this.toarsCtrl.create({
           message:"You order has been confirmed",
           duration: 5000,
         });
         toast.present();

        });

     
    })

  }
}
