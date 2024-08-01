import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import mockPhoto1 from 'src/assets/photos/mockPhoto1.png';
import mockPhoto2 from 'src/assets/photos/mockPhoto2.png';
import mockPhoto3 from 'src/assets/photos/mockPhoto3.png';
import StyledButton from 'src/components/shared/StyledButton';
import { StyleVariants } from 'src/components/shared/StyledButton/types';
import theme from 'src/theme';

import { StyledCard, StyledImage, StyledCardFooter } from './styles';

function OrderCard() {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
        {t('profileOrders.order')} #323
      </Typography>
      <Typography variant="h4" sx={{ textDecoration: 'underline' }}>
        3 {t('profileOrders.items')}
      </Typography>
      <Box sx={{ display: 'flex', gap: '4px' }}>
        <StyledImage src={mockPhoto1} alt="item" />
        <StyledImage src={mockPhoto2} alt="item" />
        <StyledImage src={mockPhoto3} alt="item" />
      </Box>
      <Typography sx={{ color: theme.palette.text.disabled }}>
        {t('profileOrders.freeReturn')}:{' '}
        <Typography
          component="span"
          sx={{
            fontWeight: theme.typography.bold,
            color: theme.palette.common.black,
          }}
        >
          05d
        </Typography>
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: theme.palette.text.disabled, fontSize: '10px' }}
      >
        {t('profileOrders.warning')}
      </Typography>
      <StyledCardFooter>
        <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
          {t('profileOrders.status')}: In Rent
        </Typography>
        <StyledButton styles={StyleVariants.TRANSPARENT} type="button">
          {t('profileOrders.return')}
        </StyledButton>
      </StyledCardFooter>
    </StyledCard>
  );
}

export default OrderCard;
