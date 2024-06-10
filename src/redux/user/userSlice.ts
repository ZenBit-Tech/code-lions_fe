import { createSlice } from '@reduxjs/toolkit';
import { userApi } from 'src/redux/user/userService';
import { appErrors } from 'src/common/constants';
import { IUser } from './types';

const initialState: IUser = {
  id: '',
  name: '',
  email: '',
  role: null,
  isEmailVerified: false,
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  error: '',
};

// const initialState: IUserState = {
//   user: initialUser,
// };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name, email, isEmailVerified } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.isEmailVerified = isEmailVerified;
      state.isLoggedIn = true;
    },
    setVerifiedUser(state, action) {
      const { id, name, email, isEmailVerified, accessToken, refreshToken } =
        action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.isEmailVerified = isEmailVerified;
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchFulfilled,
      (state, action) => {
        state.isEmailVerified = action.payload.isEmailVerified;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = '';
      }
    );
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchRejected,
      (state, action) => {
        state.error = action.error.message || appErrors.FAILED_TO_VERIFY;
      }
    );
    builder.addMatcher(
      userApi.endpoints.resendOtp.matchRejected,
      (state, action) => {
        state.error = action.error.message || appErrors.FAILED_TO_RESEND_OTP;
      }
    );
  },
});

export const { setUser, setVerifiedUser } = userSlice.actions;

export default userSlice.reducer;
