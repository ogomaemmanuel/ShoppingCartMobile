import { BillingInfo } from "./billingInfo";
import { OrderItem } from "./orderItem";

export interface Order {
    orderNo:number;
    email:string;
    paymentMethodId:string;    
    shipmentMethodId:string;    
    orderDate:string;
    status:string;
    notifyShopper:boolean;
    orderId:string;
    customerId:string;
    billingInfo:BillingInfo;
    orderItems:Array<OrderItem>;

}
       
   
