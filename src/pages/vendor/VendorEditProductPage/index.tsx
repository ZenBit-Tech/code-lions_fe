import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { skipToken } from '@reduxjs/toolkit/query';
import OnboardingHeaderItem from 'src/pages/OnboardingPage/HeaderItem';
import {
  addPhotos,
  selectAddProductStep,
  setBrand,
  setCategory,
  setColor,
  setDescription,
  setId,
  setMaterial,
  setName,
  setPdfUrl,
  setPrice,
  setSize,
  setStyle,
  setType,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useGetProductByIdQuery } from 'src/redux/product/productService';
import theme from 'src/theme';

import CategoriesForm from './CategoriesForm';
import FinishForm from './FinishForm';
import ImagesForm from './ImagesForm';
import ProductDescriptionForm from './ProductDescriptionForm';

function VendorEditProductPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const addProductData = [
    {
      stepId: 1,
      title: t('editProduct.stepOneTitle'),
      component: <ImagesForm />,
    },
    {
      stepId: 2,
      title: t('editProduct.stepTwoTitle'),
      component: <CategoriesForm />,
    },
    {
      stepId: 3,
      title: t('editProduct.stepThreeTitle'),
      component: <ProductDescriptionForm />,
    },
    {
      stepId: 4,
      title: t('editProduct.stepFourTitle'),
      component: <FinishForm />,
    },
  ];

  const { data } = useGetProductByIdQuery(
    productId ? { productId } : skipToken
  );

  useEffect(() => {
    if (data) {
      const images = data.images.map((url: string) => ({
        type: 'image',
        src: url,
        isPrimary: false,
      }));

      const categories = data.categories || [];
      const type = data.type || '';
      const style = data.style || '';
      const name = data.name || '';
      const description = data.description || '';
      const brand = data.brand || '';
      const size = data.size || '';
      const productColors = data.colors || [];
      const material = data.material || '';
      const pdfUrl = data.pdfUrl || '';
      const price = data.price || '';

      dispatch(setId(productId || 'new'));
      dispatch(addPhotos(images));
      dispatch(setCategory(categories[0]));
      dispatch(setType(type));
      dispatch(setStyle(style));
      dispatch(setName(name));
      dispatch(setDescription(description));
      dispatch(setBrand(brand));
      dispatch(setSize(size));
      dispatch(setColor(productColors[0]));
      dispatch(setMaterial(material));
      dispatch(setPdfUrl(pdfUrl));
      dispatch(setPrice(Number(price)));
    }
  }, [data, dispatch, productId]);

  const currentStep = useAppSelector(selectAddProductStep);

  const currentStepComponent = addProductData.find(
    (step) => step.stepId === currentStep
  )?.component;

  return (
    <>
      <Box
        component="div"
        sx={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            boxShadow: theme.shadows[1],
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: theme.typography.bold.fontWeight, mb: '24px' }}
          >
            {t('editProduct.title')}
          </Typography>
          <Box
            component="ul"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: 0,
            }}
          >
            {addProductData.map((step) => (
              <OnboardingHeaderItem
                key={step.stepId}
                stepId={step.stepId}
                title={step.title}
                finished={step.stepId < currentStep}
                active={step.stepId === currentStep}
              />
            ))}
          </Box>
          {currentStepComponent}
        </Box>
      </Box>
    </>
  );
}

export default VendorEditProductPage;
