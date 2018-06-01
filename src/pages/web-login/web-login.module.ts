import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebLoginPage } from './web-login';

@NgModule({
  declarations: [
    WebLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(WebLoginPage),
  ],
})
export class WebLoginPageModule {}
