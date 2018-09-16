import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the WebLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-web-login',
  templateUrl: 'web-login.html',
})
export class WebLoginPage implements OnInit {

  
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebLoginPage');
  }


}
