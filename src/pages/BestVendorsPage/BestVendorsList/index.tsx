import { useTranslation } from 'react-i18next';

import { Box, Avatar, Typography } from '@mui/material';

import mockAvatar from 'src/assets/photos/avatar.jpg';
import ProductCard from 'src/components/ProductCard';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { useGetBestVendorsQuery } from 'src/redux/bestVendors/bestVendorsService';

function BestVendorsList() {
  const { t } = useTranslation();
  const { data: bestVendors } = useGetBestVendorsQuery();

  console.log(bestVendors);

  // const filters = useAppSelector((state) => state.filters);

  // const isFilterApplied =
  //   filters.selectedPrice ||
  //   filters.selectedColor ||
  //   filters.selectedSize ||
  //   filters.selectedStyle;

  // const filteredProducts = mockProducts.filter(
  //   (product) =>
  //     (!filters.selectedPrice || product.price === filters.selectedPrice) &&
  //     (!filters.selectedColor ||
  //       product.colors.includes(filters.selectedColor.toLowerCase())) &&
  //     (!filters.selectedSize || product.size === filters.selectedSize) &&
  //     (!filters.selectedStyle || product.style === filters.selectedStyle)
  // );

  // const productsToDisplay = isFilterApplied ? filteredProducts : mockProducts;

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
                <Avatar alt="vendor-avatar" src={photoUrl || mockAvatar} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {vendorName}
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
                      sm: 'calc(50% - 20px)',
                      md: 'calc(50% - 20px)',
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
