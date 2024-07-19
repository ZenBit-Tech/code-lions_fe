import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Grid, Box, Typography } from '@mui/material';

import { sortOptions } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import Loader from 'src/components/Loader';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import useProducts from 'src/pages/admin/ProductListPage/useProductListHook';
import SortButton from 'src/pages/admin/SortButton';
import { SortOrder } from 'src/redux/user/types';
import { selectUserId } from 'src/redux/user/userSlice';
import { useGetAllProductsVendorQuery } from 'src/redux/vendorProduct/vendorProductService';

import VendorSectionTitle from '../VendorSectionTitle';

import ProductsTable from './ProductsTable';
import SectionWrapper from './styles';

function VendorProductPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const id = useSelector(selectUserId);

  const [sortOrder, setSortOrder] = useState<SortOrder>(sortOptions.DESC);
  const [page, setPage] = useState(1);

  const handleClick = (value: SortOrder) => {
    setSortOrder(value);
  };
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading, error } = useGetAllProductsVendorQuery({
    id,
    page,
    sortOrder,
  });

  const { products, pagesCount } = useProducts({ data });

  const { handleOnSubmitError } = useErrorHandling();

  useEffect(() => {
    if (error) {
      handleOnSubmitError(
        error,
        showToast,
        t('productsAdmin.productListError')
      );
    }
  }, [error, handleOnSubmitError, showToast, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        <VendorSectionTitle title={t('vendorProductList.title')} />
      </Grid>
      <Box mt={3} width="100%">
        <SectionWrapper item xs={12}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <AdminSectionSubTitle title={t('vendorProductList.subTitle')} />
              <SortButton
                title={t('usersAdmin.sortButton')}
                onClick={handleClick}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {products && products.length > 0 ? (
              <ProductsTable
                products={products}
                pagesCount={pagesCount}
                page={page}
                handleChange={handleChange}
              />
            ) : (
              <Typography>{t('vendorProductList.noProducts')}</Typography>
            )}
          </Grid>
        </SectionWrapper>
      </Box>
    </Grid>
  );
}

export default VendorProductPage;
