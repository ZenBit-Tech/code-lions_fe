import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Grid, Typography } from '@mui/material';

import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import Loader from 'src/components/Loader';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { selectUserId } from 'src/redux/user/userSlice';
import { useGetAllOrdersVendorQuery } from 'src/redux/vendorOrders/vendorOrdersService';

import VendorSectionTitle from '../VendorSectionTitle';

import DashboardCard from './DashboardCard';
import OrdersTable from './OrdersTable';
import useSalesData from './useSalesDataHook';
import VendorBarChart from './VendorBarChart';
import VendorPieChart from './VendorPieChart';

function VendorDashboard() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const id = useSelector(selectUserId);

  const { data, isLoading, error } = useGetAllOrdersVendorQuery({
    id,
  });

  const {
    salesTotal,
    salesTotalChange,
    averageOrderValue,
    averageOrderValueChange,
    totalOrders,
    totalOrdersChange,
    dataset,
    categoryData,
    ordersPlacedThreeDaysAgo = [],
  } = useSalesData(data || []);

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

  const { handleOnSubmitError } = useErrorHandling();

  useEffect(() => {
    if (error) {
      handleOnSubmitError(
        error,
        showToast,
        t('productsAdmin.productListError')
      );
    }
  }, [error, handleOnSubmitError, showToast, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container columns={6} spacing={3}>
      <Grid item xs={6}>
        <VendorSectionTitle title={t('vendorDashboard.title')} />
      </Grid>
      {tabData.map((tab) => (
        <Grid item xs={2} key={tab.title}>
          <DashboardCard
            title={tab.title}
            amount={tab.amount}
            change={tab.change}
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
