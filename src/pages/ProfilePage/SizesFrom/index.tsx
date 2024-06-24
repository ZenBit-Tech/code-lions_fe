import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/getErrorMessage';
import {
  clothesSizes,
  jeansSizes,
  shoesSizes,
} from 'src/common/selectSizeOptions';
import LabelText from 'src/components/shared/LabelText';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { CustomSelect } from 'src/components/shared/StyledSelect';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useUpdateSizesMutation } from 'src/redux/user/userService';
import { selectUser } from 'src/redux/user/userSlice';

import { TitleStyled } from '../PersonalInformationForm/styles';

import FormStyled from './styles';

interface ISizeForm {
  clothesSize: string;
  jeansSize: string;
  shoesSize: string;
}

function SizesForm() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const [updateSizes, { isLoading }] = useUpdateSizesMutation();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors, isDirty },
  } = useForm<ISizeForm>({
    defaultValues: {
      clothesSize: user.clothesSize,
      jeansSize: user.jeansSize,
      shoesSize: user.shoesSize,
    },
    mode: 'onTouched',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit = async ({ clothesSize, jeansSize, shoesSize }: ISizeForm) => {
    try {
      await updateSizes({
        id: user.id,

        clothesSize,
        jeansSize,
        shoesSize,
      }).unwrap();
      reset({
        clothesSize,
        jeansSize,
        shoesSize,
      });
    } catch (err) {
      if (isFetchBaseQueryError(err) || isSerializedError(err)) {
        showToast(
          'error',
          getErrorMessage(err, t('profileDetails.unknownError'))
        );
      } else {
        showToast('error', t('profileDetails.unknownError'));
      }
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleStyled variant="subtitle1">{t('profileDetails.sizes')}</TitleStyled>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.clothesSize')} </LabelText>
        <Controller
          name="clothesSize"
          control={control}
          render={({ field }) => (
            <CustomSelect {...field} options={clothesSizes} />
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.shoesSize')} </LabelText>
        <Controller
          name="shoesSize"
          control={control}
          render={({ field }) => (
            <CustomSelect {...field} options={shoesSizes} />
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.jeansSize')} </LabelText>
        <Controller
          name="jeansSize"
          control={control}
          render={({ field }) => (
            <CustomSelect {...field} options={jeansSizes} />
          )}
        />
      </TitleInputWrapper>
      {isDirty && (
        <StyledButton
          type="submit"
          disabled={!isValid || errorsLength > 0 || isLoading}
          width="101px"
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
        >
          <Typography variant="h4">{t('profileDetails.saveButton')}</Typography>
        </StyledButton>
      )}
    </FormStyled>
  );
}

export default SizesForm;
