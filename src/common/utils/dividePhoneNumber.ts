const sliceNumberLong: number = 3;
const sliceNumberShort: number = 2;
const codeCanada: string = '+1';
const codeUkraine: string = '+38';
const codeCountry: string = '+62';

export default function dividePhoneNumber(phoneNumber: string | undefined): {
  countryCode: string;
  restPhoneNumber: string;
} {
  let countryCode = '';
  let restPhoneNumber = '';

  if (phoneNumber) {
    if (
      phoneNumber.startsWith(codeUkraine) ||
      phoneNumber.startsWith(codeCountry)
    ) {
      countryCode = phoneNumber.slice(0, sliceNumberLong);
      restPhoneNumber = phoneNumber.slice(sliceNumberLong);
    } else if (phoneNumber.startsWith(codeCanada)) {
      countryCode = phoneNumber.slice(0, sliceNumberShort);
      restPhoneNumber = phoneNumber.slice(sliceNumberShort);
    }
  }

  return { countryCode, restPhoneNumber };
}
