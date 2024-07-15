import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, Typography, CircularProgress } from '@mui/material';

import { productCategories, productsOnPage } from 'src/common/constants';
import ProductCard from 'src/components/ProductCard';
import ProductFilters from 'src/components/ProductFilters';
import SelectedFilters from 'src/components/SelectedFilters';
import OrderSelector from 'src/components/shared/OrderSelector';
import SearchInput from 'src/components/shared/SearchInput';
import SectionTitle from 'src/components/shared/SectionTitle';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import StyledPagination from 'src/pages/admin/StyledPagination';
import NotFoundPage from 'src/pages/NotFoundPage';
import theme from 'src/theme';

import useProductFeed from './useProductFeed';

function ProductFeedPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const {
    methods,
    category,
    filters,
    sortBy,
    sortOrder,
    data,
    isLoading,
    isFetching,
    isError,
    page,
    handleSearchChange,
    handlePageChange,
    handleFiltersChange,
    handleResetFilter,
    handleResetAllFilters,
    handleSortChange,
  } = useProductFeed();

  if (isError) {
    showToast('error', t('products.error'));
  }

  if (category && !productCategories.includes(category)) {
    return <NotFoundPage />;
  }

  const productsCount = data?.count || 0;

  return (
    <>
      <SectionTitle
        title={category ? t(`products.${category}`) : t('products.title')}
        greyBackground
        showBackLink
      />
      <Box sx={{ width: '100%', padding: '0 18px', marginTop: '32px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          <Box sx={{ width: '310px', paddingRight: '24px' }}>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFiltersChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormProvider {...methods}>
              <SearchInput setSearch={handleSearchChange} />
            </FormProvider>
            {isLoading || isFetching ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '104px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {productsCount > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '19px 0',
                      color: theme.palette.grey[700],
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <Box>
                        <Typography variant="interBody" data-testid="products">
                          {productsCount} {t('products.counter')}
                        </Typography>
                      </Box>
                      <Box>
                        <SelectedFilters
                          filters={filters}
                          onResetFilter={(key) => handleResetFilter(key)}
                          onResetAllFilters={handleResetAllFilters}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <OrderSelector
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSortChange={handleSortChange}
                      />
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '24px',
                    mb: '40px',
                  }}
                >
                  {productsCount > 0 &&
                    data?.products?.map((product) => (
                      <Box
                        key={product.id}
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
                        <ProductCard key={product.id} item={product} />
                      </Box>
                    ))}
                </Box>
                {productsCount > productsOnPage && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: '40px',
                    }}
                  >
                    <StyledPagination
                      count={Math.ceil(productsCount / productsOnPage)}
                      handleChange={handlePageChange}
                      page={page}
                    />
                  </Box>
                )}
                {productsCount === 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '30px',
                    }}
                  >
                    <Box>
                      <SelectedFilters
                        filters={filters}
                        onResetFilter={(key) => handleResetFilter(key)}
                        onResetAllFilters={handleResetAllFilters}
                      />
                    </Box>
                    {t('products.noProducts')}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductFeedPage;
