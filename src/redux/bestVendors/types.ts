import { IProduct } from '../product/types';

export interface IBestVendor {
  vendorId: string;
  vendorName: string;
  photoUrl: string;
  products: IProduct[];
}

export interface IFollower {
  id: string;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  otp: string;
  otpExpiration: string;
  role: string;
  googleId: string;
  isAccountActive: boolean;
  photoUrl: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  clothesSize: string;
  jeansSize: string;
  shoesSize: string;
  cardNumber: string;
  expireDate: string;
  cvvCode: string;
  willHideRentalRules: boolean;
  createdAt: string;
  lastUpdatedAt: string;
  deactivationTimestamp: string;
  reactivationTimestamp: string;
  deletedAt: string;
  onboardingStep: number;
  rating: string;
  orders: number;
  following: [
    {
      id: string;
      name: string;
      email: string;
      password: string;
      isEmailVerified: boolean;
      otp: string;
      otpExpiration: string;
      role: string;
      googleId: string;
      isAccountActive: boolean;
      photoUrl: string;
      phoneNumber: string;
      addressLine1: string;
      addressLine2: string;
      country: string;
      state: string;
      city: string;
      clothesSize: string;
      jeansSize: string;
      shoesSize: string;
      cardNumber: string;
      expireDate: string;
      cvvCode: string;
      willHideRentalRules: boolean;
      createdAt: string;
      lastUpdatedAt: string;
      deactivationTimestamp: string;
      reactivationTimestamp: string;
      deletedAt: string;
      onboardingStep: number;
      rating: string;
      orders: number;
    },
  ];
}
