import { appErrors, validations } from 'src/common/constants';
import * as Yup from 'yup';

const maxPhoneLength = 11;

const personalInformationSchema = Yup.object().shape({
  name: Yup.string().required(appErrors.REQUIRED),
  email: Yup.string()
    .email(appErrors.EMAIL_INCORRECT)
    .matches(validations.EMAIL_REGEX, appErrors.EMAIL_INCORRECT)
    .required(appErrors.REQUIRED),
  phone: Yup.string()
    .max(maxPhoneLength, appErrors.INVALID_LENGTH)
    .matches(validations.PHONE_REGEX, appErrors.INVALID_PHONE)
    .required(appErrors.REQUIRED),
});

export default personalInformationSchema;
