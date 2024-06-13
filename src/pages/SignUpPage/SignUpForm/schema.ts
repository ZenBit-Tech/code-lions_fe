import { appErrors, validations } from 'src/common/constants';
import * as Yup from 'yup';

const userSignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(appErrors.EMAIL_INCORRECT)
    .matches(validations.EMAIL_REGEX, appErrors.EMAIL_INCORRECT)
    .required(appErrors.MISSING_CREDENTIALS),
  name: Yup.string().required(appErrors.MISSING_CREDENTIALS),
  password: Yup.string()
    .min(validations.PASSWORD_MIN_LENGTH, appErrors.PASSWORD_LENGTH)
    .required(appErrors.MISSING_CREDENTIALS),
  repeatPassword: Yup.string()
    .min(validations.PASSWORD_MIN_LENGTH, appErrors.PASSWORD_LENGTH)
    .oneOf([Yup.ref('password'), ''], appErrors.PASSWORD_MATCH)
    .required(appErrors.MISSING_CREDENTIALS),
});

export default userSignUpSchema;
