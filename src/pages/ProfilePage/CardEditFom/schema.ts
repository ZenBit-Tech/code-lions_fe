import { appErrors } from 'src/common/constants';
import { removeSpacesFromCardNumber } from 'src/common/formatCardNumber';
import * as Yup from 'yup';

const hundred = 100;

const creditCardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .transform((value) => removeSpacesFromCardNumber(value))
    .matches(/^\d{16}$/, appErrors.INVALID_CARD_NUMBER)
    .required(appErrors.REQUIRED),

  expireDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, appErrors.INVALID_EXPIRE_DATE)
    .test('expireDate', appErrors.INVALID_EXPIRE_DATE, (value) => {
      if (!value) return false;
      const [month, year] = value.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % hundred;
      const currentMonth = now.getMonth() + 1;

      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    })
    .required(appErrors.REQUIRED),

  cvvCode: Yup.string()
    .matches(/^\d{3}$/, appErrors.INVALID_CVV)
    .required(appErrors.REQUIRED),
});

export default creditCardSchema;
