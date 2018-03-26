import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
   passwordMinlegth=6;
  userLoginFormGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private storage:Storage,    
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.userLoginFormGroup = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(7)])],
    })
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

    this.menuCtrl.swipeEnable(false)



  }

  ionViewWillEnter() {

    this.menuCtrl.swipeEnable(false)

  }



  ionViewDidLeave() {



    this.menuCtrl.swipeEnable(false)

  }

  login() {
    let user: User = this.userLoginFormGroup.value;
    this.angularFireAuth.auth.signInWithEmailAndPassword(user.userName, user.password).then(resp => {


     // this.events.publish("loggedInUserName",resp.email)
     //console.log("Bearer Token",resp.stsTokenManager.accessToken); 
      console.log("LoggedIn UserDetails",JSON.stringify(resp))      
      this.storage.set("loggedInUserDetails",JSON.stringify( resp)).then(()=>{
        this.navCtrl.setRoot("ProductsPage",{loggedInUser:resp.email});
      })
     
    }).catch(error => {     
     this.alertLoginError(error.message);
    })
  }

  goToRegistrationPage() {

    this.navCtrl.push('RegisterPage')

  }
  alertLoginError(message: any) {
    this.alertCtrl.create({
      message: message,
      title: "Login Error",
      buttons: [{
        text: "ok"
      }]
    }).present();

  }

}
