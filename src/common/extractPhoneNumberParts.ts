const sliceNumberUkraine: number = 3;
const sliceNumberCanada: number = 2;

export default function extractPhoneNumberParts(phoneNumber: string | null): {
  countryCode: string;
  restPhoneNumber: string;
} {
  let countryCode = '';
  let restPhoneNumber = '';

  if (phoneNumber) {
    if (phoneNumber.startsWith('+38') || phoneNumber.startsWith('+62')) {
      countryCode = phoneNumber.slice(0, sliceNumberUkraine);
      restPhoneNumber = phoneNumber.slice(sliceNumberUkraine);
    } else if (phoneNumber.startsWith('+1')) {
      countryCode = phoneNumber.slice(0, sliceNumberCanada);
      restPhoneNumber = phoneNumber.slice(sliceNumberCanada);
    }
  }

  return { countryCode, restPhoneNumber };
}
