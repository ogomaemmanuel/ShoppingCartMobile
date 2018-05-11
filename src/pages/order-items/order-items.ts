import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderHistoryProvider } from '../../providers/order-history/order-history';

/**
 * Generated class for the OrderItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-items',
  templateUrl: 'order-items.html',
})
export class OrderItemsPage implements OnInit {

  orderItems: any = [];
  constructor(
    public navCtrl: NavController,
    private orderHistoryProvider: OrderHistoryProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    let orderId = this.navParams.get("orderId");
    this.orderHistoryProvider.getOrderLineItems(orderId).subscribe(orderItems => {
      this.orderItems = orderItems;
    }, error => {

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderItemsPage');
  }

}
