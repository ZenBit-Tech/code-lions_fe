import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import NotificationIcon from 'src/assets/icons/bell.svg';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
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
import { AvatarStyled, SwitchStyled } from './styles';

function SettingsPage() {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
          type="button"
          width="195px"
          styles={StyleVariants.TRANSPARENT}
          padding={PaddingVariants.MD}
        >
          <Typography variant="h4">{t('settings.deleteAccount')}</Typography>
        </StyledButton>
      </Grid>
    </Grid>
  );
}

export default SettingsPage;
