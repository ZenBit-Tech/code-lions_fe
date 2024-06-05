export interface IUser {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  error: string;
}

export interface IUserState {
  user: IUser;
}

export interface IVerifyEmailRequest {
  id: string;
  otp: string;
}

export interface IVerifyEmailResponse {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IResendOtpRequest {
  id: string;
}

export interface IErrorResponse {
  message: string | string[];
}

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
  isEmailVerified: boolean;
}

export interface IRegisterErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}
