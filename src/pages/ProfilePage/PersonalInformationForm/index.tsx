import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LabelText from 'src/components/shared/LabelText';
import StyledInput from 'src/components/shared/StyledInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';

import { ErrorWrapper, FormStyled, TitleStyled } from './styles';

// interface IPersonalInformationForm {
//   name: string;
//   email: string;
//   phone: string;
// }

function PersonalInformationForm() {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormStyled>
      <TitleStyled variant="subtitle1">
        {t('profileDetails.personalInformation')}
      </TitleStyled>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.name')} </LabelText>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('profileDetails.namePlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.name}
              />
              {/* {errors.name && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.name.message}
                </ErrorMessage>
              )} */}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.email')} </LabelText>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                name="email"
                autoComplete="off"
                placeholder={t('profileDetails.emailPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
              />
              {/* {errors.email && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.email.message}
                </ErrorMessage>
              )} */}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.phone')} </LabelText>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                name="phone"
                autoComplete="off"
                placeholder={t('profileDetails.phonePlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
              />
              {/* {errors.email && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.email.message}
                </ErrorMessage>
              )} */}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
    </FormStyled>
  );
}

export default PersonalInformationForm;
