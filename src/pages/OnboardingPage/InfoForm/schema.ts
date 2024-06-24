import { appErrors, validations } from 'src/common/constants';
import * as Yup from 'yup';

const maxPhoneLength = 11;

const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(validations.PHONE_REGEX, appErrors.INVALID_PHONE)
    .required(appErrors.REQUIRED)
    .max(maxPhoneLength, appErrors.INVALID_LENGTH),
});

export default phoneSchema;
