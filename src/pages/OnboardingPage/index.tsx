import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import { onboardingSteps } from 'src/common/constants';
import Header from 'src/components/Header';
import OnboardingCreditCardForm from 'src/components/OnboardingCreditCardForm';
import OnboardingHeaderItem from 'src/components/OnboardingHeaderItem';
import OnboardingInfoForm from 'src/components/OnboardingInfoForm';
import OnboardingRoleForm from 'src/components/OnboardingRoleForm';
import OnboardingShippingForm from 'src/components/OnboardingShippingForm';
import OnboardingSizeForm from 'src/components/OnboardingSizeForm';
import { useAppSelector } from 'src/redux/hooks';
import { selectOnboardingStep } from 'src/redux/user/userSlice';
import theme from 'src/theme';

// const currentStep = 1;

function OnboardingPage() {
  const { t } = useTranslation();
  const currentStep = useAppSelector(selectOnboardingStep);

  const onboardingData = [
    {
      stepId: onboardingSteps.ROLE,
      title: t('onboarding.userRole'),
      component: <OnboardingRoleForm />,
    },
    {
      stepId: onboardingSteps.INFO,
      title: t('onboarding.generalInformation'),
      component: <OnboardingInfoForm />,
    },
    {
      stepId: onboardingSteps.ADDRESS,
      title: t('onboarding.yourAddress'),
      component: <OnboardingShippingForm />,
    },
    {
      stepId: onboardingSteps.CARD,
      title: t('onboarding.creditCard'),
      component: <OnboardingCreditCardForm />,
    },
    {
      stepId: onboardingSteps.SIZES,
      title: t('onboarding.size'),
      component: <OnboardingSizeForm />,
    },
  ];

  const currentStepComponent = onboardingData.find(
    (step) => step.stepId === currentStep
  )?.component;

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 68px)',
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Box
          sx={{
            width: '1136px',
            margin: 'auto',
            boxShadow: theme.shadows[1],
          }}
        >
          <Box sx={{ width: '100%', padding: '24px 0 0' }}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '12px',
                  alignItems: 'center',
                  ml: '0',
                }}
              >
                <Box sx={{ height: '24px', mb: '2px' }}>
                  <Link to="/">
                    <ArrowLeftIcon />
                  </Link>
                </Box>
                <Typography variant="h1" sx={{ fontWeight: 700 }}>
                  {t('onboarding.fillProfile')}
                </Typography>
              </Box>
            </Box>

            <Box
              component="ul"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                mt: '24px',
                padding: 0,
              }}
            >
              {onboardingData.map((step) => (
                <OnboardingHeaderItem
                  key={step.stepId}
                  stepId={step.stepId}
                  title={step.title}
                  finished={step.stepId < currentStep}
                  active={step.stepId === currentStep}
                />
              ))}
            </Box>
          </Box>
          {currentStepComponent}
        </Box>
      </Box>
    </>
  );
}

export default OnboardingPage;
