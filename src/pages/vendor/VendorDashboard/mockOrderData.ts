import { Category, Order, OrderItem } from './types';

/* eslint-disable no-magic-numbers */
function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default function generateMockOrders(): Order[] {
  const statuses = [
    'New order',
    'Sent',
    'Delivered',
    'Received',
    'Waiting for returning',
    'Returned',
  ];

  const itemSizes: Record<Category, string[]> = {
    Clothing: ['XS', 'S', 'M', 'L', 'XL'],
    Shoes: ['35', '36', '37', '38', '39', '40', '41'],
    Bags: ['one size'],
    Accessories: ['one size'],
  };

  const items: { name: string; category: Category }[] = [
    { name: 'Dress', category: 'Clothing' },
    { name: 'Skirt', category: 'Clothing' },
    { name: 'T-shirt', category: 'Clothing' },
    { name: 'Jeans', category: 'Clothing' },
    { name: 'Sneakers', category: 'Shoes' },
    { name: 'Boots', category: 'Shoes' },
    { name: 'Pumps', category: 'Shoes' },
    { name: 'Handbag', category: 'Bags' },
    { name: 'Necklace', category: 'Accessories' },
    { name: 'Hat', category: 'Accessories' },
  ];

  const orders: Order[] = [];
  const startDate = new Date();
  const endDate = new Date();

  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let i = 0; i < 100; i += 1) {
    const orderDate = getRandomDate(startDate, endDate);
    const orderItems: OrderItem[] = [];

    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j += 1) {
      const item = getRandomElement(items);
      const size = getRandomElement(itemSizes[item.category]);
      const price = Math.floor(Math.random() * (300 - 50 + 1)) + 50;

      orderItems.push({
        name: item.name,
        category: item.category,
        size,
        price,
        quantity: 1,
      });
    }

    orders.push({
      id: i + 1,
      number: i + 1,
      datePlaced: orderDate.toISOString().split('T')[0],
      status: getRandomElement(statuses),
      items: orderItems,
      amount: orderItems.reduce((sum, item) => sum + item.price, 0),
    });
  }

  orders.sort(
    (a, b) =>
      new Date(b.datePlaced).getTime() - new Date(a.datePlaced).getTime()
  );

  return orders;
}

export const orders = generateMockOrders();
