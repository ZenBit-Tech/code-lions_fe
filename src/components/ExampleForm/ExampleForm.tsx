import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@mui/material';

interface IFormInput {
  firstName: string;
}

export default function ExampleForm() {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <button type="submit"> {t('exampleText.submitButton')} </button>
    </form>
  );
}
