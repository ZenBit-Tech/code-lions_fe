import { useTranslation } from 'react-i18next';

import { Box, Typography, Button } from '@mui/material';

import Chat from 'src/assets/icons/vendor/chat-white.svg';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import theme from 'src/theme';

import mockOrder from './mockData';
import styles from './styles';

function BuyerInfoSection() {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" sx={{ padding: '0 24px' }}>
      <AdminSectionSubTitle title={`${t('vendorOrder.customer')}`} />
      <Box sx={{ margin: '24px 0' }}>
        <Typography variant="h4">{mockOrder.buyer.name}</Typography>
        <Button sx={styles.chatButton} startIcon={<Chat />}>
          <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
            {t('vendorOrder.chat')}
          </Typography>
        </Button>
      </Box>
      <AdminSectionSubTitle title={`${t('vendorOrder.address')}`} />
      <Box>
        <Typography variant="h4" sx={{ margin: '24px 0 12px 0' }}>
          {mockOrder.buyer.name}
        </Typography>
        <Typography variant="h4">{mockOrder.buyer.addressLine1}</Typography>
        <Typography variant="h4">{mockOrder.buyer.addressLine2}</Typography>
        <Typography variant="h4">{`${mockOrder.buyer.state}, ${mockOrder.buyer.country}`}</Typography>
      </Box>
    </Box>
  );
}

export default BuyerInfoSection;
