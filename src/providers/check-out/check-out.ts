import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from '@firebase/util';
import { CheckoutOption } from '../../models/checkoutOption';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CheckOutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckOutProvider {
  private endPoint:string="http://shoppingcartapi20180317120238.azurewebsites.net/api/"
  constructor(public http: HttpClient) {
    console.log('Hello CheckOutProvider Provider');
  }


  getCheckOutOption():Observable<CheckoutOption>{
  return  this.http.get<CheckoutOption>(this.endPoint+"CheckoutOption");

  }

}
