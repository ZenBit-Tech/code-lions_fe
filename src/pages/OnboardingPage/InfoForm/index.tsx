import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import PhotoIcon from 'src/assets/icons/photo.svg';
import UserImageIcon from 'src/assets/icons/user-image.svg';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import StyledInput from 'src/components/shared/StyledInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import {
  ErrorWrapper,
  ErrorMessage,
} from 'src/pages/SignUpPage/SignUpForm/styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  useUploadPhotoMutation,
  useUpdatePhoneMutation,
} from 'src/redux/user/userService';
import { decreaseOnboardingStep } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import phoneSchema from './schema';
import VisuallyHiddenInput from './styles';

interface IPhoneForm {
  phone: string;
}

function OnboardingInfoForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation();
  const [updatePhone, { isLoading: isLoadingPhone }] = useUpdatePhoneMutation();
  const [preview, setPreview] = useState<string | null>(
    user.photoUrl ? import.meta.env.VITE_API_URL + user.photoUrl : null
  );
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IPhoneForm>({
    defaultValues: {
      phone: user.phoneNumber || '',
    },
    resolver: yupResolver(phoneSchema),
    mode: 'onTouched',
  });
  const errorsLength: number = Object.keys(errors).length;

  const sendPhotoRequest = async (file: File | null) => {
    try {
      if (file instanceof File) {
        const formDataPhoto = new FormData();

        formDataPhoto.append('file', file);
        await uploadPhoto({ id: user.id, photo: formDataPhoto }).unwrap();
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast('error', err.message);
      } else {
        showToast('error', t('onboarding.unknownError'));
      }
    }
  };

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const objectUrl = URL.createObjectURL(file);

      setPreview(objectUrl);
    }
    await sendPhotoRequest(file);
  };

  const onSubmit = async (form: IPhoneForm) => {
    try {
      await updatePhone({ id: user.id, phone: `+62${form.phone}` }).unwrap();
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
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
            width: '281px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.profilePhoto')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.choosePhoto')}
          </OnboardingText>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '46px' }}>
          <Box
            sx={{
              boxSizing: 'content-box',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: `.75px solid ${theme.palette.secondary.main}`,
              overflow: 'hidden',
            }}
          >
            {preview ? (
              <img
                src={preview}
                width="120px"
                height="120px"
                alt={t('onboarding.yourPhoto')}
              />
            ) : (
              <UserImageIcon />
            )}
          </Box>
          <StyledButton
            component="label"
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.SM2}
            variant="contained"
            fontSize="14px"
            disabled={isLoading}
          >
            <VisuallyHiddenInput
              type="file"
              accept="image/jpeg, image/png, image/heic"
              id="upload-photo"
              onChange={handleFileChange}
            />
            <Box sx={{ mr: '8px' }}>
              <PhotoIcon />
            </Box>
            {preview
              ? t('onboarding.changeImage')
              : t('onboarding.uploadPhoto')}
          </StyledButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '281px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.phoneNumber')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.enterNumber')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <ErrorWrapper>
                <StyledInput
                  {...field}
                  fullWidth
                  autoComplete="off"
                  placeholder=""
                  padding={InputPaddingVariants.MD}
                  stylevariant={InputStyleVariants.OUTLINED}
                  width="100%"
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <ErrorMessage
                    variant="subtitle2"
                    mt={1}
                    color={theme.palette.error.main}
                  >
                    {errors.phone.message}
                  </ErrorMessage>
                )}
              </ErrorWrapper>
            )}
          />
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
          styles={StyleVariants.TRANSPARENT2}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
          onClick={returnBack}
        >
          {t('onboarding.prev')}
        </StyledButton>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
          radius="8px"
          type="submit"
          disabled={!isValid || errorsLength > 0 || isLoadingPhone}
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingInfoForm;
