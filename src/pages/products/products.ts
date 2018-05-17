import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, Events, PopoverController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { CartProvider } from '../../providers/cart/cart';
import * as signalR from '@aspnet/signalr'
import { SignalrNoticationsProvider } from '../../providers/signalr-notications/signalr-notications';
import { ProductSharingProvider } from '../../providers/product-sharing/product-sharing';


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
  msgs: any = [];
  customer:string="";
  public cartTotal:number=0;
  constructor(
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private productProvider: ProductsProvider,
    private cartProvider: CartProvider,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public signalrNoticationsProvider:SignalrNoticationsProvider,
    private events:Events,
    private productSharingProvider: ProductSharingProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.events.subscribe("cartCountChanged",(cartcount)=>{
      this.cartTotal=cartcount;
    })
  this.customer=  this.navParams.get("loggedInUser");    
    this.events.publish("loggedInUserName",this.customer);
    let loader=this.loadingCtrl.create({
      content:"loading....",
      spinner:'dots'

    });
    loader.present();
    this.productProvider.getAllProducts().subscribe(products => {
      this.products = products;
      loader.dismiss();
    }, error => {
      loader.dismiss();
      console.log("error");
    });
    this.signalrNoticationsProvider.getNotifiication();
  }
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  addToCart(product: Product) {
    console.log("product to add to cart", product);
    let alert = this.alertCtrl.create({
      title: 'Cart',
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type:'number'
        },        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.cartProvider.AddProductToCartRemote(product,data.quantity).subscribe(x=>{

              console.log("product added to cart");
            });
          }
        }
      ]
    });
    alert.present();
  

    
    
  }

  removeFromCart(product: Product) {

  }
  rateProduct(product: Product){
    console.log("product to rate is",product);
    this.navCtrl.push("ProductRatingPage",{product:product});
  }
  goToCartPage(){
    this.navCtrl.push("CartPage");
  }

  presentExtraMenuPopover(event: any) {

    let popover = this.popoverCtrl.create('MorePage');

    popover.present({

      ev: event

    });

  }
  shareProduct(product:Product){
    console.log("Share clicked");
    this.productSharingProvider.ShareOnAnyApp(product)
  }
}
