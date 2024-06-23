import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Box } from '@mui/system';

import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import { useAppSelector } from 'src/redux/hooks';
import { NonAdminRole, UserRole } from 'src/redux/user/types';
import { useUpdateRoleMutation } from 'src/redux/user/userService';
import theme from 'src/theme';

import { StyledFormControlLabel, StyledRadio } from './styles';

const Roles = {
  BUYER: 'buyer',
  VENDOR: 'vendor',
} as const;

function OnboardingRoleForm() {
  const { t } = useTranslation();
  const [updateRole, { isLoading }] = useUpdateRoleMutation();
  const user = useAppSelector((state) => state.user);
  const [role, setRole] = useState<UserRole>(user.role || Roles.BUYER);
  const { showToast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value as NonAdminRole);
  };

  const sendRequest = async () => {
    try {
      await updateRole({ id: user.id, role }).unwrap();
    } catch (err) {
      if (err instanceof Error) {
        showToast('error', err.message);
      } else {
        showToast('error', t('onboarding.unknownError'));
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        bgcolor: theme.palette.background.default,
        padding: '24px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '220px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.role')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.chooseTypeOfAccount')}
          </OnboardingText>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: '150px' }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={role}
              onChange={handleChange}
              sx={{ display: 'flex', gap: '96px' }}
            >
              <StyledFormControlLabel
                value={Roles.BUYER}
                control={<StyledRadio disableRipple />}
                label={t('onboarding.buyer')}
              />
              <StyledFormControlLabel
                value={Roles.VENDOR}
                control={<StyledRadio disableRipple />}
                label={t('onboarding.vendor')}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          paddingTop: '24px',
        }}
      >
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          type="submit"
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
          radius="8px"
          onClick={sendRequest}
          disabled={isLoading}
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingRoleForm;
