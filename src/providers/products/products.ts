import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {
private endPoint:string="http://shoppingcartapi20180317120238.azurewebsites.net/api/products/all"
  constructor(public http: HttpClient) {
    console.log('Hello ProductsProvider Provider');
  }
getAllProducts():Observable<any>{
return this.http.get(this.endPoint).map(products=>products)
}



}
