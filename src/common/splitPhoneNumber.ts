import { CountryCode } from 'src/common/constants';

const splitPhoneNumber = (
  phoneNumber: string,
  countryCodes: CountryCode[]
): { countryCode: string; number: string } => {
  const matchingCountryCode = countryCodes.find(({ code }) =>
    phoneNumber.startsWith(code)
  );

  if (matchingCountryCode) {
    const { code: countryCode } = matchingCountryCode;
    const number = phoneNumber.slice(countryCode.length);

    return { countryCode, number };
  }

  return { countryCode: '', number: phoneNumber };
};

export default splitPhoneNumber;
