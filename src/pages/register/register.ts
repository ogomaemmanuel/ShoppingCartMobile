import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage   implements OnInit{
 
  user:any={};
  constructor(
     public navCtrl: NavController,
     private formBuilder: FormBuilder,
     private angularFireAuth:AngularFireAuth,
     private alertCtrl:AlertController,
     public navParams: NavParams) {
  }
  ngOnInit(): void {
    
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    let user:User={password:this.user.password,userName:this.user.userName};
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.userName,user.password).then(resp=>{
let alert= this.alertCtrl.create({
  message:"Account Created Successfully",
  buttons:[
    {
      text:"ok",
      role:"ok"
    },
  ]
})
alert.present();

    })
  }

}
