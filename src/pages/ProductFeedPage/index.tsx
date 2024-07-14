import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { Box, Typography, CircularProgress } from '@mui/material';

import { urls, productsOnPage, productCategories } from 'src/common/constants';
import createNavigationLink from 'src/common/utils/createNavigationLink';
import ProductCard from 'src/components/ProductCard';
import ProductFilters from 'src/components/ProductFilters';
import OrderSelector, {
  SortOrder,
  SortParameter,
} from 'src/components/shared/OrderSelector';
import SearchInput from 'src/components/shared/SearchInput';
import SectionTitle from 'src/components/shared/SectionTitle';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import StyledPagination from 'src/pages/admin/StyledPagination';
import { useGetProductsQuery } from 'src/redux/product/productService';
import { IProductFilters } from 'src/redux/product/types';
import theme from 'src/theme';

import NotFoundPage from '../NotFoundPage';

function ProductFeedPage() {
  const { t } = useTranslation();
  const { category } = useParams<{ category?: string }>();

  const baseUrl = category
    ? `${urls.PRODUCT_CATEGORY_URL}/${category}`
    : urls.PRODUCT_FEED;

  const methods = useForm();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const search = queryParams.get('search')?.trim();
  const [searchQuery, setSearchQuery] = useState(search);
  const [filters, setFilters] = useState<IProductFilters>({});
  const [sortBy, setSortBy] = useState<SortParameter | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);
  const handleSearchChange = (searchTerm: string) => {
    setSearchQuery(search);
    const requestParams: Record<string, string> = { search: searchTerm };
    const link = createNavigationLink(baseUrl, requestParams);

    navigate(link);
  };
  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    const requestParams: Record<string, string> = { page: String(pageNumber) };

    if (searchQuery) {
      requestParams.search = searchQuery;
    }
    const link = createNavigationLink(baseUrl, requestParams);

    navigate(link);
  };

  const handleFiltersChange = (currentFilters: IProductFilters) => {
    const requestParams: Record<string, string> = {};

    if (searchQuery) {
      requestParams.search = searchQuery;
    }
    const link = createNavigationLink(baseUrl, requestParams);

    navigate(link);
    setFilters(currentFilters);
  };

  const handleSortChange = (
    newSortBy?: SortParameter,
    newSortOrder?: SortOrder
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const { data, isLoading, isFetching, isError } = useGetProductsQuery({
    category,
    page,
    limit: productsOnPage,
    search,
    filters,
    sortBy,
    sortOrder,
  });
  const productsCount = data?.count || 0;

  useEffect(() => {
    setSearchQuery(search);
    methods.setValue('search', search);
  }, [search, methods]);

  if (isError) {
    showToast('error', t('products.error'));
  }

  if (category && !productCategories.includes(category)) {
    return <NotFoundPage />;
  }

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
            <ProductFilters onFilterChange={handleFiltersChange} />
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
                    <Box>
                      <Typography variant="interBody" data-testid="products">
                        {productsCount} {t('products.counter')}
                      </Typography>
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
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: '40px',
                    }}
                  >
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
