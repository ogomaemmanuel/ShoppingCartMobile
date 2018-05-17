import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { EndPoint } from '../../app/app.endpoint.config';
import { Events } from 'ionic-angular';
import{Storage} from '@ionic/storage';
import { Product } from '../../models/product';
/*
  Generated class for the SignalrNoticationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignalrNoticationsProvider {
endPoint: string="";
  constructor(
  @Inject(EndPoint) endpoint: string,
  private events:Events,
  private storage:Storage,
  public http: HttpClient) {
    this.endPoint=endpoint;
  }

  getNotifiication(){
    
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(this.endPoint+"Signalr/NotificationHub",{transport: signalR.HttpTransportType.LongPolling,skipNegotiation:false})
    .configureLogging(signalR.LogLevel.Information)
    
    .build();
    
   connection.start().then(()=>{
    this.storage.get("loggedInUserDetails").then(userdetails=>{
      connection
      .invoke('RegisterUser', JSON.parse(userdetails).uid);
    })
    
   }).catch(err => console.error(err.toString()));
   
   connection.on('SendToAll', (messageType: string, receivedMessage: string) => {
    console.log("Message from SignalR",receivedMessage);
     if(messageType=="BasketChanged"){
       console.log("BasketChanged",receivedMessage);
      this.events.publish("cartCountChanged", receivedMessage);

     }

     connection.on("ProductChange",(product:string)=>{
      this.events.publish("productChangeEvent", product);
     })

    
  
  });
  }

}
