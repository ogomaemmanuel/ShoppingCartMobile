import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage implements OnInit {
  public products: Product[];
  constructor(
    public navCtrl: NavController,
    private productProvider: ProductsProvider,
    private cartProvider: CartProvider,
    private menuCtrl: MenuController,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.productProvider.getAllProducts().subscribe(products => {
      this.products = products;
      console.log(products);
    }, error => {
      console.log("error");
    });
  }
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  addToCart(product: Product) {
    console.log("product to add to cart", product);
    this.cartProvider.AddProductToCart(product);
  }

  removeFromCart(product: Product) {


  }
}
