import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';

/*
  Generated class for the OrderHistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderHistoryProvider {
private endPoint:string="http://shoppingcartapi20180317120238.azurewebsites.net/"
  constructor(
    public http: HttpClient,
    private storage:Storage
  ) {
    console.log('Hello OrderHistoryProvider Provider');
  }
getCustomerOrders(){
  return Observable.fromPromise(this.storage.get("loggedInUserDetails")).mergeMap((userDetails:any)=>{
   return this.http.get(this.endPoint+"api/Orders/customer/"+JSON.parse(userDetails).uid);
  })
}
}
