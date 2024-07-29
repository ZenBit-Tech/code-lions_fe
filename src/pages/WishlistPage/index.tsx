import { useTranslation } from 'react-i18next';

import { Box, CircularProgress, Typography } from '@mui/material';

import ProductCard from 'src/components/ProductCard';
import { useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

function WishlistPage() {
  const { t } = useTranslation();

  const data = useAppSelector((state) => state.wishlist);

  if (!data) {
    return <CircularProgress sx={{ color: theme.palette.common.black }} />;
  }

  if (data.length === 0) {
    return (
      <Typography variant="h4" sx={{ mt: 4, fontSize: '20px' }}>
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
      {data.map((item) => (
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
