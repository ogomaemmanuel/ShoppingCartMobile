import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the ShoppingCartAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingCartAuthProvider {

  constructor(private angularFireAuth: AngularFireAuth,) {
    console.log('Hello ShoppingCartAuthProvider Provider');
  }
  
  loginUserWithEmailAndPassword(){

  }
  resetPassword(){

  }

  logoutUser(){

  }
  getCurrentUserDetails(){

  }

  private storeUserDetailsLocally(){
    
  }
}
