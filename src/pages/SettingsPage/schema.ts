import { appErrors, validations } from 'src/common/constants';
import * as Yup from 'yup';

const settingsSchema = Yup.object().shape({
  email: Yup.string()
    .email(appErrors.EMAIL_INCORRECT)
    .matches(validations.EMAIL_REGEX, appErrors.EMAIL_INCORRECT)
    .required(appErrors.MISSING_CREDENTIALS),
  password: Yup.string()
    .min(validations.PASSWORD_MIN_LENGTH, appErrors.PASSWORD_LENGTH)
    .required(appErrors.MISSING_CREDENTIALS),
});

export default settingsSchema;
