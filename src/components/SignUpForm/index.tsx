import { Input } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function SignUpForm() {
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
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="repeatPassword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />
      <input type="submit" />
    </form>
  );
}

export default SignUpForm;
