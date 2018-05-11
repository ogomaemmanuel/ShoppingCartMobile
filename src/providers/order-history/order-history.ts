import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import { EndPoint } from '../../app/app.endpoint.config';

/*
  Generated class for the OrderHistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderHistoryProvider {
private endPoint:string=""
  constructor(
    @Inject( EndPoint ) endpoint:string, 
    public http: HttpClient,
    private storage:Storage
  ) {
    this.endPoint=endpoint;
    console.log('Hello OrderHistoryProvider Provider');
  }
getCustomerOrders(){
  return Observable.fromPromise(this.storage.get("loggedInUserDetails")).mergeMap((userDetails:any)=>{
   return this.http.get(this.endPoint+"api/orders/customer/"+JSON.parse(userDetails).uid);
  })
}
getOrderLineItems(orderId:any){  
    return this.http.get(this.endPoint+"api/orders/order-items/"+orderId);   
}
}
