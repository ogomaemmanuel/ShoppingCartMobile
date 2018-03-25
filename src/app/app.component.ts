import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController,Nav, Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  customer:string=""
  rootPage: any = 'LoginPage';
  pageSettings: Array<{ title: string, page: any, icon: string }>;
  @ViewChild(Nav) nav: Nav;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    private events: Events,
    private menuCtrl: MenuController,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
    statusBar.styleDefault();
     statusBar.backgroundColorByHexString('#0039cb');
     statusBar.styleLightContent();     
     splashScreen.hide();
     
    });
    
    this.pageSettings = [
      { title: 'Home', page: 'ProductsPage', icon: "ios-home-outline" },      
      { title: 'Cart', page: 'CartPage', icon: "cart" },
      { title: 'Check Out', page: 'CheckOutPage', icon: "ios-log-out" },
      { title: 'Settings', page: 'SettingsPage', icon: "ios-settings-outline" },
      { title: 'Logout', page: 'LoginPage', icon: "ios-log-out" },
    ];

    this.events.subscribe("loggedInUserName", (data) => {
      this.customer = data;
      console.log("Subcription Userdetails",data)
      
    });
  }

  openPage(pageSetting) {
    this.menuCtrl.close();
    if (pageSetting.page == 'ProductsPage' || pageSetting.page == 'LoginPage') {
      this.nav.setRoot(pageSetting.page);
    }
    else
      this.nav.push(pageSetting.page);
  }
}

