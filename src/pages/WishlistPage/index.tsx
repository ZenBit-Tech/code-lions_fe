import { Box } from '@mui/material';

import ProductCard from 'src/components/ProductCard';
import mockData from 'src/test/mocks/allproducts';

function WishlistPage() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
      {mockData.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </Box>
  );
}

export default WishlistPage;
