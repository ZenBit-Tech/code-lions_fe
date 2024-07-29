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
  increaseAddProductStep,
  decreaseAddProductStep,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import RejectEditingModal from '../RejectEditingModal';

const productCategories = [
  { label: 'Accessories', value: 'accessories' },
  { label: 'Bags', value: 'bags' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Designers', value: 'designers' },
  { label: 'Evental', value: 'evental' },
];

const clothesTypes = [
  { label: 'Shoes', value: 'shoes' },
  { label: 'Dress', value: 'dress' },
  { label: 'Bag', value: 'bag' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Accessory', value: 'accessory' },
  { label: 'Other', value: 'other' },
];

const styles = [
  { label: 'Casual', value: 'casual' },
  { label: 'Premium', value: 'premium' },
  { label: 'Fancy', value: 'fancy' },
];

function CategoriesForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.addProduct.categories
  );
  const selectedType = useAppSelector((state) => state.addProduct.type);
  const selectedStyle = useAppSelector((state) => state.addProduct.style);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const [clothesCategory, setClothesCategory] = useState(selectedCategories[0]);
  const [clothesType, setClothesType] = useState(selectedType);
  const [clothesStyle, setClothesStyle] = useState(selectedStyle);

  const returnBack = () => {
    dispatch(decreaseAddProductStep());
  };

  const goToNextStep = () => {
    dispatch(setCategory(clothesCategory.toLowerCase()));
    dispatch(setType(clothesType.toLowerCase()));
    dispatch(setStyle(clothesStyle.toLowerCase()));
    dispatch(increaseAddProductStep());
  };

  return (
    <>
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
              options={productCategories}
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
          >
            {t('onboarding.next')}
          </StyledButton>
          <StyledButton
            styles={StyleVariants.RED}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            onClick={toggleModal}
          >
            {t('editProduct.cancelBtn')}
          </StyledButton>
        </Box>
      </Box>
      {isModalOpen && (
        <RejectEditingModal isModalOpen={isModalOpen} onClose={toggleModal} />
      )}
    </>
  );
}

export default CategoriesForm;
