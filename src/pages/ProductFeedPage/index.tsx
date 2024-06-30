import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { useGetProductsQuery } from 'src/redux/product/productService';

function ProductFeedPage() {
  const { t } = useTranslation();

  const { data: products } = useGetProductsQuery();

  return (
    <>
      <Box component="section" sx={{ width: '100%', padding: '0 18px' }}>
        <h2> {t('products.title')}</h2>
        {products?.map((product) => (
          <Box
            key={product.id}
            component="div"
            sx={{ maxWidth: '920px', margin: '0 auto' }}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.slug}</p>
            <img src={product.images[0]} alt={product.name} />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default ProductFeedPage;
