import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductsProvider } from '../providers/products/products';
import { CartProvider } from '../providers/cart/cart';
import { CheckOutProvider } from '../providers/check-out/check-out';
import { ShoppingCartHttpInterceptorProvider } from '../providers/shopping-cart-http-interceptor/shopping-cart-http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import {AngularFireModule} from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { TooltipsModule } from 'ionic-tooltips';
import { DirectivesModule } from '../directives/directives.module';
import { ShoppingCartAuthProvider } from '../providers/shopping-cart-auth/shopping-cart-auth';
import { IonicStorageModule } from '@ionic/storage';
import { OrderHistoryProvider } from '../providers/order-history/order-history';
import { EndPoint } from './app.endpoint.config';
@NgModule({
  declarations: [
    MyApp,   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireAuthModule, 
    BrowserAnimationsModule,
    DirectivesModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp,{
      scrollAssist: false,
      autoFocusAssist: false
		}),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
  ],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsProvider,
    CartProvider,
    CheckOutProvider,    
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ShoppingCartHttpInterceptorProvider,
        multi: true
      },
    //{provide:EndPoint,useValue:"http://shoppingcartapi20180317120238.azurewebsites.net/"},
    {provide:EndPoint,useValue:"http://1e75f28f.ngrok.io/"},
    ShoppingCartAuthProvider,
    OrderHistoryProvider    
  ]
})
export class AppModule {}
