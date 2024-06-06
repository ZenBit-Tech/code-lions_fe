import { createSlice } from '@reduxjs/toolkit';
import { appErrors } from 'src/common/constants';
import { userApi } from './userService';
import { IUser, IUserState } from './types';

const initialUser: IUser = {
  id: '',
  name: '',
  email: '',
  isEmailVerified: false,
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  error: '',
};

const initialState: IUserState = {
  user: initialUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchFulfilled,
      (state, action) => {
        state.user.isEmailVerified = action.payload.isEmailVerified;
        state.user.accessToken = action.payload.accessToken;
        state.user.refreshToken = action.payload.refreshToken;
        state.user.isLoggedIn = true;
        state.user.error = '';
      }
    );
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchRejected,
      (state, action) => {
        state.user.error = action.error.message || appErrors.FAILED_TO_VERIFY;
      }
    );
    builder.addMatcher(
      userApi.endpoints.resendOtp.matchRejected,
      (state, action) => {
        state.user.error =
          action.error.message || appErrors.FAILED_TO_RESEND_OTP;
      }
    );
  },
});

export default userSlice.reducer;
