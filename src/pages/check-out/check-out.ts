import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CheckOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage implements OnInit {
  billingInfoForm: FormGroup;
  @ViewChild('checkOutSlider') checkOutSlider: any;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.billingInfoForm = this.formBuilder.group({
      email: [''],
      companyName: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      postalCode: [''],
      city: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

  goToShippingOption() {
    this.navCtrl.push('ShippingPaymentOptionsPage',
      { billinInfo: this.billingInfoForm.value });
  }



}
