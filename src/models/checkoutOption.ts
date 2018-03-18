import { PaymentMethod } from "./paymentMethod";
import { ShipmentMethod } from "./ShipmentMethod";

export interface CheckoutOption {
    paymentMethods:  PaymentMethod[];
    shipmentMethods: ShipmentMethod[];
}