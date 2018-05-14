import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingInfo } from '../../models/billingInfo';

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
      companyName: ['',Validators.compose([Validators.required])],
      firstName: ['',Validators.compose([Validators.required])],
      lastName: ['',Validators.compose([Validators.required])],
      address: ['',Validators.compose([Validators.required])],
      postalCode: ['',Validators.compose([Validators.required])],
      city: ['',Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

  goToShippingOption() {
   let billingInfo:BillingInfo=this.billingInfoForm.value ;
    this.navCtrl.push('ShippingPaymentOptionsPage',
      { billingInfo: billingInfo });
  }
}
