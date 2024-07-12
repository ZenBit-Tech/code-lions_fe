import { useTranslation } from 'react-i18next';

import { Grid, Box, Typography } from '@mui/material';

import capitalizeAndTruncate from 'src/common/utils/capitalizeAndTruncate';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import { StyledTypography } from './styles';

interface ProductSectionProps {
  product: IProduct;
}

function DescriptionSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();

  return (
    <Box padding="0 166px 52px 166px">
      <Typography
        variant="button"
        sx={{
          fontWeight: theme.typography.bold.fontWeight,
          fontSize: theme.typography.h5.fontSize,
          lineHeight: 1.75,
        }}
      >
        {t('product.description')}
      </Typography>
      <Box
        sx={{ borderTop: `1px solid ${theme.palette.border.primary}` }}
        padding="30px 0"
        marginTop="5px"
      >
        <Typography variant="subtitle2" sx={{ lineHeight: 1.57 }}>
          {product.description}
        </Typography>
        <Grid container columns={2} width="20%" marginTop="30px">
          <Grid item xs={1}>
            <StyledTypography
              sx={{
                fontWeight: theme.typography.bold.fontWeight,
                paddingBottom: '20px',
              }}
            >
              {t('product.color')}
            </StyledTypography>
            <StyledTypography
              sx={{
                fontWeight: theme.typography.bold.fontWeight,
                paddingBottom: '20px',
              }}
            >
              {t('product.style')}
            </StyledTypography>
            <StyledTypography
              sx={{
                fontWeight: theme.typography.bold.fontWeight,
              }}
            >
              {t('product.type')}
            </StyledTypography>
          </Grid>
          <Grid item xs={1}>
            <StyledTypography
              sx={{
                paddingBottom: '20px',
              }}
            >
              {capitalizeAndTruncate(product.colors[0])}
            </StyledTypography>
            <StyledTypography
              sx={{
                paddingBottom: '20px',
              }}
            >
              {capitalizeAndTruncate(product.style)}
            </StyledTypography>
            <StyledTypography>
              {capitalizeAndTruncate(product.type)}
            </StyledTypography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DescriptionSection;
