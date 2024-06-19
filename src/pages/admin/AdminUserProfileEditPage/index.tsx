import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Grid,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import ChevronDown from 'src/assets/icons/chevron-down.svg';
import Tick from 'src/assets/icons/tick.svg';
import theme from 'src/theme';

import UserDetailsSection from '../AdminUserProfilePage/UserDetailsSection';

import PhoneInput from './PhoneInput';
import ProfileInputWrapper from './ProfileInputWrapper';
import { BottomWrapper, StyledAdminPanelInput, StyledMenuItem } from './styles';

function AdminUserProfileEditPage() {
  const { t } = useTranslation();

  const [status, setStatus] = useState<string>(
    t('userProfileAdmin.mockStatusActive')
  );
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <UserDetailsSection sectionHeight="490px">
      <Grid container columns={2} width="100%">
        <Grid item xs={1}>
          <ProfileInputWrapper label={t('userProfileAdmin.name')}>
            <StyledAdminPanelInput
              defaultValue={t('userProfileAdmin.mockName')}
              size="small"
              fullWidth
            />
          </ProfileInputWrapper>
          <ProfileInputWrapper label={t('userProfileAdmin.phoneNumber')}>
            <PhoneInput />
          </ProfileInputWrapper>
          <ProfileInputWrapper label={t('userProfileAdmin.status')}>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={status}
              onChange={handleChange}
              fullWidth
              IconComponent={(props) => <ChevronDown {...props} />}
              size="small"
              sx={{
                border: `1px solid ${theme.palette.border.secondary}`,
                '.MuiSelect-icon': {
                  width: '20px',
                  height: '20px',
                  top: 10,
                },
              }}
            >
              <StyledMenuItem value={t('userProfileAdmin.mockStatusActive')}>
                {t('userProfileAdmin.mockStatusActive')}
              </StyledMenuItem>
              <StyledMenuItem value={t('userProfileAdmin.mockStatusInactive')}>
                {t('userProfileAdmin.mockStatusInactive')}
              </StyledMenuItem>
            </Select>
          </ProfileInputWrapper>
        </Grid>
        <Grid item xs={1}>
          <ProfileInputWrapper label={t('userProfileAdmin.email')}>
            <StyledAdminPanelInput
              defaultValue={t('userProfileAdmin.mockEmail')}
              size="small"
              disabled
              fullWidth
            />
          </ProfileInputWrapper>
          <ProfileInputWrapper label={t('userProfileAdmin.completeAddress')}>
            <StyledAdminPanelInput
              defaultValue={t('userProfileAdmin.mockCompleteAddress')}
              size="small"
              fullWidth
            />
          </ProfileInputWrapper>
        </Grid>
        <BottomWrapper>
          <Box display="flex">
            <Tick />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: '500',
                color: theme.palette.text.disabled,
                marginLeft: '5px',
              }}
            >
              {t('userProfileAdmin.lastSaved')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: '500',
                marginLeft: '10px',
              }}
            >
              {t('userProfileAdmin.mockSaveDate')}
            </Typography>
          </Box>
          <Box>
            <Button
              sx={{
                padding: '12px',
                backgroundColor: 'none',
                borderRadius: '10px',
                marginRight: '10px',
              }}
            >
              <Typography
                variant="button"
                sx={{
                  color: theme.palette.common.black,
                }}
              >
                {t('userProfileAdmin.cancelButton')}
              </Typography>
            </Button>
            <Button
              sx={{
                padding: '12px',
                backgroundColor: theme.palette.common.black,
                borderRadius: '10px',
              }}
            >
              <Typography
                variant="button"
                sx={{
                  color: theme.palette.common.white,
                }}
              >
                {t('userProfileAdmin.saveButton')}
              </Typography>
            </Button>
          </Box>
        </BottomWrapper>
      </Grid>
    </UserDetailsSection>
  );
}

export default AdminUserProfileEditPage;
