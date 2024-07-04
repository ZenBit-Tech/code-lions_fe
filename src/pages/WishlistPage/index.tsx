import { useParams } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import ProductCard from 'src/components/ProductCard';
import { useGetWishlistByIdQuery } from 'src/redux/wishlist/wishlistService';
import theme from 'src/theme';

function WishlistPage() {
  const { userId } = useParams();
  const { data, isLoading } = useGetWishlistByIdQuery(
    userId ? { userId } : skipToken
  );

  if (isLoading || !data) {
    return <CircularProgress sx={{ color: theme.palette.common.black }} />;
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
              md: 'calc(50% - 20px)',
              lg: 'calc(33% - 19px)',
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
