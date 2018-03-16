import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { CartProvider } from '../../providers/cart/cart';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage implements OnInit {

  public products: Product[];
  constructor(
    public navCtrl: NavController,
    private cartProvider: CartProvider,
    public navParams: NavParams, ) {
  }

  ngOnInit(): void {
    
  }

  ionViewDidLoad() {
    this.getCartItems();
  }

  removeFromCart(product: Product) {
    this.cartProvider.removeFromCart(product).then(() => {
      this.getCartItems();
    })
  }
  getCartItems() {
    this.cartProvider.getCartItems().then(products => {
      this.products = products;
    })
  }
}
