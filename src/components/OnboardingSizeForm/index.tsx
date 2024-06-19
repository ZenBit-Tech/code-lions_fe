import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { urls } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { CustomSelect } from 'src/components/shared/StyledSelect';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import {
  clothesSizeData,
  shoeSizeData,
} from 'src/pages/SizesGuidePage/tableData';
import theme from 'src/theme';

const clothesSizes = clothesSizeData.rows.map((row) => ({
  label: row[3],
  value: row[4],
}));
const shoesSizes = shoeSizeData.rows.map((row) => ({
  label: row[0],
  value: row[1],
}));
const jeansSizes = [
  { label: 'W 27 H 33', value: 'W 27 H 33' },
  { label: 'W 28 H 34', value: 'W 28 H 34' },
  { label: 'W 26 H 35', value: 'W 26 H 35' },
  { label: 'W 25 H 36', value: 'W 25 H 36' },
  { label: 'W 30 H 38', value: 'W 30 H 38' },
  { label: 'W 32 H 40', value: 'W 32 H 40' },
  { label: 'W 28 H 37', value: 'W 28 H 37' },
  { label: 'W 27 H 32', value: 'W 27 H 32' },
  { label: 'W 31 H 39', value: 'W 31 H 39' },
  { label: 'W 29 H 35', value: 'W 29 H 35' },
];

function OnboardingSizeForm() {
  const { t } = useTranslation();

  const [value, setValue] = useState(clothesSizes[0].value);
  const [value1, setValue1] = useState(jeansSizes[0].value);
  const [value2, setValue2] = useState(shoesSizes[0].value);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        bgcolor: theme.palette.background.default,
        padding: '24px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '250px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.clothesSize')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.sizesDescription')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={clothesSizes}
            displayEmpty
            value={value}
            onChange={(v) => setValue(String(v.target.value))}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '250px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.jeansSize')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.sizesDescription')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={jeansSizes}
            displayEmpty
            value={value1}
            onChange={(v) => setValue1(String(v.target.value))}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '250px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.shoesSize')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.sizesDescription')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={shoesSizes}
            displayEmpty
            value={value2}
            onChange={(v) => setValue2(String(v.target.value))}
          />

          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '14px',
              margin: '40px 12px 0 0',
            }}
          >
            <Link to={urls.SIZES_GUIDE}>{t('onboarding.sizeAndFit')} </Link>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          paddingTop: '24px',
        }}
      >
        <StyledButton
          styles={StyleVariants.TRANSPARENT2}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
        >
          {t('onboarding.prev')}
        </StyledButton>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
          radius="8px"
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingSizeForm;
