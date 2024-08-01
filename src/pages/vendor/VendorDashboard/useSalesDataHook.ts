import getDateNDaysAgo from 'src/common/utils/getDateNDaysAgo';
import isLeapYear from 'src/common/utils/isALeapYear';
import { Category, IVendorOrder } from 'src/redux/order/types';

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
  ordersPlacedThreeDaysAgo: IVendorOrder[];
}

const numberOfDays = {
  THREE: 3,
  SEVEN: 7,
  FOURTEEN: 14,
  YEAR: 365,
  LEAPYEAR: 366,
};

const numberOfMonth = {
  TWELVE: 12,
};

const changePercentage = {
  HUNDRED: 100,
};

const decimalNumbers = {
  TWO: 2,
};

function useSalesData(orders: IVendorOrder[] = []): SalesData {
  // Helper function to calculate percentage change
  const calculateChange = (newValue: number, oldValue: number) => {
    if (oldValue === 0) {
      return newValue > 0 ? changePercentage.HUNDRED : 0;
    }

    return ((newValue - oldValue) / oldValue) * changePercentage.HUNDRED;
  };

  const todayDay = new Date();

  // Function to calculate metrics for a given number of days
  const calculateMetricsForDays = (days: number, today: Date) => {
    const startDate = getDateNDaysAgo(days, today);
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      return orderDate >= startDate && orderDate <= today;
    });

    const totalSales = filteredOrders.reduce(
      (sum, order) => sum + parseFloat(order.price),
      0
    );
    const totalOrderCount = filteredOrders.length;
    const avgOrderValue =
      totalOrderCount > 0 ? totalSales / totalOrderCount : 0;

    return { totalSales, avgOrderValue, totalOrderCount };
  };

  const daysInYear = isLeapYear(todayDay.getFullYear())
    ? numberOfDays.LEAPYEAR
    : numberOfDays.YEAR;

  const {
    totalSales: salesLast7Days,
    avgOrderValue: avgOrderValueLast7Days,
    totalOrderCount: ordersLast7Days,
  } = calculateMetricsForDays(numberOfDays.SEVEN, todayDay);

  const sevenDaysAgo = getDateNDaysAgo(numberOfDays.SEVEN, todayDay);
  const {
    totalSales: salesPrevious7Days,
    avgOrderValue: avgOrderValuePrevious7Days,
    totalOrderCount: ordersPrevious7Days,
  } = calculateMetricsForDays(numberOfDays.SEVEN, sevenDaysAgo);

  const {
    totalSales: totalSalesAllTime,
    avgOrderValue: avgOrderValueAllTime,
    totalOrderCount: ordersAllTime,
  } = calculateMetricsForDays(daysInYear, todayDay);

  const salesTotal = parseFloat(totalSalesAllTime.toFixed(decimalNumbers.TWO));
  const averageOrderValue = parseFloat(
    avgOrderValueAllTime.toFixed(decimalNumbers.TWO)
  );
  const totalOrders = ordersAllTime;
  const salesTotalChange = parseFloat(
    calculateChange(salesLast7Days, salesPrevious7Days).toFixed(
      decimalNumbers.TWO
    )
  );
  const averageOrderValueChange = parseFloat(
    calculateChange(avgOrderValueLast7Days, avgOrderValuePrevious7Days).toFixed(
      decimalNumbers.TWO
    )
  );
  const totalOrdersChange = parseFloat(
    calculateChange(ordersLast7Days, ordersPrevious7Days).toFixed(
      decimalNumbers.TWO
    )
  );

  const calculateSalesPerMonthDataset = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthIndex = today.getMonth();

    // Define all months
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Initialize sales data for the last 12 months
    const salesPerMonth: Record<string, number> = {};

    for (let i = 0; i < numberOfMonth.TWELVE; i += 1) {
      // Calculate the month index and year
      const monthIndex =
        (currentMonthIndex - i + numberOfMonth.TWELVE) % numberOfMonth.TWELVE;
      const month = months[monthIndex];
      const year =
        monthIndex > currentMonthIndex ? currentYear - 1 : currentYear;
      const monthKey = `${year}-${month}`;

      salesPerMonth[monthKey] = 0;
    }

    // Filter orders for the last 12 months
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const orderYear = orderDate.getFullYear();
      const orderMonthIndex = orderDate.getMonth();
      const isWithinLastYear =
        orderYear > currentYear - 1 ||
        (orderYear === currentYear - 1 &&
          orderMonthIndex >= currentMonthIndex) ||
        (orderYear === currentYear && orderMonthIndex <= currentMonthIndex);

      return isWithinLastYear;
    });

    // Update sales data with the filtered orders
    filteredOrders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const month = orderDate.toLocaleString('en-US', { month: 'short' });
      const year = orderDate.getFullYear();
      const key = `${year}-${month}`;

      salesPerMonth[key] = (salesPerMonth[key] || 0) + parseFloat(order.price);
    });

    // Convert the data into the required format and sort by date
    return Object.entries(salesPerMonth)
      .map(([key, amount]) => {
        const [year, month] = key.split('-');

        return { year, month, amount };
      })
      .sort((a, b) => {
        const aDate = new Date(`${a.year}-${months.indexOf(a.month) + 1}-01`);
        const bDate = new Date(`${b.year}-${months.indexOf(b.month) + 1}-01`);

        return aDate.getTime() - bDate.getTime();
      });
  };

  const dataset = calculateSalesPerMonthDataset();

  const calculateSalesPerCategory = () => {
    const salesPerCategory = orders.reduce(
      (acc, order) => {
        order.products.forEach((item) => {
          const category = item.categories?.[0] as Category | undefined;

          if (category) {
            if (!acc[category]) {
              acc[category] = { orders: 0, value: 0 };
            }
            acc[category].orders += 1;
            acc[category].value += parseFloat(item.price);
          }
        });

        return acc;
      },
      {} as Record<Category, { orders: number; value: number }>
    );

    return Object.entries(salesPerCategory).map(([category, data]) => ({
      id: category as Category,
      category: category as Category,
      orders: data.orders,
      value: data.value,
    }));
  };

  const categoryData = calculateSalesPerCategory();

  const ordersPlacedThreeDaysAgo = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const threeDaysAgo = getDateNDaysAgo(numberOfDays.THREE, todayDay);

    return orderDate >= threeDaysAgo && orderDate <= todayDay;
  });

  return {
    salesTotal,
    salesTotalChange,
    averageOrderValue,
    averageOrderValueChange,
    totalOrders,
    totalOrdersChange,
    dataset,
    categoryData,
    ordersPlacedThreeDaysAgo,
  };
}

export default useSalesData;
