export interface ICartItem {
  id: string;
  userId: string;
  productId: string;
  vendorId: string;
  vendorName: string;
  name: string;
  productUrl: string;
  size: string;
  color: string;
  duration: number;
  price: number;
  createdAt: string;
}

export interface IStripeSessionResponse {
  url: string;
}

export interface IStripeSessionRequest {
  total: number;
  shippingPrice: number;
  productIds: string[];
}
