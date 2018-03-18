import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';

/**
 * Generated class for the ProductRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-rating',
  templateUrl: 'product-rating.html',
})
export class ProductRatingPage implements OnInit {  
  rate:number;
  product:Product;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
   this.product=this.navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductRatingPage');
  }
  onModelChange(event:any){

  }
}
