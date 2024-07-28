import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import AdminSectionTitle from 'src/pages/admin/AdminSectionTitle';
import theme from 'src/theme';

import styles from './styles';

interface IOrdersDetailsSectionProps {
  children?: ReactNode;
}

function OrderDetailsSection({ children }: IOrdersDetailsSectionProps) {
  const { t } = useTranslation();

  return (
    <Box>
      <Box display="flex" alignItems="center" mb="24px">
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.disabled, marginRight: '5px' }}
        >
          {t('vendorOrder.vendor')}
        </Typography>
        <ChevronRight />
        <Typography variant="subtitle2" sx={styles.link}>
          {`${t('vendorOrder.orders')}`}
        </Typography>
        <ChevronRight />
        <Typography variant="subtitle2" sx={styles.link}>
          {`${t('vendorOrder.order100')}`}
        </Typography>
      </Box>
      <AdminSectionTitle
        title={t('vendorOrder.order100')}
        fontWeight={700}
        showBackLink
      />
      <Box sx={styles.mainSectionWrapper}>{children}</Box>
    </Box>
  );
}

export default OrderDetailsSection;
