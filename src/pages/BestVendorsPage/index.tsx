import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import ProductFilters from 'src/components/ProductFilters';
import SectionTitle from 'src/components/shared/SectionTitle';

import BestVendorsList from './BestVendorsList';

function BestVendorsPage() {
  const { t } = useTranslation();

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
          <ProductFilters filters={{}} onFilterChange={() => {}} />
          <Box component="div" sx={{ flexGrow: 1 }}>
            <BestVendorsList />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BestVendorsPage;
