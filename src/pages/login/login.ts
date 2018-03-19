import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../../models/user';


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

  userLoginFormGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.userLoginFormGroup = this.formBuilder.group({

      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
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
      this.navCtrl.setRoot("ProductsPage");

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
