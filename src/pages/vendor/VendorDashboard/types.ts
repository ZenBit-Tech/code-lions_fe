import { Category } from 'src/redux/order/types';

export interface PieChartData {
  id: Category;
  category: Category;
  orders: number;
  value: number;
}

export interface IVendorPieChartProps {
  data: PieChartData[];
}

export interface PieChartColoredData {
  id: Category;
  category: Category;
  orders: number;
  value: number;
  color: string;
}

export interface IVendorPieChartLegendProps {
  data: PieChartColoredData[];
}
