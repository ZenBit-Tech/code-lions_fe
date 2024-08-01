import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import OnboardingHeaderItem from 'src/pages/OnboardingPage/HeaderItem';
import { selectAddProductStep } from 'src/redux/addProduct/addProductSlice';
import { useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import CategoriesForm from './CategoriesForm';
import FinishForm from './FinishForm';
import ImagesForm from './ImagesForm';
import ProductDescriptionForm from './ProductDescriptionForm';

function VendorAddProductPage() {
  const { t } = useTranslation();
  const currentStep = useAppSelector(selectAddProductStep);

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
            {t('addProduct.title')}
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

export default VendorAddProductPage;
