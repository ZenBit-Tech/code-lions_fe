import { appErrors, validations } from 'src/common/constants';
import * as Yup from 'yup';

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email(appErrors.EMAIL_INCORRECT)
    .matches(validations.EMAIL_REGEX, appErrors.EMAIL_INCORRECT)
    .required(appErrors.MISSING_CREDENTIALS),
});

export default emailSchema;
