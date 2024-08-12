export interface INotification {
  text: string;
  type: string;
  createdAt: string;
}

export interface ICreateNotification {
  type: string;
  orderId?: number;
  shippingStatus?: string;
}
