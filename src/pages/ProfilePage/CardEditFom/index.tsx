import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import { addSpacesToCardNumber } from 'src/common/formatCardNumber';
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/getErrorMessage';
import LabelText from 'src/components/shared/LabelText';
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
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useUpdateCreditCardMutation } from 'src/redux/user/userService';
import { selectUserId } from 'src/redux/user/userSlice';

import { ErrorMessage, ErrorWrapper } from '../PersonalInformationForm/styles';

import creditCardSchema from './schema';

interface ICardEditForm {
  setShowEdit: (arg0: boolean) => void;
  cardData: { cardNumber: string; expireDate: string; cvvCode: string };
  refetchCardInfo: () => void;
}

interface ICreditCardForm {
  cardNumber: string;
  expireDate: string;
  cvvCode: string;
}

function CardEditForm({
  setShowEdit,
  cardData,
  refetchCardInfo,
}: ICardEditForm) {
  const { t } = useTranslation();
  const id = useAppSelector(selectUserId);
  const [updateCreditCard, { isLoading }] = useUpdateCreditCardMutation();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ICreditCardForm>({
    defaultValues: {
      cardNumber: cardData.cardNumber,
      expireDate: cardData.expireDate,
      cvvCode: cardData.cvvCode,
    },
    resolver: yupResolver(creditCardSchema),
    mode: 'onTouched',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit = async (data: ICreditCardForm) => {
    try {
      await updateCreditCard({
        id,
        ...data,
      }).unwrap();
      refetchCardInfo();
      setShowEdit(false);
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
    <Box
      sx={{ flex: 1 }}
      mt="20px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TitleInputWrapper>
        <LabelText>{t('onboarding.cardNumber')}</LabelText>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('onboarding.cardNumberValue')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                width="100%"
                error={!!errors.cardNumber}
                onChange={(e) => {
                  const formattedValue = addSpacesToCardNumber(e.target.value);

                  field.onChange(formattedValue);
                }}
                value={addSpacesToCardNumber(field.value)}
              />
              {errors.cardNumber && (
                <ErrorMessage variant="subtitle2" mt={1}>
                  {errors.cardNumber.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          mt: '20px',
          mb: '20px',
        }}
      >
        <Box sx={{ width: '57%' }}>
          <TitleInputWrapper>
            <LabelText>{t('onboarding.expiryDate')}</LabelText>
            <Controller
              name="expireDate"
              control={control}
              render={({ field }) => (
                <ErrorWrapper>
                  <StyledInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    placeholder={t('onboarding.mmYy')}
                    padding={InputPaddingVariants.MD}
                    stylevariant={InputStyleVariants.OUTLINED}
                    width="100%"
                    error={!!errors.expireDate}
                  />
                  {errors.expireDate && (
                    <ErrorMessage variant="subtitle2" mt={1}>
                      {errors.expireDate.message}
                    </ErrorMessage>
                  )}
                </ErrorWrapper>
              )}
            />
          </TitleInputWrapper>
        </Box>
        <Box sx={{ width: '43%' }}>
          <TitleInputWrapper>
            <LabelText>{t('onboarding.cvvCode')}</LabelText>
            <Controller
              name="cvvCode"
              control={control}
              render={({ field }) => (
                <ErrorWrapper>
                  <StyledInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    placeholder={t('onboarding.cvvCodeValue')}
                    padding={InputPaddingVariants.MD}
                    stylevariant={InputStyleVariants.OUTLINED}
                    width="100%"
                    error={!!errors.cvvCode}
                  />
                  {errors.cvvCode && (
                    <ErrorMessage variant="subtitle2" mt={1}>
                      {errors.cvvCode.message}
                    </ErrorMessage>
                  )}
                </ErrorWrapper>
              )}
            />
          </TitleInputWrapper>
        </Box>
      </Box>
      <StyledButton
        disabled={!isValid || errorsLength > 0 || isLoading}
        type="submit"
        width="101px"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.SM}
      >
        <Typography variant="h4">{t('profileDetails.saveButton')}</Typography>
      </StyledButton>
    </Box>
  );
}

export default CardEditForm;
