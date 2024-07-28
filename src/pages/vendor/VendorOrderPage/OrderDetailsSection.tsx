import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import AdminSectionTitle from 'src/pages/admin/AdminSectionTitle';
import theme from 'src/theme';

interface IUserDetailsSectionProps {
  children?: ReactNode;
  sectionHeight: string;
}

function OrderDetailsSection(props: IUserDetailsSectionProps) {
  const { children, sectionHeight } = props;
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
        <Typography
          variant="subtitle2"
          sx={{
            color: theme.palette.text.disabled,
            margin: '0 5px',
            fontSize: '13px',
          }}
        >
          {`${t('vendorOrder.orders')}`}
        </Typography>
        <ChevronRight />
        <Typography
          variant="subtitle2"
          sx={{
            color: theme.palette.text.disabled,
            margin: '0 5px',
            fontSize: '13px',
          }}
        >
          {`${t('vendorOrder.order100')}`}
        </Typography>
      </Box>
      <AdminSectionTitle
        title={t('vendorOrder.order100')}
        fontWeight={700}
        showBackLink
      />
      <Box
        sx={{
          backgroundColor: theme.palette.common.white,
          borderRadius: '10px',
          padding: '24px',
          height: sectionHeight,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default OrderDetailsSection;
