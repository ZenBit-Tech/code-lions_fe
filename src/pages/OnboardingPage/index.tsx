import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import Header from 'src/components/Header';
import OnboardingHeaderItem from 'src/components/OnboardingHeaderItem';
import theme from 'src/theme';

const currentStep = 5;

function OnboardingPage() {
  const { t } = useTranslation();
  const onboardingItems = [
    { itemId: 1, title: t('onboarding.userRole') },
    { itemId: 2, title: t('onboarding.generalInformation') },
    { itemId: 3, title: t('onboarding.yourAddress') },
    { itemId: 4, title: t('onboarding.creditCard') },
    { itemId: 5, title: t('onboarding.size') },
  ];

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
        <Box sx={{ width: '1136px', margin: 'auto', padding: '24px 0' }}>
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
              <Link to="/">
                <ArrowLeftIcon />
              </Link>
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
            {onboardingItems.map((item) => (
              <OnboardingHeaderItem
                key={item.itemId}
                {...item}
                finished={item.itemId < currentStep}
                active={item.itemId === currentStep}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OnboardingPage;
