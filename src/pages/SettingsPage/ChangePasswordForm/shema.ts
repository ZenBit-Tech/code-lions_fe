import { appErrors, validations } from 'src/common/constants';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(validations.PASSWORD_MIN_LENGTH, appErrors.PASSWORD_LENGTH)
    .required(appErrors.MISSING_CREDENTIALS),
});

export default passwordSchema;
