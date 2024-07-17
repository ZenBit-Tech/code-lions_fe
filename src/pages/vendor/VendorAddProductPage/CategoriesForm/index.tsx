import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

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
  setCategory,
  setStyle,
  setType,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
import {
  decreaseOnboardingStep,
  increaseOnboardingStep,
} from 'src/redux/user/userSlice';
import theme from 'src/theme';

const categories = [
  { label: 'Select category', value: 'Select category' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Bags', value: 'Bags' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Designers', value: 'Designers' },
  { label: 'Evental Rent', value: 'Evental Rent' },
];

const clothesTypes = [
  { label: 'Select type', value: 'Select type' },
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Dress', value: 'Dress' },
  { label: 'Jeans', value: 'Jeans' },
  { label: 'Bag', value: 'Bag' },
  { label: 'Accessory', value: 'Accessory' },
  { label: 'Other', value: 'Other' },
];

const styles = [
  { label: 'Select style', value: 'Select style' },
  { label: 'Casual', value: 'Casual' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Fancy', value: 'Fancy' },
];

function CategoriesForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [clothesCategory, setClothesCategory] = useState(categories[0].value);
  const [clothesType, setClothesType] = useState(clothesTypes[0].value);
  const [clothesStyle, setClothesStyle] = useState(styles[0].value);

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
  };

  const goToNextStep = () => {
    dispatch(setCategory(clothesCategory));
    dispatch(setType(clothesType));
    dispatch(setStyle(clothesStyle));
    dispatch(increaseOnboardingStep());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        bgcolor: theme.palette.background.default,
        padding: '24px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '150px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.category')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.categorySubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={categories}
            displayEmpty
            value={clothesCategory}
            onChange={(v) => setClothesCategory(String(v.target.value))}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '150px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.type')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.typeSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={clothesTypes}
            displayEmpty
            value={clothesType}
            onChange={(v) => setClothesType(String(v.target.value))}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '150px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.style')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.styleSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={styles}
            displayEmpty
            placeholder="Select style"
            value={clothesStyle}
            onChange={(v) => setClothesStyle(String(v.target.value))}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '24px',
        }}
      >
        <StyledButton
          styles={StyleVariants.TRANSPARENT2}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize={String(theme.typography.h4.fontSize)}
          fontFamily={theme.typography.fontFamily}
          onClick={returnBack}
        >
          {t('onboarding.prev')}
        </StyledButton>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize={String(theme.typography.h4.fontSize)}
          fontFamily={theme.typography.fontFamily}
          radius="8px"
          onClick={goToNextStep}
          disabled={
            clothesCategory === categories[0].value ||
            clothesType === clothesTypes[0].value ||
            clothesStyle === styles[0].value
          }
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default CategoriesForm;
