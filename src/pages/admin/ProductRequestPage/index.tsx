import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Box } from '@mui/material';

import { sortOptions, urls } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import Loader from 'src/components/Loader';
import SearchInput from 'src/components/shared/SearchInput';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useGetAllProductsQuery } from 'src/redux/adminProduct/adminProductService';
import { SortOrder } from 'src/redux/user/types';
import theme from 'src/theme';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';
import useProducts from '../ProductListPage/useProductListHook';
import ProductsTable from '../ProductsTable';
import SortButton from '../SortButton';

import {
  SectionWrapper,
  StyledListItemButton,
  StyledTypography,
} from './styles';

function ProductRequestPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const methods = useForm();

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(sortOptions.DESC);
  const [search, setSearch] = useState('');

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleClick = (value: SortOrder) => {
    setSortOrder(value);
  };
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, error } = useGetAllProductsQuery({
    list: 'inactive',
    page,
    sortOrder,
    search,
  });

  const { products, pagesCount } = useProducts({ data });

  const { handleOnSubmitError } = useErrorHandling();

  useEffect(() => {
    if (error) {
      handleOnSubmitError(error, showToast, t('productsAdmin.requestError'));
    }
  }, [error, handleOnSubmitError, showToast, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AdminSectionTitle title={t('productsAdmin.title')} fontWeight={600} />
      <SectionWrapper>
        <Box display="flex" justifyContent="space-between" width="100%">
          <AdminSectionSubTitle title={t('productsAdmin.subTitle')} />
          <SortButton
            title={t('usersAdmin.sortButton')}
            onClick={handleClick}
          />
        </Box>
        <Box display="flex" gap="32px">
          <NavLink to={`${urls.ADMIN}/${urls.ADMIN_PRODUCT_REQUEST}`}>
            {({ isActive }) => (
              <StyledListItemButton selected={isActive}>
                <StyledTypography theme={theme} isActive={isActive}>
                  {t('productsAdmin.requests')}
                </StyledTypography>
              </StyledListItemButton>
            )}
          </NavLink>
          <NavLink to={`${urls.ADMIN}/${urls.ADMIN_PRODUCT_LIST}`}>
            {({ isActive }) => (
              <StyledListItemButton selected={isActive}>
                <StyledTypography theme={theme} isActive={isActive}>
                  {t('productsAdmin.productsList')}
                </StyledTypography>
              </StyledListItemButton>
            )}
          </NavLink>
        </Box>
        <FormProvider {...methods}>
          <SearchInput setSearch={handleSearchChange} />
        </FormProvider>
        <ProductsTable
          pagesCount={pagesCount}
          products={products}
          page={page}
          handleChange={handleChange}
        />
      </SectionWrapper>
    </>
  );
}

export default ProductRequestPage;
