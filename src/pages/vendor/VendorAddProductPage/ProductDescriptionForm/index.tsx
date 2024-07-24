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
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useUploadProductPdfMutation } from 'src/redux/addProduct/addProductService';
import {
  decreaseAddProductStep,
  increaseAddProductStep,
  selectProductId,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import {
  accessoriesCategory,
  bagsCategory,
  brands,
  clothesSizes,
  colors,
  dressType,
  jeansSizes,
  jeansType,
  materials,
  otherType,
  shoesCategory,
  shoesMaterials,
  shoesSizes,
  shoesType,
  uniqueSizes,
} from './constants';
import useProductDispatch from './hooks/useProductDispatch';
import ReusableDescriptionBox from './ReusableDescriptionBox';

function ProductDescriptionForm() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.addProduct.category);
  const selectedType = useAppSelector((state) => state.addProduct.type);
  const productId = useAppSelector(selectProductId);

  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productBrand, setProductBrand] = useState<string>(brands[0].value);
  const [clothesSize, setClothesSize] = useState<string>(clothesSizes[0].value);
  const [shoesSize, setShoesSize] = useState<string>(shoesSizes[0].value);
  const [jeansSize, setJeansSize] = useState<string>(jeansSizes[0].value);
  const [uniqueSize, setUniqueSize] = useState<string>(uniqueSizes[0].value);
  const [productColor, setProductColor] = useState<string>(colors[0].value);
  const [productMaterial, setProductMaterial] = useState<string>(
    materials[0].value
  );
  const [shoesMaterial, setShoesMaterial] = useState<string>(
    shoesMaterials[0].value
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProductPdf] = useUploadProductPdfMutation();

  const productDispatch = useProductDispatch(
    productName,
    productDescription,
    productBrand,
    shoesSize,
    clothesSize,
    uniqueSize,
    jeansSize,
    productColor,
    shoesMaterial,
    productMaterial
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formDataPdf = new FormData();

        formDataPdf.append('file', selectedFile);

        const response = await uploadProductPdf({
          id: productId,
          file: formDataPdf,
        }).unwrap();

        console.log(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', error.message);
      } else {
        showToast('error', t('onboarding.unknownError'));
      }
    }
  };

  const returnBack = () => {
    dispatch(decreaseAddProductStep());
  };

  const goToNextStep = () => {
    productDispatch();
    dispatch(increaseAddProductStep());
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.name')}
          descriptionSubtitle={t('addProduct.nameSubtitle')}
        />
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.description')}
          descriptionSubtitle={t('addProduct.descriptionSubtitle')}
        />
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.brand')}
          descriptionSubtitle={t('addProduct.brandSubtitle')}
        />
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.size')}
          descriptionSubtitle={t('addProduct.sizeSubtitle')}
        />
        <Box sx={{ flex: 1 }}>
          {selectedCategory === shoesCategory || selectedType === shoesType ? (
            <CustomSelect
              options={shoesSizes}
              displayEmpty
              value={shoesSize}
              onChange={(v) => setShoesSize(String(v.target.value))}
            />
          ) : null}
          {selectedType === dressType ||
          (selectedType === otherType && selectedCategory !== shoesCategory) ? (
            <CustomSelect
              options={clothesSizes}
              displayEmpty
              value={clothesSize}
              onChange={(v) => setClothesSize(String(v.target.value))}
            />
          ) : null}
          {selectedCategory === bagsCategory ||
          selectedCategory === accessoriesCategory ? (
            <CustomSelect
              options={uniqueSizes}
              displayEmpty
              disabled
              value={uniqueSize}
              onChange={(v) => setUniqueSize(String(v.target.value))}
            />
          ) : null}
          {selectedType === jeansType ? (
            <CustomSelect
              options={jeansSizes}
              displayEmpty
              value={jeansSize}
              onChange={(v) => setJeansSize(String(v.target.value))}
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.color')}
          descriptionSubtitle={t('addProduct.colorSubtitle')}
        />
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.materials')}
          descriptionSubtitle={t('addProduct.materialsSubtitle')}
        />
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            options={
              selectedCategory === shoesCategory || selectedType === shoesType
                ? shoesMaterials
                : materials
            }
            displayEmpty
            value={
              selectedCategory === shoesCategory || selectedType === shoesType
                ? shoesMaterial
                : productMaterial
            }
            onChange={
              selectedCategory === shoesCategory || selectedType === shoesType
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
        <ReusableDescriptionBox
          descriptionTitle={t('addProduct.upload')}
          descriptionSubtitle={t('addProduct.uploadSubtitle')}
        />
        <Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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
                width: '600px',
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
          disabled={
            !productName ||
            !productDescription ||
            productBrand === brands[0].value ||
            !productColor ||
            !productMaterial ||
            !shoesMaterial ||
            !selectedFile
          }
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default ProductDescriptionForm;
