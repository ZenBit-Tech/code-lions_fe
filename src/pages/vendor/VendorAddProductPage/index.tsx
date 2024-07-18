import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

import OnboardingHeaderItem from 'src/pages/OnboardingPage/HeaderItem';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  selectOnboardingStep,
  setOnboardingStepEqualFinish,
} from 'src/redux/user/userSlice';
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
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectOnboardingStep);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      const targetElement = event.target as HTMLElement;

      if (
        !targetElement.closest('.MuiSelect-root') &&
        !targetElement.closest('.MuiPaper-root')
      ) {
        setShowConfirmDialog(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        ref={componentRef}
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

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('addProduct.confirmCloseTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('addProduct.confirmCloseMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)} color="primary">
            {t('addProduct.no')}
          </Button>
          <Button
            onClick={() => {
              setShowConfirmDialog(false);
              dispatch(setOnboardingStepEqualFinish());
            }}
            color="primary"
            autoFocus
          >
            {t('addProduct.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VendorAddProductPage;
