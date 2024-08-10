import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import RejectProductFlowModal from 'src/components/shared/RejectProductFlowModal';
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

import {
  accessoriesCategory,
  accessoryTypeOptions,
  bagsCategory,
  bagTypeOptions,
  clothingCategory,
  clothingTypeOptions,
  designersCategory,
  eventalCategory,
  shoesCategory,
  shoesTypeOptions,
} from '../ProductDescriptionForm/productDescriptionConstants';

const categories = [
  { label: 'Select category', value: 'select category' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Bags', value: 'bags' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Designers', value: 'designers' },
  { label: 'Evental', value: 'evental' },
];

const clothesTypes = [
  { label: 'Select type', value: 'select type' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Dress', value: 'dress' },
  { label: 'Bag', value: 'bag' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Accessory', value: 'accessory' },
  { label: 'Other', value: 'other' },
];

const styles = [
  { label: 'Select style', value: 'select style' },
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

  const [clothesCategory, setClothesCategory] = useState<string>(
    selectedCategories[0] || categories[0].value
  );
  const [clothesType, setClothesType] = useState<string>(
    selectedType || clothesTypes[0].value
  );
  const [shoesType, setShoesType] = useState<string>(
    selectedType || shoesTypeOptions[0].value
  );
  const [bagType, setBagType] = useState<string>(
    selectedType || bagTypeOptions[0].value
  );
  const [accessoryType, setAccessoryType] = useState<string>(
    selectedType || accessoryTypeOptions[0].value
  );
  const [clothingType, setClothingType] = useState<string>(
    selectedType || clothingTypeOptions[0].value
  );
  const [clothesStyle, setClothesStyle] = useState<string>(
    selectedStyle || styles[0].value
  );

  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  const toggleRejectModal = (): void => {
    setIsRejectModalOpen(!isRejectModalOpen);
  };

  const returnBack = () => {
    dispatch(decreaseAddProductStep());
  };

  const goToNextStep = () => {
    dispatch(setCategory(clothesCategory.toLowerCase()));

    if (
      clothesCategory === designersCategory ||
      clothesCategory === eventalCategory
    ) {
      dispatch(setType(clothesType.toLowerCase()));
    }
    if (clothesCategory === shoesCategory) {
      dispatch(setType(shoesType.toLowerCase()));
    }
    if (clothesCategory === bagsCategory) {
      dispatch(setType(bagType.toLowerCase()));
    }
    if (clothesCategory === accessoriesCategory) {
      dispatch(setType(accessoryType.toLowerCase()));
    }
    if (clothesCategory === clothingCategory) {
      dispatch(setType(clothingType.toLowerCase()));
    }
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
            {clothesCategory === designersCategory ||
            clothesCategory === eventalCategory ||
            clothesCategory === categories[0].value ? (
              <CustomSelect
                options={clothesTypes}
                displayEmpty
                value={clothesType}
                onChange={(v) => setClothesType(String(v.target.value))}
              />
            ) : null}
            {clothesCategory === shoesCategory ? (
              <CustomSelect
                options={shoesTypeOptions}
                displayEmpty
                value={shoesType}
                onChange={(v) => setShoesType(String(v.target.value))}
              />
            ) : null}
            {clothesCategory === bagsCategory ? (
              <CustomSelect
                options={bagTypeOptions}
                displayEmpty
                value={bagType}
                onChange={(v) => setBagType(String(v.target.value))}
              />
            ) : null}
            {clothesCategory === accessoriesCategory ? (
              <CustomSelect
                options={accessoryTypeOptions}
                displayEmpty
                value={accessoryType}
                onChange={(v) => setAccessoryType(String(v.target.value))}
              />
            ) : null}
            {clothesCategory === clothingCategory ? (
              <CustomSelect
                options={clothingTypeOptions}
                displayEmpty
                value={clothingType}
                onChange={(v) => setClothingType(String(v.target.value))}
              />
            ) : null}
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
              clothesStyle === styles[0].value
            }
          >
            {t('onboarding.next')}
          </StyledButton>
          <StyledButton
            styles={StyleVariants.RED}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            onClick={toggleRejectModal}
          >
            {t('editProduct.cancelBtn')}
          </StyledButton>
        </Box>
      </Box>
      {isRejectModalOpen && (
        <RejectProductFlowModal
          isModalOpen={isRejectModalOpen}
          onClose={toggleRejectModal}
          modalTitle={t('rejectAddProductModal.title')}
          modalSubtitle={t('rejectAddProductModal.subtitle')}
        />
      )}
    </>
  );
}

export default CategoriesForm;
