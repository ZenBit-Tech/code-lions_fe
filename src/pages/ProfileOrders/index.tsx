import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';

import { orderStatus, profileOrdersTabs } from 'src/common/constants';
import { useGetBuyerOrdersQuery } from 'src/redux/order/orderService';
import { IOrderProduct } from 'src/redux/order/types';
import theme from 'src/theme';

import OrderCard from './OrderCard';
import { TabButton, TabsWrapper } from './styles';

const noOrders = 0;

function ProfileOrders() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(profileOrdersTabs.CURRENT);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetBuyerOrdersQuery({
    statuses:
      activeTab === profileOrdersTabs.CURRENT
        ? [
            orderStatus.NEW,
            orderStatus.DELIVERED,
            orderStatus.RECEIVED,
            orderStatus.SENT,
            orderStatus.WAITING_RETURNING,
          ]
        : [orderStatus.RETURNED, orderStatus.REJECTED],
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    refetch();
  };

  const getPrimaryImages = (products: IOrderProduct[]): string[] => {
    return products.flatMap((product) =>
      product.images
        .filter((image) => image.isPrimary)
        .map((image) => image.url)
    );
  };

  if (isLoading || !orders) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress sx={{ color: theme.palette.common.black }} />
      </Box>
    );
  }

  return (
    <>
      <TabsWrapper>
        <TabButton
          active={activeTab === profileOrdersTabs.CURRENT}
          onClick={() => handleTabClick(profileOrdersTabs.CURRENT)}
        >
          {t('profileOrders.current')}
        </TabButton>
        <TabButton
          active={activeTab === profileOrdersTabs.ARCHIVE}
          onClick={() => handleTabClick(profileOrdersTabs.ARCHIVE)}
        >
          {t('profileOrders.archive')}
        </TabButton>
      </TabsWrapper>
      <Grid container spacing={3}>
        {orders.length === noOrders ? (
          <Grid item>
            <Typography variant="h3">{t('profileOrders.noOrders')}</Typography>
          </Grid>
        ) : (
          orders.map((order) => (
            <Grid item key={order.id}>
              <OrderCard
                orderId={order.orderId}
                orderStatus={order.status}
                productsQuantity={order.products.length}
                productsPhotos={getPrimaryImages(order.products)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default ProfileOrders;
