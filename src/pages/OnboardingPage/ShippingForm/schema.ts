import { appErrors } from 'src/common/constants';
import * as Yup from 'yup';

const maxAddressLength = 100;

const addressSchema = Yup.object().shape({
  addressLine1: Yup.string()
    .required(appErrors.REQUIRED)
    .max(maxAddressLength, appErrors.TOO_LONG),

  addressLine2: Yup.string()
    .max(maxAddressLength, appErrors.TOO_LONG)
    .nullable(),
});

export default addressSchema;
