import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { sortOptions } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import Loader from 'src/components/Loader';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import SortButton from 'src/pages/admin/SortButton';
import { useGetAllPaginatedOrdersVendorQuery } from 'src/redux/order/orderService';
import { OrderStatus } from 'src/redux/order/types';
import { SortOrder } from 'src/redux/user/types';

import VendorSectionTitle from '../VendorSectionTitle';

import OrdersButtons from './OrderButtons';
import OrdersTable from './OrdersTable';
import SectionWrapper from './styles';

function VendorOrdersPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [status, setStatus] = useState<OrderStatus>(OrderStatus.NEW);
  const [sortOrder, setSortOrder] = useState<SortOrder>(sortOptions.DESC);
  const [page, setPage] = useState(1);

  const changeStatus = (value: OrderStatus) => {
    setStatus(value);
  };
  const handleClick = (value: SortOrder) => {
    setSortOrder(value);
  };
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading, error } = useGetAllPaginatedOrdersVendorQuery(
    {
      status,
      page,
      sortBy: 'createdAt',
      sortOrder,
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const orders = data?.orders || [];
  const count = data?.count || 0;

  const ORDERSONPAGE = 16;

  const pagesCount = Math.ceil(count / ORDERSONPAGE);

  const { handleOnSubmitError } = useErrorHandling();

  useEffect(() => {
    if (error) {
      handleOnSubmitError(error, showToast, t('vendorOrders.ordersError'));
    }
  }, [error, handleOnSubmitError, showToast, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        <VendorSectionTitle title={t('vendorOrders.title')} />
      </Grid>
      <Box mt={3} width="100%">
        <SectionWrapper item xs={12}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <OrdersButtons status={status} changeStatus={changeStatus} />
              <SortButton
                title={t('usersAdmin.sortButton')}
                onClick={handleClick}
              />
            </Box>
          </Grid>
          <Grid item xs={12} mt={4}>
            {orders?.length > 0 ? (
              <OrdersTable
                orders={orders}
                pagesCount={pagesCount}
                page={page}
                handleChange={handleChange}
              />
            ) : (
              <Typography>
                {t('vendorOrders.noOrders')}
                {status}
              </Typography>
            )}
          </Grid>
        </SectionWrapper>
      </Box>
    </Grid>
  );
}

export default VendorOrdersPage;
