import { useTranslation } from 'react-i18next';

import { Grid, Box, Typography } from '@mui/material';

import theme from 'src/theme';

import { StyledTypography } from './styles';

function DescriptionSection() {
  const { t } = useTranslation();

  return (
    <Box padding="0 166px 52px 166px">
      <Typography
        variant="button"
        sx={{ fontWeight: 700, fontSize: '20px', lineHeight: 1.75 }}
      >
        {t('product.description')}
      </Typography>
      <Box
        sx={{ borderTop: `1px solid ${theme.palette.border.primary}` }}
        padding="30px 0"
        marginTop="5px"
      >
        <Typography variant="subtitle2" sx={{ lineHeight: 1.57 }}>
          {t('product.descriptionFull')}
        </Typography>
        <Grid container columns={2} width="20%" marginTop="30px">
          <Grid item xs={1}>
            <StyledTypography
              sx={{
                fontWeight: 700,
                paddingBottom: '20px',
              }}
            >
              {t('product.size')}
            </StyledTypography>
            <StyledTypography
              sx={{
                fontWeight: 700,
                paddingBottom: '20px',
              }}
            >
              {t('product.color')}
            </StyledTypography>
            <StyledTypography
              sx={{
                fontWeight: 700,
              }}
            >
              {t('product.height')}
            </StyledTypography>
          </Grid>
          <Grid item xs={1}>
            <StyledTypography
              sx={{
                paddingBottom: '20px',
              }}
            >
              {t('product.mockSize')}
            </StyledTypography>
            <StyledTypography
              sx={{
                paddingBottom: '20px',
              }}
            >
              {t('product.mockColor')}
            </StyledTypography>
            <StyledTypography>{t('product.mockHeight')}</StyledTypography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DescriptionSection;
