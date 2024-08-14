import { useTranslation } from 'react-i18next';

import { Grid, Box, Typography, Link } from '@mui/material';

import capitalizeAndTruncate from 'src/common/utils/capitalizeAndTruncate';
import processStringArray from 'src/pages/ProductPage/utils/processStringArray';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import { StyledTypography } from './styles';

interface ProductSectionProps {
  product: IProduct;
}

function DescriptionSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();

  const processedColors = processStringArray(
    product.colors,
    capitalizeAndTruncate
  );
  const processedCategories = processStringArray(
    product.categories,
    capitalizeAndTruncate
  );

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
        <Box display="flex" justifyContent="space-between" marginTop="30px">
          <Grid container columns={3}>
            <Grid item xs={1}>
              <StyledTypography
                sx={{
                  fontWeight: theme.typography.bold.fontWeight,
                  paddingBottom: '20px',
                }}
              >
                {t('product.brand')}
              </StyledTypography>
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
                {t('product.material')}
              </StyledTypography>
              {product.pdfUrl && (
                <StyledTypography
                  sx={{
                    fontWeight: theme.typography.bold.fontWeight,
                  }}
                >
                  {t('product.file')}
                </StyledTypography>
              )}
            </Grid>
            <Grid item xs={2}>
              <StyledTypography
                sx={{
                  paddingBottom: '20px',
                }}
              >
                {capitalizeAndTruncate(product.brand)}
              </StyledTypography>
              <StyledTypography
                sx={{
                  paddingBottom: '20px',
                }}
              >
                {processedColors}
              </StyledTypography>
              <StyledTypography
                sx={{
                  paddingBottom: '20px',
                }}
              >
                {capitalizeAndTruncate(product.material)}
              </StyledTypography>
              {product.pdfUrl && (
                <StyledTypography>
                  <Link
                    href={product.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('product.productFile')}
                  </Link>
                </StyledTypography>
              )}
            </Grid>
          </Grid>

          <Grid container columns={3}>
            <Grid item xs={1}>
              <StyledTypography
                sx={{
                  fontWeight: theme.typography.bold.fontWeight,
                  paddingBottom: '20px',
                }}
              >
                {t('product.categories')}
              </StyledTypography>
              <StyledTypography
                sx={{
                  fontWeight: theme.typography.bold.fontWeight,
                  paddingBottom: '20px',
                }}
              >
                {t('product.type')}
              </StyledTypography>
              <StyledTypography
                sx={{
                  fontWeight: theme.typography.bold.fontWeight,
                  paddingBottom: '20px',
                }}
              >
                {t('product.style')}
              </StyledTypography>
            </Grid>
            <Grid item xs={2}>
              <StyledTypography sx={{ paddingBottom: '20px' }}>
                {processedCategories}
              </StyledTypography>
              <StyledTypography sx={{ paddingBottom: '20px' }}>
                {capitalizeAndTruncate(product.type)}
              </StyledTypography>
              <StyledTypography
                sx={{
                  paddingBottom: '20px',
                }}
              >
                {capitalizeAndTruncate(product.style)}
              </StyledTypography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default DescriptionSection;
