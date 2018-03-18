import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Product } from '../../models/product';
import { AlertController, Platform } from 'ionic-angular';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  database: SQLiteObject;
  constructor(
    private sqlite: SQLite,
    private AlertCtrl: AlertController,
    private platform:Platform
  ) {
    platform.ready().then(() => {     
      this.createCartTable();
  });
  }

  createCartTable() {   
    this.sqlite.create({
      name: "cart",
      location: "default"
    }).then((db: SQLiteObject) => {
      this.database=db;
      db.executeSql('CREATE TABLE IF NOT EXISTS '
        + 'customer_cart(product_id TEXT PRIMARY KEY, product_name TEXT, product_media_file TEXT,'
        + ' product_sku TEXT, product_category TEXT,price REAL, shopper_review INT,quantity INT)', {}
      )
    }).then(dbresp=>{
      
    },error=>{
      
    })  
  }

  AddProductToCart(product: Product,quantity:number) {      
      this.database.executeSql('INSERT INTO customer_cart VALUES(?,?,?,?,?,?,?,?)',
        [product.productId,
        product.productName,
        product.productMediaFile,
        product.productSku,
        product.productCategory,
        product.price,
        product.shopperReview,
        quantity
        ]).then(()=>{
          let alert = this.AlertCtrl.create({
            message:"product added to cart",
            buttons: ['Ok']
          })
          alert.present(); 

        })
  }

  removeFromCart(product: Product){
  
   return this.database.executeSql('Delete from customer_cart where product_id=?',
        [product.productId, 
        ]).then(dbresp=>{
          console.log("product successfully removed from cart to db");
        })
   
  }

  getCartItems(){

    return this.database.executeSql("SELECT * FROM customer_cart", []).then((data) => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          products.push({ 
            productId: data.rows.item(i).product_id,
            productName: data.rows.item(i).product_name, 
            productMediaFile: data.rows.item(i).product_media_file,
            productSku: data.rows.item(i).product_sku,
            productCategory: data.rows.item(i).product_category,
            price: data.rows.item(i).price,
            shopperReview: data.rows.item(i).shopper_review,
            quantity:data.rows.item(i).quantity,
             });
        }
      }
      return products;
    }, err => {
      console.log('Error: ', err);
      return [];
    });  
  }
}
