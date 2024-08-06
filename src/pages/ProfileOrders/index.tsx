import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, CircularProgress } from '@mui/material';

import { orderStatus, profileOrdersTabs } from 'src/common/constants';
import GridWrapper from 'src/components/shared/GridWrapper';
import { useGetBuyerOrdersQuery } from 'src/redux/order/orderService';
import { IOrder, IOrderProduct } from 'src/redux/order/types';
import theme from 'src/theme';

import OrderCard from './OrderCard';
import { TabButton, TabsWrapper } from './styles';

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
      <GridWrapper<IOrder>
        data={orders}
        message="profileOrders.noOrders"
        spacing={3}
        renderCard={(order) => (
          <OrderCard
            orderId={order.orderId}
            orderStatus={order.status}
            productsQuantity={order.products.length}
            productsPhotos={getPrimaryImages(order.products)}
          />
        )}
      />
    </>
  );
}

export default ProfileOrders;
