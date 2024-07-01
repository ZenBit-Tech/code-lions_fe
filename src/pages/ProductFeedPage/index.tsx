import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { useGetProductsQuery } from 'src/redux/product/productService';

function ProductFeedPage() {
  const { t } = useTranslation();

  const { data: products } = useGetProductsQuery();

  return (
    <>
      <Box component="section" sx={{ width: '100%', padding: '0 18px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '1440px',
            margin: '0 auto',
            border: '1px solid pink',
          }}
        >
          <Box
            sx={{ width: '310px', padding: '24px', border: '1px solid red' }}
          >
            filters
          </Box>
          <Box sx={{ flex: 1, border: '1px solid blue' }}>
            <h2> {t('products.title')}</h2>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '56px 20px',
                border: '1px solid green',
              }}
            >
              {products?.map((product) => (
                <Box
                  key={product.id}
                  component="div"
                  sx={{ width: '300px', border: '1px solid grey' }}
                >
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.slug}</p>
                  <img src={product.images[1]} alt={product.name} />
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
