import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Box } from '@mui/material';

import { sortOptions } from 'src/common/constants';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import SortButton from 'src/pages/admin/SortButton';
import { SortOrder } from 'src/redux/user/types';

import VendorSectionTitle from '../VendorSectionTitle';

import ProductsTable from './ProductsTable';
import products from './ProductsTable/productsMock';
import SectionWrapper from './styles';

function VendorProductPage() {
  const { t } = useTranslation();
  const [, setOrder] = useState<SortOrder>(sortOptions.DESC);
  const handleClick = (value: SortOrder) => {
    setOrder(value);
  };

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
            <ProductsTable
              products={products}
              pagesCount={0}
              page={0}
              handleChange={() => {}}
            />
          </Grid>
        </SectionWrapper>
      </Box>
    </Grid>
  );
}

export default VendorProductPage;
