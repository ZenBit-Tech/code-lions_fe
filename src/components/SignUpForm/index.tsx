import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PasswordInput from 'src/components/shared/PasswordInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import StyledInput from 'src/components/shared/StyledInput';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { Typography } from '@mui/material';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function SignUpForm() {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <StyledInput
            autoComplete="off"
            placeholder={t('signup.namePlaceholder')}
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <StyledInput
            autoComplete="off"
            placeholder={t('signup.emailPlaceholder')}
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PasswordInput
            autoComplete="off"
            placeholder={t('signup.passwordPlaceholder')}
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            {...field}
          />
        )}
      />
      <Controller
        name="repeatPassword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PasswordInput
            autoComplete="off"
            placeholder={t('signup.passwordPlaceholder')}
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            {...field}
          />
        )}
      />
      <StyledButton
        width="100%"
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
      >
        <Typography variant="button"> {t('signup.singUpButton')} </Typography>
      </StyledButton>
    </form>
  );
}

export default SignUpForm;
