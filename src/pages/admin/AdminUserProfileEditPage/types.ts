import { Control } from 'react-hook-form';

export interface IUserProfileFormData {
  name: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    phoneNumber: string;
  };
  isAccountActive: boolean;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
}

export interface IPhoneInputProps {
  control: Control<IUserProfileFormData>;
  name: 'phoneNumber';
}
