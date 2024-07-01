import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import ProductCard from 'src/components/ProductCard';
import { useGetProductsQuery } from 'src/redux/product/productService';
import theme from 'src/theme';

function ProductFeedPage() {
  const { t } = useTranslation();

  const { data: products } = useGetProductsQuery();

  return (
    <>
      <Box sx={{ width: '100%', padding: '0 18px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          <Box sx={{ width: '310px', padding: '24px' }}>filters</Box>
          <Box sx={{ flex: 1 }}>
            <h2> {t('products.title')}</h2>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '24px',
                mb: '40px',
              }}
            >
              {products?.map((product) => (
                <Box
                  key={product.id}
                  component="div"
                  sx={{
                    width: '100%',
                    [theme.breakpoints.up('sm')]: {
                      width: 'calc(50% - 20px)',
                    },

                    [theme.breakpoints.up('md')]: {
                      width: 'calc(33% - 19px)',
                    },

                    [theme.breakpoints.up('xl')]: {
                      width: 'calc(25% - 18px)',
                    },
                  }}
                >
                  <ProductCard key={product.id} item={product} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductFeedPage;
