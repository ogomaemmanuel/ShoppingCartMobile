import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController,Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  pageSettings: Array<{ title: string, page: any, icon: string }>;
  @ViewChild(Nav) nav: Nav;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    private menuCtrl: MenuController,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      splashScreen.hide();
    });

    this.pageSettings = [
      
      { title: 'Home', page: 'HomePage', icon: "ios-home-outline" },      
      { title: 'Cart', page: 'CartPage', icon: "cart" },
      { title: 'Check Out', page: 'CheckOutPage', icon: "ios-log-out" },
      { title: 'Settings', page: 'SettingsPage', icon: "ios-settings-outline" },
      { title: 'Logout', page: 'LoginPage', icon: "ios-log-out" },
    ];
  }

  openPage(pageSetting) {
    this.menuCtrl.close();
    if (pageSetting.page == 'HomePage' || pageSetting.page == 'LoginPage') {
      this.nav.setRoot(pageSetting.page);
    }
    else
      this.nav.push(pageSetting.page);
  }
}

