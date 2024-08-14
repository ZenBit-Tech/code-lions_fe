import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import RejectProductFlowModal from 'src/components/shared/RejectProductFlowModal';
import useRejectProductFlowModal from 'src/components/shared/RejectProductFlowModal/hooks/useRejectProductFlowModal';
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
} from '../../VendorAddProductPage/ProductDescriptionForm/productDescriptionConstants';

import useCategoriesConstants from './hooks/useCategoriesConstants';

function CategoriesForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.addProduct.categories
  );
  const selectedType = useAppSelector((state) => state.addProduct.type);
  const selectedStyle = useAppSelector((state) => state.addProduct.style);

  const { isRejectModalOpen, toggleRejectModal } = useRejectProductFlowModal();

  const [clothesCategory, setClothesCategory] = useState<string>(
    selectedCategories[0]
  );
  const [clothesType, setClothesType] = useState<string>(selectedType);
  const [clothesStyle, setClothesStyle] = useState<string>(selectedStyle);
  const [shoesType, setShoesType] = useState<string>(selectedType);
  const [bagType, setBagType] = useState<string>(selectedType);
  const [accessoryType, setAccessoryType] = useState<string>(selectedType);
  const [clothingType, setClothingType] = useState<string>(selectedType);

  const { productCategories, clothesTypes, styles } = useCategoriesConstants();

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
            {clothesCategory === designersCategory ||
            clothesCategory === eventalCategory ? (
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
          modalTitle={t('editModal.title')}
          modalSubtitle={t('editModal.subtitle')}
        />
      )}
    </>
  );
}

export default CategoriesForm;
