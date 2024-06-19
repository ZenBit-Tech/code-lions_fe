import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import StyledInput from 'src/components/shared/StyledInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import { CustomSelect } from 'src/components/shared/StyledSelect';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import theme from 'src/theme';

import InputLabel from '../OnboardingCreditCardForm/styles';

const countries = [{ label: 'Canada', value: 'Canada' }];
const states = [
  { label: 'Ontario', value: 'Ontario' },
  { label: 'Quebec', value: 'Quebec' },
  { label: 'Nova Scotia', value: 'Nova Scotia' },
  { label: 'New Brunswick', value: 'New Brunswick' },
  { label: 'Manitoba', value: 'Manitoba' },
  { label: 'British Columbia', value: 'British Columbia' },
  { label: 'Alberta', value: 'Alberta' },
  { label: 'Saskatchewan', value: 'Saskatchewan' },
  { label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador' },
  { label: 'Prince Edward Island', value: 'Prince Edward Island' },
];

const cities = [
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Montreal', value: 'Montreal' },
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Fredericton', value: 'Fredericton' },
  { label: 'Charlottetown', value: 'Charlottetown' },
  { label: "St. John's", value: "St. John's" },
  { label: 'Regina', value: 'Regina' },
  { label: 'Calgary', value: 'Calgary' },
  { label: 'Saskatoon', value: 'Saskatoon' },
  { label: 'Halifax', value: 'Halifax' },
];

function OnboardingShippingForm() {
  const { t } = useTranslation();
  const [country, setCountry] = useState(countries[0].value);
  const [state, setState] = useState(states[0].value);
  const [city, setCity] = useState(cities[0].value);

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
            justifyContent: 'flex-start',
            width: '250px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.shippingAddress')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.addYourShippingAddress')}
          </OnboardingText>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.addressLine1')}
            </InputLabel>
            <StyledInput
              fullWidth
              autoComplete="off"
              placeholder={t('onboarding.street')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
              width="100%"
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.addressLine2')}
            </InputLabel>
            <StyledInput
              fullWidth
              autoComplete="off"
              placeholder={t('onboarding.street')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
              width="100%"
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.country')}
            </InputLabel>
            <CustomSelect
              options={countries}
              displayEmpty
              value={country}
              onChange={(v) => setCountry(String(v.target.value))}
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.state')}
            </InputLabel>
            <CustomSelect
              options={states}
              displayEmpty
              value={state}
              onChange={(v) => setState(String(v.target.value))}
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.city')}
            </InputLabel>
            <CustomSelect
              options={cities}
              displayEmpty
              value={city}
              onChange={(v) => setCity(String(v.target.value))}
            />
          </Box>
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

export default OnboardingShippingForm;
