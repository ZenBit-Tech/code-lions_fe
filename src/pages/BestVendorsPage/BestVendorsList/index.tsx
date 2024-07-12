import { useTranslation } from 'react-i18next';

import { Box, Avatar, Typography } from '@mui/material';

import mockAvatar from 'src/assets/photos/avatar.jpg';
import ProductCard from 'src/components/ProductCard';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { IProduct } from 'src/redux/product/types';

const mockProducts: IProduct[] = [
  {
    id: '1',
    images: ['src/assets/photos/mockPhoto3.png'],
    name: 'Product Name',
    vendor: {
      id: 'vendor1',
      name: 'Vendor Name',
      photoUrl: '/static/images/vendor1.jpg',
    },
    price: 100,
    slug: 'product-1',
    description: 'Description of Product 1',
    categories: ['Category 1'],
    style: 'Style 1',
    type: 'Type 1',
    size: 'M',
    colors: ['red', 'blue'],
    createdAt: 'createdAt',
    lastUpdatedAt: 'lastUpdatedAt',
  },
  {
    id: '2',
    images: ['src/assets/photos/mockPhoto3.png'],
    name: 'Product Name',
    vendor: {
      id: 'vendor2',
      name: 'Vendor Name',
      photoUrl: '/static/images/vendor2.jpg',
    },
    price: 200,
    slug: 'product-2',
    description: 'Description of Product 2',
    categories: ['Category 2'],
    style: 'Style 2',
    type: 'Type 2',
    size: 'L',
    colors: ['green', 'yellow'],
    createdAt: 'createdAt',
    lastUpdatedAt: 'lastUpdatedAt',
  },
  {
    id: '3',
    images: ['src/assets/photos/mockPhoto3.png'],
    name: 'Product Name',
    vendor: {
      id: 'vendor3',
      name: 'Vendor Name',
      photoUrl: '/static/images/vendor3.jpg',
    },
    price: 300,
    slug: 'product-3',
    description: 'Description of Product 3',
    categories: ['Category 3'],
    style: 'Style 3',
    type: 'Type 3',
    size: 'S',
    colors: ['black', 'white'],
    createdAt: 'createdAt',
    lastUpdatedAt: 'lastUpdatedAt',
  },
  {
    id: '4',
    images: ['src/assets/photos/mockPhoto3.png'],
    name: 'Product Name',
    vendor: {
      id: 'vendor4',
      name: 'Vendor Name',
      photoUrl: '/static/images/vendor4.jpg',
    },
    price: 400,
    slug: 'product-4',
    description: 'Description of Product 4',
    categories: ['Category 4'],
    style: 'Style 4',
    type: 'Type 4',
    size: 'XL',
    colors: ['pink', 'purple'],
    createdAt: 'createdAt',
    lastUpdatedAt: 'lastUpdatedAt',
  },
];

function BestVendorsList() {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ mt: '40px', mb: '49px' }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Box key={index} component="div" sx={{ mt: '24px' }}>
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
                <Avatar alt="vendor-avatar" src={mockAvatar} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {t('bestVendors.name')}
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
              sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}
            >
              {mockProducts.map((product) => (
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
