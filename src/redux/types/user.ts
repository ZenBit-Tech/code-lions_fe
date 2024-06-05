export interface ILoginDto {
  email: string;
  password: string;
}

export interface IPublicUserDto {
  email: string;
  password: string;
}

export interface IAuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  user: IPublicUserDto;
  tokens: IAuthTokenResponse;
}
