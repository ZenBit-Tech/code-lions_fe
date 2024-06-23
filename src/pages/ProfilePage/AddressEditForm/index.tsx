import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import LabelText from 'src/components/shared/LabelText';
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
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';

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

interface IAddressEditForm {
  setShowEdit: (arg0: boolean) => void;
}

function AddressEditForm({ setShowEdit }: IAddressEditForm) {
  const { t } = useTranslation();

  const [country, setCountry] = useState(countries[0].value);
  const [state, setState] = useState(states[0].value);
  const [city, setCity] = useState(cities[0].value);

  return (
    <form>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          mt: '20px',
          mb: '20px',
        }}
      >
        <TitleInputWrapper>
          <LabelText>{t('onboarding.addressLine1')}</LabelText>
          <StyledInput
            fullWidth
            autoComplete="off"
            placeholder={t('onboarding.street')}
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            width="100%"
          />
        </TitleInputWrapper>
        <TitleInputWrapper>
          <LabelText>{t('onboarding.addressLine2')}</LabelText>
          <StyledInput
            fullWidth
            autoComplete="off"
            placeholder={t('onboarding.street')}
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            width="100%"
          />
        </TitleInputWrapper>
        <TitleInputWrapper>
          <LabelText>{t('onboarding.country')}</LabelText>
          <CustomSelect
            options={countries}
            displayEmpty
            value={country}
            onChange={(v) => setCountry(String(v.target.value))}
          />
        </TitleInputWrapper>
        <TitleInputWrapper>
          <LabelText>{t('onboarding.state')}</LabelText>
          <CustomSelect
            options={states}
            displayEmpty
            value={state}
            onChange={(v) => setState(String(v.target.value))}
          />
        </TitleInputWrapper>
        <TitleInputWrapper>
          <LabelText>{t('onboarding.city')}</LabelText>
          <CustomSelect
            options={cities}
            displayEmpty
            value={city}
            onChange={(v) => setCity(String(v.target.value))}
          />
        </TitleInputWrapper>
      </Box>
      <StyledButton
        type="submit"
        onClick={() => setShowEdit(false)}
        width="101px"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.SM}
      >
        <Typography variant="h4">{t('profileDetails.saveButton')}</Typography>
      </StyledButton>
    </form>
  );
}

export default AddressEditForm;
