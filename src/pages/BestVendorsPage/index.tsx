import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import ProductFilters from 'src/components/ProductFilters';
import SelectedFilters from 'src/components/SelectedFilters';
import SectionTitle from 'src/components/shared/SectionTitle';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import useProductFeed from 'src/pages/ProductFeedPage/useProductFeed';

import BestVendorsList from './BestVendorsList';

function BestVendorsPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const {
    filters,
    isError,
    handleFiltersChange,
    handleResetFilter,
    handleResetAllFilters,
  } = useProductFeed();

  if (isError) {
    showToast('error', t('products.error'));
  }

  return (
    <>
      <SectionTitle
        title={t('bestVendors.title')}
        greyBackground
        showBackLink
      />
      <Box component="section" sx={{ width: '100%', padding: '0 18px' }}>
        <Box
          component="div"
          sx={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            gap: '32px',
          }}
        >
          <ProductFilters
            filters={filters}
            onFilterChange={handleFiltersChange}
          />
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Box sx={{ marginTop: '32px' }}>
              <SelectedFilters
                filters={filters}
                onResetFilter={(key) => handleResetFilter(key)}
                onResetAllFilters={handleResetAllFilters}
              />
            </Box>
            <BestVendorsList filters={filters} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BestVendorsPage;
