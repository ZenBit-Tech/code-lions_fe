import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import { Image, ImageWrapper } from './styles';

type PartialProduct = Partial<Pick<IProduct, 'name' | 'size' | 'images'>>;

function ProductTableCard({ images, size, name }: PartialProduct) {
  const { t } = useTranslation();

  return (
    <Box display="flex" gap="16px" alignItems="center">
      <ImageWrapper>
        {images && images.length > 0 ? (
          <Image
            width="52px"
            height="67px"
            src={images[0]}
            alt={name || 'Product image'}
          />
        ) : (
          <Image
            width="52px"
            height="67px"
            src="src/assets/photos/no-image.jpg"
            alt="Default image"
          />
        )}
      </ImageWrapper>
      <Box width="223px">
        <Typography variant="button" component="p">
          {name || ''}
        </Typography>
        <Box display="flex" gap="3px">
          <Typography
            variant="h4"
            component="p"
            sx={{
              color: theme.palette.text.disabled,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {t('vendorProductList.size')}:
          </Typography>
          <Typography
            variant="h4"
            component="p"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            {size}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductTableCard;
