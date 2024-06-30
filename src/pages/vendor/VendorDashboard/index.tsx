import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import VendorSectionTitle from '../VendorSectionTitle';

import DashboardCard from './DashboardCard';
import { orders } from './mockOrderData';
import useSalesData from './useSalesDataHook';

function VendorDashboard() {
  const {
    salesTotal,
    salesTotalChange,
    averageOrderValue,
    averageOrderValueChange,
    totalOrders,
    totalOrdersChange,
  } = useSalesData(orders);

  const { t } = useTranslation();

  const tabData = [
    {
      title: t('vendorDashboard.salesTotal'),
      amount: `$${salesTotal}`,
      change: salesTotalChange,
    },
    {
      title: t('vendorDashboard.averageOrderValue'),
      amount: `$${averageOrderValue}`,
      change: averageOrderValueChange,
    },
    {
      title: t('vendorDashboard.totalOrders'),
      amount: totalOrders,
      change: totalOrdersChange,
    },
  ];

  return (
    <div>
      <VendorSectionTitle title={t('vendorDashboard.title')} />
      <Box display="flex" gap="25px" justifyContent="space-between">
        {tabData.map((data) => (
          <DashboardCard
            key={data.title}
            title={data.title}
            amount={data.amount}
            change={data.change}
          />
        ))}
      </Box>
      <p>Total Sales: ${salesTotal}</p>
      <p>Sales Change Last 7 Days: {salesTotalChange}%</p>
      <p>Average Order Value: ${averageOrderValue}</p>
      <p>Average Order Value Change Last 7 Days: {averageOrderValueChange}%</p>
      <p>Total Orders: {totalOrders}</p>
      <p>Total Orders Change Last 7 Days: {totalOrdersChange}%</p>
    </div>
  );
}

export default VendorDashboard;
