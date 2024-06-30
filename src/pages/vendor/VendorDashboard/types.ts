export type Category = 'Clothing' | 'Shoes' | 'Bags' | 'Accessories';

export interface Order {
  id: number;
  number: number;
  datePlaced: string;
  status: string;
  items: OrderItem[];
  amount: number;
}

export interface OrderItem {
  name: string;
  category: Category;
  size: string;
  price: number;
  quantity: number;
}
