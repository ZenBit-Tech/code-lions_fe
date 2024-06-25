import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SelectChangeEvent } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import { countryCodes } from 'src/common/constants';
import extractPhoneNumberParts from 'src/common/extractPhoneNumberParts';
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/hooks/useErrorHandling';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useGetUserByIdQuery,
  useUpdateUserProfileByAdminMutation,
} from 'src/redux/user/userService';

import { IUserProfileFormData } from '../types';

type SetStateBoolean = Dispatch<SetStateAction<boolean>>;

export default function useUserProfileEdit(userId: string | undefined) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { data, refetch } = useGetUserByIdQuery(
    userId ? { userId } : skipToken
  );
  const [updateUserProfile, { error, isLoading }] =
    useUpdateUserProfileByAdminMutation();

  const [status, setStatus] = useState<string>('');
  const [emailField, setEmailField] = useState<string>('');
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [openCountry, setOpenCountry] = useState<boolean>(false);
  const [openState, setOpenState] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  const { handleSubmit, control, setValue } = useForm<IUserProfileFormData>();

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

      const { countryCode, restPhoneNumber } =
        extractPhoneNumberParts(phoneNumber);

      const countryCodeOption = countryCodes.filter(
        (countryOption) => countryOption.code === countryCode
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

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryError(error) || isSerializedError(error)) {
        showToast(
          'error',
          getErrorMessage(error, t('usersAdmin.updateUserError'))
        );
      } else {
        showToast('error', t('usersAdmin.updateUserError'));
      }
    }
  }, [error, showToast, t]);

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus(event.target.value);
  };

  const handleClose = (setOpen: SetStateBoolean) => {
    setOpen(false);
  };

  const handleOpen = (setOpen: SetStateBoolean) => {
    setOpen(true);
  };

  const onSubmit = async (formData: IUserProfileFormData) => {
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

        const changedFields = Object.fromEntries(
          /* eslint-disable @typescript-eslint/no-unused-vars */
          Object.entries(combinedFormData).filter(([_, value]) => value !== '')
          /* eslint-enable @typescript-eslint/no-unused-vars */
        );

        const response = await updateUserProfile({
          userId,
          updateProfileByAdminDto: changedFields,
        });

        showToast('success', t('usersAdmin.updateUserSuccess'));

        refetch();

        return response.data;
      }

      return null;
    } catch (err) {
      return err;
    }
  };

  return {
    data,
    isLoading,
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
  };
}
