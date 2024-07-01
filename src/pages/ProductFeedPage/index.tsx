import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import ProductCard from 'src/components/ProductCard';
import SearchInput from 'src/components/shared/SearchInput';
import { useGetProductsQuery } from 'src/redux/product/productService';
import theme from 'src/theme';

function ProductFeedPage() {
  const { t } = useTranslation();
  const methods = useForm();

  const handleSearchChange = (value: string) => {
    console.log(value);
  };

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
            <FormProvider {...methods}>
              <SearchInput setSearch={handleSearchChange} />
            </FormProvider>

            <Box sx={{ padding: '24px', color: theme.palette.grey[700] }}>
              {' '}
              <Typography variant="interBody">{t('products.title')}</Typography>
            </Box>
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
                    width: {
                      xs: '100%',
                      md: 'calc(50% - 20px)',
                      lg: 'calc(33% - 19px)',
                      xl: 'calc(25% - 18px)',
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
