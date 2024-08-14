import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import NotificationIcon from 'src/assets/icons/bell.svg';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useToggleNotificationsMutation } from 'src/redux/user/userService';
import {
  selectUserId,
  selectUserNotifications,
} from 'src/redux/user/userSlice';
import theme from 'src/theme';

import {
  DividerStyled,
  ListItemAvatarStyled,
  ListItemStyled,
  ListItemTextStyled,
  ListStyled,
} from '../ProfileLayout/ProfileMenu/styles';
import { TitleStyled } from '../ProfilePage/PersonalInformationForm/styles';

import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteAccountPopup from './DeleteAccountPopup';
import { AvatarStyled, SwitchStyled } from './styles';

function SettingsPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { handleOnSubmitError } = useErrorHandling();

  const userId = useAppSelector(selectUserId);
  const notificationsEnabled = useAppSelector(selectUserNotifications);

  const [checked, setChecked] = useState<boolean>(notificationsEnabled);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [toggleNotifications, { isLoading }] = useToggleNotificationsMutation();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    try {
      await toggleNotifications().unwrap();
      if (notificationsEnabled) {
        showToast('success', t('settings.notificationsOff'));
      } else {
        showToast('success', t('settings.notificationsOn'));
      }
    } catch (error) {
      handleOnSubmitError(error, showToast, t('settings.notificationsError'));
    }
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TitleStyled variant="subtitle1" theme={theme}>
          {t('settings.notifications')}
        </TitleStyled>
      </Grid>
      <Grid item xs={12}>
        <ListStyled>
          <ListItemStyled>
            <ListItemAvatarStyled>
              <AvatarStyled checked={checked}>
                <NotificationIcon />
              </AvatarStyled>
            </ListItemAvatarStyled>
            <ListItemTextStyled primary={t('settings.notifications')} />
            <SwitchStyled
              theme={theme}
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={isLoading}
            />
          </ListItemStyled>
          <DividerStyled aria-hidden="true" />
        </ListStyled>
      </Grid>
      <Grid item xs={12}>
        <TitleStyled variant="subtitle1" theme={theme}>
          {t('settings.manageAccount')}
        </TitleStyled>
      </Grid>
      <Grid item xs={12}>
        <ChangeEmailForm />
      </Grid>
      <Grid item xs={12}>
        <ChangePasswordForm />
      </Grid>
      <Grid item xs={12}>
        <StyledButton
          onClick={handleOpen}
          type="button"
          width="195px"
          styles={StyleVariants.TRANSPARENT}
          padding={PaddingVariants.MD}
        >
          <Typography variant="h4">{t('settings.deleteAccount')}</Typography>
        </StyledButton>
      </Grid>
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <DeleteAccountPopup onClose={handleClose} userId={userId} />
          </StyledBackdrop>,
          document.body
        )}
    </Grid>
  );
}

export default SettingsPage;
