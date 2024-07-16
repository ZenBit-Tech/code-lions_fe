import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import OnboardingHeaderItem from 'src/pages/OnboardingPage/HeaderItem';
import { useAppSelector } from 'src/redux/hooks';
import { selectOnboardingStep } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import CategoriesForm from './CategoriesForm';
import FinishForm from './FinishForm';
import ImagesForm from './ImagesForm';
import ProductDescriptionForm from './ProductDescriptionForm';

const addProductData = [
  {
    stepId: 1,
    title: 'Product Photos',
    component: <ImagesForm />,
  },
  {
    stepId: 2,
    title: 'Category & Type',
    component: <CategoriesForm />,
  },
  {
    stepId: 3,
    title: 'Product description',
    component: <ProductDescriptionForm />,
  },
  {
    stepId: 4,
    title: 'Finish & Publish',
    component: <FinishForm />,
  },
];

function VendorAddProductPage() {
  const { t } = useTranslation();
  const currentStep = useAppSelector(selectOnboardingStep);

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
