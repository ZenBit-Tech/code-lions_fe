import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Avatar, Typography } from '@mui/material';

import { urls } from 'src/common/constants';
import ProductCard from 'src/components/ProductCard';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { useGetBestVendorsQuery } from 'src/redux/bestVendors/bestVendorsService';
import { IProductFilters } from 'src/redux/product/types';

type BestVerdorsListProps = {
  filters: IProductFilters;
};

function BestVendorsList({ filters }: BestVerdorsListProps) {
  const { t } = useTranslation();
  const { data: bestVendors } = useGetBestVendorsQuery(filters);

  return (
    <>
      <Box sx={{ mt: '40px', mb: '49px' }}>
        {bestVendors?.map(({ vendorId, vendorName, photoUrl, products }) => (
          <Box key={vendorId} component="div" sx={{ mt: '24px' }}>
            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: '36px',
              }}
            >
              <Box
                component="div"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '24px',
                }}
              >
                <Avatar alt="vendor-avatar" src={photoUrl} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  <Link to={`${urls.VENDOR}/${vendorId}`}>{vendorName}</Link>
                </Typography>
              </Box>
              <StyledButton
                type="button"
                styles={StyleVariants.BLACK}
                padding={PaddingVariants.LG}
                sx={{
                  width: '196px',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 400,
                    lineHeight: 'normal',
                    letterSpacing: 'normal',
                  }}
                >
                  {t('vendorProfile.follow')}
                </Typography>
              </StyledButton>
            </Box>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              {products?.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'calc(50% - 12px)',
                      lg: 'calc(25% - 18px)',
                    },
                  }}
                >
                  <ProductCard item={product} />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default BestVendorsList;
