import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import ProductCard from 'src/components/ProductCard';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

function WishlistPage() {
  const { t } = useTranslation();

  const data = useAppSelector((state) => state.wishlist);

  if (!data) {
    return (
      <Typography
        variant="h4"
        sx={{ mt: 4, fontSize: theme.typography.h5.fontSize }}
      >
        {t('profile.wishlistNotFound')}
      </Typography>
    );
  }

  if (data.length === 0) {
    return (
      <Typography
        variant="h4"
        sx={{ mt: 4, fontSize: theme.typography.h5.fontSize }}
      >
        {t('profile.emptyWishlist')}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '24px',
        mb: '40px',
      }}
    >
      {data.map((item: IProduct) => (
        <Box
          key={item.id}
          component="div"
          sx={{
            width: {
              xs: '100%',
              md: 'calc(50% - 12px)',
              lg: 'calc(33.33% - 16px)',
              xl: 'calc(25% - 18px)',
            },
          }}
        >
          <ProductCard key={item.id} item={item} />
        </Box>
      ))}
    </Box>
  );
}

export default WishlistPage;
