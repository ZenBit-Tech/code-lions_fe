import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

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
import {
  clothesSizeData,
  shoeSizeData,
} from 'src/pages/SizesGuidePage/tableData';
import {
  setBrand,
  setColor,
  setDescription,
  setMaterial,
  setName,
  setSize,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  decreaseOnboardingStep,
  increaseOnboardingStep,
} from 'src/redux/user/userSlice';
import theme from 'src/theme';

const brands = [
  { label: 'Select brand', value: 'Select brand' },
  { label: 'Michael Kors', value: 'Michael Kors' },
  { label: 'Chiara Ferragni', value: 'Chiara Ferragni' },
  { label: 'Beatrice B', value: 'Beatrice B' },
  { label: 'Nai Lu-na', value: 'Nai Lu-na' },
  { label: 'Marjolaine', value: 'Marjolaine' },
  { label: 'Luisa Cerano', value: 'Luisa Cerano' },
  { label: 'Deni Cler Milano', value: 'Deni Cler Milano' },
  { label: 'KENZO', value: 'KENZO' },
  { label: 'Andres Sarda', value: 'Andres Sarda' },
  { label: 'Lolita dress', value: 'Lolita dress' },
  { label: 'Armani Exchange', value: 'Armani Exchange' },
  { label: 'Diesel', value: 'Diesel' },
];

const clothesSizes = clothesSizeData.rows.map((row) => ({
  label: row[3],
  value: row[4],
}));
const shoesSizes = shoeSizeData.rows.map((row) => ({
  label: row[0],
  value: row[1],
}));

const colors = [
  { label: 'Select color', value: 'Select color' },
  { label: 'black', value: 'black' },
  { label: 'blue', value: 'blue' },
  { label: 'brown', value: 'brown' },
  { label: 'green', value: 'green' },
  { label: 'grey', value: 'grey' },
  { label: 'orange', value: 'orange' },
  { label: 'yellow', value: 'yellow' },
  { label: 'pink', value: 'pink' },
  { label: 'purple', value: 'purple' },
  { label: 'red', value: 'red' },
  { label: 'white', value: 'white' },
];

const materials = [
  { label: 'Select material', value: 'Select material' },
  { label: 'Chiffon', value: 'Chiffon' },
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Crepe', value: 'Crepe' },
  { label: 'Denim', value: 'Denim' },
  { label: 'Lace', value: 'Lace' },
  { label: 'Leather', value: 'Leather' },
  { label: 'Linen', value: 'Linen' },
  { label: 'Satin', value: 'Satin' },
  { label: 'Silk', value: 'Silk' },
  { label: 'Nylon', value: 'Nylon' },
  { label: 'Polyester', value: 'Polyester' },
  { label: 'Spandex', value: 'Spandex' },
  { label: 'Velvet', value: 'Velvet' },
  { label: 'Wool', value: 'Wool' },
];

const shoesMaterials = [
  { label: 'Select material', value: 'Select material' },
  { label: 'leather', value: 'leather' },
  { label: 'textile', value: 'textile' },
  { label: 'synthetic', value: 'synthetic' },
  { label: 'rubber', value: 'rubber' },
  { label: 'foam', value: 'foam' },
  { label: 'plastic', value: 'plastic' },
];

const shoesCategory = 'Shoes';

function ProductDescriptionForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.addProduct.category);

  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productBrand, setProductBrand] = useState<string>(brands[0].value);
  const [clothesSize, setClothesSize] = useState<string>(clothesSizes[0].value);
  const [shoesSize, setShoesSize] = useState<string>(shoesSizes[0].value);
  const [productColor, setProductColor] = useState<string>(colors[0].value);
  const [productMaterial, setProductMaterial] = useState<string>(
    materials[0].value
  );
  const [shoesMaterial, setShoesMaterial] = useState<string>(
    shoesMaterials[0].value
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading:', selectedFile);
    }
  };

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
  };

  const goToNextStep = () => {
    dispatch(setName(productName));
    dispatch(setDescription(productDescription));
    dispatch(setBrand(productBrand));
    dispatch(
      setSize(selectedCategory === shoesCategory ? shoesSize : clothesSize)
    );
    dispatch(setColor(productColor));
    dispatch(setMaterial(productMaterial));

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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.name')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.nameSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <StyledInput
            stylevariant={InputStyleVariants.OUTLINED}
            padding={InputPaddingVariants.MD}
            width="100%"
            placeholder={t('addProduct.namePlaceholder')}
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.description')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.descriptionSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <StyledInput
            stylevariant={InputStyleVariants.OUTLINED}
            padding={InputPaddingVariants.MD}
            multiline
            rows={5}
            width="100%"
            placeholder={t('addProduct.descriptionPlaceholder')}
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            sx={{
              '& .css-kkhb97-MuiInputBase-root-MuiOutlinedInput-root': {
                padding: 0,
              },
            }}
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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.brand')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.brandSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={brands}
            displayEmpty
            value={productBrand}
            onChange={(v) => setProductBrand(String(v.target.value))}
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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.size')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.sizeSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={
              selectedCategory === shoesCategory ? shoesSizes : clothesSizes
            }
            displayEmpty
            value={selectedCategory === shoesCategory ? shoesSize : clothesSize}
            onChange={
              selectedCategory === shoesCategory
                ? (v) => setShoesSize(String(v.target.value))
                : (v) => setClothesSize(String(v.target.value))
            }
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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.color')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.colorSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={colors}
            displayEmpty
            value={productColor}
            onChange={(v) => setProductColor(String(v.target.value))}
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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.materials')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.materialsSubtitle')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={
              selectedCategory === shoesCategory ? shoesMaterials : materials
            }
            displayEmpty
            value={
              selectedCategory === shoesCategory
                ? shoesMaterial
                : productMaterial
            }
            onChange={
              selectedCategory === shoesCategory
                ? (v) => setShoesMaterial(String(v.target.value))
                : (v) => setProductMaterial(String(v.target.value))
            }
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
            width: '236px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('addProduct.upload')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('addProduct.uploadSubtitle')}
          </OnboardingText>
        </Box>
        <Box
          sx={{ flex: 1, display: 'flex', gap: '24px', alignItems: 'center' }}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Box
              sx={{
                width: '675px',
                border: `1px solid ${theme.palette.border.primary}`,
                borderRadius: '6px',
                padding: '12px 16px',
                cursor: 'pointer',
                fontFamily: theme.typography.subtitle2.fontFamily,
                fontWeight: 400,
                color: theme.palette.text.primary,
                lineHeight: 1.37,

                '&:hover': {
                  border: `1px solid ${theme.palette.border.dark}`,
                },

                '&:focus': {
                  border: `1px solid ${theme.palette.border.dark}`,
                },
              }}
            >
              {selectedFile ? selectedFile.name : t('addProduct.chooseFile')}
            </Box>
          </label>
          <StyledButton
            onClick={handleUpload}
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            radius="8px"
            disabled={!selectedFile}
            sx={{
              height: '34px',
            }}
          >
            {t('addProduct.uploadBtn')}
          </StyledButton>
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
      </Box>
    </Box>
  );
}

export default ProductDescriptionForm;
