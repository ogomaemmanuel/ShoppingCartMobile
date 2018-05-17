import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Product } from '../../models/product';
/*
  Generated class for the ProductSharingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductSharingProvider {

  constructor(
    private socialSharing: SocialSharing,
    public http: HttpClient) {
    console.log('Hello ProductSharingProvider Provider');
  }
shareOnWhatsApp(product:Product){
  console.log("Sharing service called ")
this.socialSharing.shareViaWhatsApp("Hey carina, checkout this product, i think you may like it",null,null)
}
shareOnFaceBook(product:Product){
  this.socialSharing.shareViaFacebook("Hey carina, checkout this product, i think you may like it",null,null)
}
ShareOnTwitter(product:Product){
  this.socialSharing.shareViaTwitter("Hey carina, checkout this product, i think you may like it",null,null)
}
ShareOnAnyApp(product:Product){
  this.socialSharing.share("Hey carina, checkout this product, i think you may like it",null,null)
}
}
