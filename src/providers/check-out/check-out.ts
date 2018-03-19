import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
//import { Observable } from '@firebase/util';
import { CheckoutOption } from '../../models/checkoutOption';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../models/order';

/*
  Generated class for the CheckOutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckOutProvider {
  private endPoint:string="http://shoppingcartapi20180317120238.azurewebsites.net/api/"
  //private endPoint:string="http://0edb49fb.ngrok.io/api/"

  
  constructor(public http: HttpClient) {
    console.log('Hello CheckOutProvider Provider');
  }
  getCheckOutOption():Observable<CheckoutOption>{
  return  this.http.get<CheckoutOption>(this.endPoint+"CheckoutOption");
  }

  getOrderSummary(){

  }

  submitOrder(order:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Accept': 'application/json'      
      })
    };
   return this.http.post(this.endPoint+"Orders",order,httpOptions)
  }
}
