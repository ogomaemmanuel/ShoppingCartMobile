import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductsProvider } from '../../providers/products/products';

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
  rate: number=0;
  product: Product;
  ratingText: string = "";
  comment:string="";
  constructor(
    private alertCtrl:AlertController,
    private productProvider: ProductsProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.product = this.navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductRatingPage');
  }
  onModelChange(event: any) {
    if (this.rate === 1) {
      this.ratingText = "i hate it"
    }
    if (this.rate === 2) {
      this.ratingText = "i don't like it"
    }
    if (this.rate === 3) {
      this.ratingText = "it's ok"
    }
    if (this.rate === 4) {
      this.ratingText = "i like it"
    }
    if (this.rate === 5) {
      this.ratingText = "I love it"
    }

  }

  submitRating() {
    let productRating = {
      productId: this.product.productId,
      rating: this.rate,
      comment:this.comment

    }
    this.productProvider.rateProduct(productRating).subscribe(resp => {
      this.alertCtrl.create({
        message:"thanks for rating this product"
      }).present();  
    }, error => {      
    });
  }
}
