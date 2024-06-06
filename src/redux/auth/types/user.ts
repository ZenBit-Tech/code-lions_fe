export interface ILoginDto {
  email: string;
  password: string;
}

export interface IPublicUserDto {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
}

export interface IAuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  user: IPublicUserDto;
  tokens: IAuthTokenResponse;
}

export interface IResetPasswordDto {
  password: string;
  repeatPassword: string;
}

export interface IUserWithTokensDto {
  user: IPublicUserDto;
  tokens: IAuthTokenResponse;
}