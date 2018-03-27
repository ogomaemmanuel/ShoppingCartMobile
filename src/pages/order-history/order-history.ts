import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

 
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams) {
  }


  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }

}
