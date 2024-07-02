import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import VendorSectionTitle from '../VendorSectionTitle';

import DashboardCard from './DashboardCard';
import { orders } from './mockOrderData';
import OrdersTable from './OrdersTable';
import useSalesData from './useSalesDataHook';
import VendorBarChart from './VendorBarChart';
import VendorPieChart from './VendorPieChart';

function VendorDashboard() {
  const {
    salesTotal,
    salesTotalChange,
    averageOrderValue,
    averageOrderValueChange,
    totalOrders,
    totalOrdersChange,
    dataset,
    categoryData,
    ordersPlacedThreeDaysAgo,
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
    <Grid container columns={6} spacing={3}>
      <Grid item xs={6}>
        <VendorSectionTitle title={t('vendorDashboard.title')} />
      </Grid>
      {tabData.map((data) => (
        <Grid item xs={2} key={data.title}>
          <DashboardCard
            title={data.title}
            amount={data.amount}
            change={data.change}
          />
        </Grid>
      ))}
      <Grid item xs={4}>
        <VendorBarChart dataset={dataset} />
      </Grid>
      <Grid item xs={2}>
        <VendorPieChart data={categoryData} />
      </Grid>
      <Grid item xs={6}>
        <VendorSectionTitle title={t('vendorDashboard.resentOrders')} />
      </Grid>
      {ordersPlacedThreeDaysAgo.length > 0 ? (
        <Grid item xs={6}>
          <OrdersTable data={ordersPlacedThreeDaysAgo} />
        </Grid>
      ) : (
        <Grid item xs={6}>
          <Typography>{t('vendorDashboard.noOrders')}</Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default VendorDashboard;
