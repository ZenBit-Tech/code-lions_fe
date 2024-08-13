export interface INotification {
  id: string;
  text: string;
  type: string;
  createdAt: string;
}

export interface ICreateNotification {
  type: string;
  orderId?: number;
  userId?: string;
  shippingStatus?: string;
}
