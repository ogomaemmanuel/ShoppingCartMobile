import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { OrderHistoryProvider } from '../../providers/order-history/order-history';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage implements OnInit {

  customerOrders: any = new Array({});
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private orderHistoryProvider: OrderHistoryProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getCustomersOrder();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }
  getCustomersOrder() {
    this.orderHistoryProvider.getCustomerOrders().subscribe(orders => {
      this.customerOrders = orders;
      console.log("customer Orders", this.customerOrders.length)
    })
  }
  goToOrderDetails(order: any) {
    console.log(order.orderId);
    this.navCtrl.push("OrderItemsPage", { orderId: order.orderId });
  }
}
