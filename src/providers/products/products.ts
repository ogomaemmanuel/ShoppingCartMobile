import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';
import { EndPoint } from '../../app/app.endpoint.config';
import * as signalR from '@aspnet/signalr'

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {
  private productsEndPoint: string = "api/products/all";
  private endpoint:string="";
  //private endPoint:string="http://0edb49fb.ngrok.io/api/products/all"
  constructor(
    @Inject(EndPoint) endpoint: string,
    public http: HttpClient) {
      this.endpoint=endpoint;
    this.productsEndPoint = endpoint + this.productsEndPoint;
  }
  getAllProducts(): Observable<any> {
    return this.http.get(this.productsEndPoint).map(products => products)
  }
  getNotifiication(){
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(this.endpoint+"NotificationHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
    
   connection.start().catch(err => console.error(err.toString()));

   connection.on('sendToAll', (nick: string, receivedMessage: string) => {

    const text = `${nick}: ${receivedMessage}`;
  
   console.log("message received from the hub" ,text);
  
  });
  connection

      .invoke('sendToAll', "Emmanuel", "Hello everyone")

      .catch(err => console.error(err));
  }
  rateProduct(product: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(this.endpoint + "api/ProductRating", product, httpOptions).map(products => products)
  }




































  
}
