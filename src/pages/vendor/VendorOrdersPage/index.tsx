import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { sortOptions } from 'src/common/constants';
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

  const [status, setStatus] = useState<OrderStatus>('New Order');
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

  const { data } = useGetAllPaginatedOrdersVendorQuery(
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
            {orders && orders.length > 0 ? (
              <OrdersTable
                orders={orders}
                pagesCount={pagesCount}
                page={page}
                handleChange={handleChange}
              />
            ) : (
              <Typography>{t('vendorOrders.noOrders')}</Typography>
            )}
          </Grid>
        </SectionWrapper>
      </Box>
    </Grid>
  );
}

export default VendorOrdersPage;
