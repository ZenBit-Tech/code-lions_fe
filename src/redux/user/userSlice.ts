import { createSlice } from '@reduxjs/toolkit';
import { userApi } from 'src/redux/user/service';
import { appErrors } from 'src/common/constants';
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
  reducers: {
    setUser(state, action) {
      const { id, name, email, isEmailVerified } = action.payload;

      state.user.id = id;
      state.user.name = name;
      state.user.email = email;
      state.user.isEmailVerified = isEmailVerified;
      state.user.isLoggedIn = true;
    },
  },
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

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
