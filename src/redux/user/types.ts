export type UserRole = 'BUYER' | 'VENDOR' | 'ADMIN' | null;

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  isLoggedIn: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export interface IVerifyEmailRequest {
  id: string;
  otp: string;
}

// export interface IVerifyEmailResponse {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   isEmailVerified: boolean;
//   accessToken: string;
//   refreshToken: string;
// }

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

// export interface IRegisterGoogleResponse {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   isEmailVerified: boolean;
//   accessToken?: string;
//   refreshToken?: string;
// }

export interface ILoginRequest {
  email: string;
  password: string;
}

// export interface ILoginResponse {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   isEmailVerified: boolean;
//   accessToken: string;
//   refreshToken: string;
// }

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  email: string;
  otp: string;
}

// export interface IResetPasswordResponse {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   isEmailVerified: boolean;
//   accessToken: string;
//   refreshToken: string;
// }

export interface INewPasswordRequest {
  password: string;
}
