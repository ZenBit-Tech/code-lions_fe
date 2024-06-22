export type NonAdminRole = 'buyer' | 'vendor';
export type UserRole = NonAdminRole | 'admin' | null;

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  isLoggedIn: boolean;
  onboardingStep: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface IVerifyEmailRequest {
  id: string;
  otp: string;
}

export interface IResendOtpRequest {
  id: string;
}

export interface IErrorResponse {
  message: string | string[];
}

export interface CustomFetchBaseQueryError extends FetchBaseQueryError {
  data: IErrorResponse;
}

export type ErrorType = CustomFetchBaseQueryError | SerializedError | undefined;

export interface FetchBaseQueryError {
  status: number;
  data: IErrorResponse;
}

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
}

export interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
}

export interface IRegisterGoogleRequest {
  token: string | undefined;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  email: string;
  otp: string;
}

export interface INewPasswordRequest {
  password: string;
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRole;
  isAccountActive: boolean;
  photoUrl: string;
  phoneNumber: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  country: string;
  state: string | null;
  city: string | null;
  clothesSize: string | null;
  jeansSize: string | null;
  shoesSize: string | null;
  createdAt: string;
  lastUpdatedAt: string | null;
  deletedAt: string | null;
}

export interface IUserDataResponse {
  users: IAdminUser[];
  pagesCount: number;
}

export type SortOrder = 'asc' | 'desc';

export interface IAdminUsersRequest {
  page?: number;
  order?: SortOrder;
  role?: UserRole;
  search?: string;
}

export interface IUpdateRoleRequest {
  id: string;
  role: UserRole;
}
