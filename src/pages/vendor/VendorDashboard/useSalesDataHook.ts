import { useState, useEffect } from 'react';

import getDateNDaysAgo from 'src/common/utils/getDateNDaysAgo';
import isLeapYear from 'src/common/utils/isALeapYear';

import { Category, Order } from './types';

interface SalesData {
  salesTotal: number;
  salesTotalChange: number;
  averageOrderValue: number;
  averageOrderValueChange: number;
  totalOrders: number;
  totalOrdersChange: number;
  dataset: { month: string; amount: number }[];
  categoryData: {
    id: Category;
    category: Category;
    orders: number;
    value: number;
  }[];
}

const numberOfDays = {
  SEVEN: 7,
  FOURTEEN: 14,
  YEAR: 365,
  LEAPYEAR: 366,
};

const changePercentage = {
  HUNDRED: 100,
};

const decimalNumbers = {
  TWO: 2,
};

function useSalesData(orders: Order[]): SalesData {
  const [salesTotal, setSalesTotal] = useState<number>(0);
  const [salesTotalChange, setSalesTotalChange] = useState<number>(0);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(0);
  const [averageOrderValueChange, setAverageOrderValueChange] =
    useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalOrdersChange, setTotalOrdersChange] = useState<number>(0);
  const [dataset, setDataset] = useState<{ month: string; amount: number }[]>(
    []
  );
  const [categoryData, setCategoryData] = useState<
    { id: Category; category: Category; orders: number; value: number }[]
  >([]);

  useEffect(() => {
    if (orders.length === 0) {
      setSalesTotal(0);
      setSalesTotalChange(0);
      setAverageOrderValue(0);
      setAverageOrderValueChange(0);
      setTotalOrders(0);
      setTotalOrdersChange(0);
      setDataset([]);
      setCategoryData([]);

      return;
    }

    // Function to calculate metrics for a given number of days
    const calculateMetricsForDays = (
      days: number,
      today: Date
    ): {
      totalSales: number;
      avgOrderValue: number;
      totalOrderCount: number;
    } => {
      const startDate = getDateNDaysAgo(days, today);

      // Filter orders within the specified date range
      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.datePlaced);

        return orderDate >= startDate && orderDate <= today;
      });

      // Calculate total sales for the filtered orders
      const totalSales = filteredOrders.reduce(
        (sum, order) => sum + order.amount,
        0
      );

      // Calculate average order value
      const totalOrderCount = filteredOrders.length;
      const avgOrderValue =
        totalOrderCount > 0 ? totalSales / totalOrderCount : 0;

      return { totalSales, avgOrderValue, totalOrderCount };
    };

    // Function to calculate sales per month dataset
    const calculateSalesPerMonthDataset = (
      ordersEachMonth: Order[]
    ): {
      month: string;
      amount: number;
    }[] => {
      const salesPerMonth: { [key: string]: { year: number; amount: number } } =
        {};

      ordersEachMonth.forEach((order) => {
        const orderDate = new Date(order.datePlaced);
        const month = orderDate.toLocaleString('en-US', { month: 'short' });
        const year = orderDate.getFullYear();
        const monthYearKey = `${year}-${month}`;

        if (salesPerMonth[monthYearKey]) {
          salesPerMonth[monthYearKey].amount += order.amount;
        } else {
          salesPerMonth[monthYearKey] = { year, amount: order.amount };
        }
      });

      const monthlyData = Object.keys(salesPerMonth)
        .map((key) => {
          const [year, month] = key.split('-');

          return {
            month,
            amount: salesPerMonth[key].amount,
            year: parseInt(year, 10),
          };
        })
        .sort(
          (a, b) =>
            a.year - b.year ||
            new Date(`${a.month} 1`).getMonth() -
              new Date(`${b.month} 1`).getMonth()
        )
        .map(({ month, amount }) => ({
          month,
          amount,
        }));

      return monthlyData;
    };

    // Function to calculate sales per category for a given number of days
    const calculateSalesPerCategory = (
      days: number,
      today: Date
    ): {
      id: Category;
      category: Category;
      orders: number;
      value: number;
    }[] => {
      const salesPerCategory: {
        [key in Category]: { orders: number; value: number };
      } = {
        Clothing: { orders: 0, value: 0 },
        Shoes: { orders: 0, value: 0 },
        Bags: { orders: 0, value: 0 },
        Accessories: { orders: 0, value: 0 },
      };

      // Calculate the date `days` ago from `today`
      const startDate = getDateNDaysAgo(days, today);

      // Filter orders within the specified date range
      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.datePlaced);

        return orderDate >= startDate && orderDate <= today;
      });

      // Iterate through filtered orders and update sales per category
      filteredOrders.forEach((order) => {
        order.items.forEach((item) => {
          const { category, price, quantity } = item;

          salesPerCategory[category].orders += quantity;
          salesPerCategory[category].value += price * quantity;
        });
      });

      // Format the data into an array of objects
      const dataForCategories = Object.keys(salesPerCategory).map(
        (category) => ({
          id: category as Category,
          category: category as Category,
          orders: salesPerCategory[category as Category].orders,
          value: salesPerCategory[category as Category].value,
        })
      );

      return dataForCategories;
    };

    // Get today's date
    const today = new Date();

    // Determine the number of days based on current year's leap status
    const daysInYear = isLeapYear(today.getFullYear())
      ? numberOfDays.LEAPYEAR
      : numberOfDays.YEAR;

    // Calculate total sales, average order value and number of orders for the last 7 days
    const {
      totalSales: salesLast7Days,
      avgOrderValue: avgOrderValueLast7Days,
      totalOrderCount: ordersLast7Days,
    } = calculateMetricsForDays(numberOfDays.SEVEN, today);

    // Calculate total sales, average order value and number of orders for the 7 days before the last 7 days
    const sevenDaysAgo = getDateNDaysAgo(numberOfDays.SEVEN, today);
    const {
      totalSales: salesPrevious7Days,
      avgOrderValue: avgOrderValuePrevious7Days,
      totalOrderCount: ordersPrevious7Days,
    } = calculateMetricsForDays(numberOfDays.SEVEN, sevenDaysAgo);

    // Calculate total sales, average order value and number of orders for all time (365 or 366 days)
    const {
      totalSales: totalSalesAllTime,
      avgOrderValue: avgOrderValueAllTime,
      totalOrderCount: ordersAllTime,
    } = calculateMetricsForDays(daysInYear, today);

    // Set state values
    setSalesTotal(parseFloat(totalSalesAllTime.toFixed(decimalNumbers.TWO)));
    setAverageOrderValue(
      parseFloat(avgOrderValueAllTime.toFixed(decimalNumbers.TWO))
    );
    setTotalOrders(ordersAllTime);

    // Calculate percentage change in total sales over the last 7 days
    let salesChange;

    if (salesPrevious7Days === 0) {
      if (salesLast7Days > 0) {
        salesChange = changePercentage.HUNDRED;
      } else {
        salesChange = 0;
      }
    } else {
      salesChange =
        ((salesLast7Days - salesPrevious7Days) / salesPrevious7Days) *
        changePercentage.HUNDRED;
    }

    setSalesTotalChange(parseFloat(salesChange.toFixed(decimalNumbers.TWO)));

    // Calculate percentage change in average order value over the last 7 days
    let avgOrderValueChange;

    if (avgOrderValuePrevious7Days === 0) {
      if (avgOrderValueLast7Days > 0) {
        avgOrderValueChange = changePercentage.HUNDRED;
      } else {
        avgOrderValueChange = 0;
      }
    } else {
      avgOrderValueChange =
        ((avgOrderValueLast7Days - avgOrderValuePrevious7Days) /
          avgOrderValuePrevious7Days) *
        changePercentage.HUNDRED;
    }
    setAverageOrderValueChange(
      parseFloat(avgOrderValueChange.toFixed(decimalNumbers.TWO))
    );

    // Calculate percentage change in total orders over the last 7 days
    let ordersChange;

    if (ordersPrevious7Days === 0) {
      if (ordersLast7Days > 0) {
        ordersChange = changePercentage.HUNDRED;
      } else {
        ordersChange = 0;
      }
    } else {
      ordersChange =
        ((ordersLast7Days - ordersPrevious7Days) / ordersPrevious7Days) *
        changePercentage.HUNDRED;
    }
    setTotalOrdersChange(parseFloat(ordersChange.toFixed(decimalNumbers.TWO)));

    // Calculate sales per month dataset
    const salesPerMonthDataset = calculateSalesPerMonthDataset(orders);

    setDataset(salesPerMonthDataset);

    // Calculate sales per category for the last 7 days
    const salesPerCategory = calculateSalesPerCategory(
      numberOfDays.SEVEN,
      today
    );

    setCategoryData(salesPerCategory);
  }, [orders]);

  return {
    salesTotal,
    salesTotalChange,
    averageOrderValue,
    averageOrderValueChange,
    totalOrders,
    totalOrdersChange,
    dataset,
    categoryData,
  };
}

export default useSalesData;
