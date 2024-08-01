import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Box, Grid, Typography } from '@mui/material';

import { sortOptions } from 'src/common/constants';
import SortButton from 'src/pages/admin/SortButton';
import { SortOrder } from 'src/redux/user/types';
import { selectUserId } from 'src/redux/user/userSlice';
import { useGetAllOrdersVendorQuery } from 'src/redux/vendorOrders/vendorOrdersService';

import VendorSectionTitle from '../VendorSectionTitle';

import OrdersButtons from './OrderButtons';
import OrdersTable from './OrdersTable';
import SectionWrapper from './styles';

function VendorOrdersPage() {
  const { t } = useTranslation();

  const [, setSortOrder] = useState<SortOrder>(sortOptions.DESC);
  const [page, setPage] = useState(1);

  const handleClick = (value: SortOrder) => {
    setSortOrder(value);
  };
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const id = useSelector(selectUserId);

  const { data } = useGetAllOrdersVendorQuery({
    id,
  });

  const ORDERSONPAGE = 8;
  const orderQuantity = data?.length ?? 0;

  const pagesCount = Math.ceil(orderQuantity / ORDERSONPAGE);

  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        <VendorSectionTitle title={t('vendorOrders.title')} />
      </Grid>
      <Box mt={3} width="100%">
        <SectionWrapper item xs={12}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <OrdersButtons />
              <SortButton
                title={t('usersAdmin.sortButton')}
                onClick={handleClick}
              />
            </Box>
          </Grid>
          <Grid item xs={12} mt={4}>
            {data && data.length > 0 ? (
              <OrdersTable
                orders={data}
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
