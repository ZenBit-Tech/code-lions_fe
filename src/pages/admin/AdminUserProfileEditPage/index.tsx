import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  Button,
  Grid,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { skipToken } from '@reduxjs/toolkit/query';
import ChevronDown from 'src/assets/icons/chevron-down.svg';
import Tick from 'src/assets/icons/tick.svg';
import { countryCodes, countries, states, cities } from 'src/common/constants';
import formatUpdateDate from 'src/common/formatUpdateDate';
import {
  useGetUserByIdQuery,
  useUpdateUserProfileByAdminMutation,
} from 'src/redux/user/userService';
import theme from 'src/theme';

import UserDetailsSection from '../AdminUserProfilePage/UserDetailsSection';

import PhoneInput from './PhoneInput';
import ProfileInputWrapper from './ProfileInputWrapper';
import { BottomWrapper, StyledAdminPanelInput, StyledMenuItem } from './styles';

interface UserProfileFormData {
  name: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    phoneNumber: string;
  };
  isAccountActive: boolean;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
}

const sliceNumberUkraine: number = 3;
const sliceNumberCanada: number = 2;

function AdminUserProfileEditPage() {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();

  const { data, refetch } = useGetUserByIdQuery(
    userId ? { userId } : skipToken
  );

  const [status, setStatus] = useState<string>('');
  const [emailField, setEmailField] = useState<string>('');
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [openCountry, setOpenCountry] = useState<boolean>(false);
  const [openState, setOpenState] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  const { handleSubmit, control, setValue } = useForm<UserProfileFormData>();

  const lastUpdateDate: string | null | undefined = data?.lastUpdatedAt;

  useEffect(() => {
    if (data) {
      const {
        name,
        phoneNumber,
        email,
        isAccountActive,
        addressLine1,
        addressLine2,
        country,
        state,
        city,
      } = data;

      setValue('name', name || '');
      setEmailField(email);
      let countryCode = '';
      let restPhoneNumber = '';

      if (phoneNumber) {
        if (phoneNumber.startsWith('+38') || phoneNumber.startsWith('+62')) {
          countryCode = phoneNumber.slice(0, sliceNumberUkraine);
          restPhoneNumber = phoneNumber.slice(sliceNumberUkraine);
        } else if (phoneNumber.startsWith('+1')) {
          countryCode = phoneNumber.slice(0, sliceNumberCanada);
          restPhoneNumber = phoneNumber.slice(sliceNumberCanada);
        }
      }

      const countryCodeOption = countryCodes.filter(
        (code) => code.code === countryCode
      );

      setValue('phoneNumber.countryCode', countryCodeOption[0].code);
      setValue('phoneNumber.phoneNumber', restPhoneNumber);
      setValue('isAccountActive', isAccountActive);
      setStatus(
        isAccountActive
          ? t('userProfileAdmin.mockStatusActive')
          : t('userProfileAdmin.mockStatusInactive')
      );
      setValue('addressLine1', addressLine1 ?? '');
      setValue('addressLine2', addressLine2 ?? '');
      setValue('country', country ?? '');
      setValue('state', state ?? '');
      setValue('city', city ?? '');
    }
  }, [data, setValue, t]);

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus(event.target.value);
  };

  type SetStateBoolean = Dispatch<SetStateAction<boolean>>;

  const handleClose = (setOpen: SetStateBoolean) => {
    setOpen(false);
  };

  const handleOpen = (setOpen: SetStateBoolean) => {
    setOpen(true);
  };

  const [updateUserProfile] = useUpdateUserProfileByAdminMutation();

  const onSubmit = async (formData: UserProfileFormData) => {
    try {
      if (userId) {
        const isAccountActive =
          status === t('userProfileAdmin.mockStatusActive');

        const phoneNumber =
          formData.phoneNumber.countryCode + formData.phoneNumber.phoneNumber;

        /* eslint-disable no-unused-vars */
        const { email, ...formDataWithoutEmail } = formData;
        /* eslint-enable no-unused-vars */

        const combinedFormData = {
          ...formDataWithoutEmail,
          phoneNumber,
          isAccountActive,
        };

        const filteredFormData = Object.fromEntries(
          /* eslint-disable @typescript-eslint/no-unused-vars */
          Object.entries(combinedFormData).filter(([_, value]) => value !== '')
          /* eslint-enable @typescript-eslint/no-unused-vars */
        );

        const response = await updateUserProfile({
          userId,
          updateProfileByAdminDto: filteredFormData,
        });

        refetch();

        return response.data;
      }

      return null;
    } catch (error) {
      return error;
    }
  };

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
