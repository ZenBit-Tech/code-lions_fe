import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Grid, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';

import ChevronDown from 'src/assets/icons/chevron-down.svg';
import Tick from 'src/assets/icons/tick.svg';
import { countries, states, cities } from 'src/common/constants';
import formatUpdateDate from 'src/common/formatUpdateDate';
import theme from 'src/theme';

import UserDetailsSection from '../AdminUserProfilePage/UserDetailsSection';

import useUserProfileEdit from './hooks/useUserProfileEdit';
import PhoneInput from './PhoneInput';
import ProfileInputWrapper from './ProfileInputWrapper';
import { BottomWrapper, StyledAdminPanelInput, StyledMenuItem } from './styles';

const previousPage: number = -1;

function AdminUserProfileEditPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { userId } = useParams<{ userId: string }>();

  const {
    data,
    status,
    emailField,
    openStatus,
    setOpenStatus,
    openCountry,
    setOpenCountry,
    openState,
    setOpenState,
    openCity,
    setOpenCity,
    handleChange,
    handleClose,
    handleOpen,
    handleSubmit,
    control,
    lastUpdateDate,
    onSubmit,
  } = useUserProfileEdit(userId);

  return (
    <UserDetailsSection sectionHeight="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columns={2} width="100%">
          <Grid item xs={1}>
            <ProfileInputWrapper label={t('userProfileAdmin.name')}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledAdminPanelInput
                    onChange={onChange}
                    value={value ?? ''}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </ProfileInputWrapper>
            <ProfileInputWrapper label={t('userProfileAdmin.email')}>
              <StyledAdminPanelInput
                value={emailField}
                size="small"
                fullWidth
                disabled
              />
            </ProfileInputWrapper>
            <ProfileInputWrapper label={t('userProfileAdmin.phoneNumber')}>
              <PhoneInput control={control} name="phoneNumber" />
            </ProfileInputWrapper>
            <ProfileInputWrapper label={t('userProfileAdmin.status')}>
              <Select
                onChange={handleChange}
                value={status ?? ''}
                open={openStatus}
                onClose={() => handleClose(setOpenStatus)}
                onOpen={() => handleOpen(setOpenStatus)}
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
                <StyledMenuItem
                  value={t('userProfileAdmin.mockStatusInactive')}
                >
                  {t('userProfileAdmin.mockStatusInactive')}
                </StyledMenuItem>
              </Select>
            </ProfileInputWrapper>
          </Grid>
          <Grid item xs={1}>
            <ProfileInputWrapper label="Address Line 1">
              <Controller
                name="addressLine1"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledAdminPanelInput
                    onChange={onChange}
                    value={value ?? ''}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </ProfileInputWrapper>
            <ProfileInputWrapper label="Address Line 2 (optional)">
              <Controller
                name="addressLine2"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledAdminPanelInput
                    onChange={onChange}
                    value={value ?? ''}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </ProfileInputWrapper>
            <ProfileInputWrapper label="Country">
              <Controller
                name="country"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    value={value ?? ''}
                    open={openCountry}
                    onClose={() => handleClose(setOpenCountry)}
                    onOpen={() => handleOpen(setOpenCountry)}
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
                    {countries.map((option) => (
                      <StyledMenuItem key={option.value} value={option.value}>
                        {option.value}
                      </StyledMenuItem>
                    ))}
                  </Select>
                )}
              />
            </ProfileInputWrapper>
            <ProfileInputWrapper label="State">
              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    value={value ?? ''}
                    open={openState}
                    onClose={() => handleClose(setOpenState)}
                    onOpen={() => handleOpen(setOpenState)}
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
                    {states.map((option) => (
                      <StyledMenuItem key={option.value} value={option.value}>
                        {option.value}
                      </StyledMenuItem>
                    ))}
                  </Select>
                )}
              />
            </ProfileInputWrapper>
            <ProfileInputWrapper label="City">
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    value={value ?? ''}
                    open={openCity}
                    onClose={() => handleClose(setOpenCity)}
                    onOpen={() => handleOpen(setOpenCity)}
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
                    {cities.map((option) => (
                      <StyledMenuItem key={option.value} value={option.value}>
                        {option.value}
                      </StyledMenuItem>
                    ))}
                  </Select>
                )}
              />
            </ProfileInputWrapper>
          </Grid>
          <BottomWrapper>
            <Box display="flex">
              {lastUpdateDate && (
                <>
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
                    {formatUpdateDate(data?.lastUpdatedAt)}
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              <Button
                type="button"
                sx={{
                  padding: '12px',
                  backgroundColor: 'none',
                  borderRadius: '10px',
                  marginRight: '10px',
                }}
                onClick={() => navigate(previousPage)}
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
                type="submit"
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
      </form>
    </UserDetailsSection>
  );
}

export default AdminUserProfileEditPage;
