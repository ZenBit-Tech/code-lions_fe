import { createSlice } from '@reduxjs/toolkit';
import { userApi } from 'src/redux/user/userService';

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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchFulfilled,
      (state, action) => {
        return { ...state, ...action.payload, isLoggedIn: true };
      }
    );
    builder.addMatcher(
      userApi.endpoints.addUserGoogle.matchFulfilled,
      (state, action) => {
        return { ...state, ...action.payload, isLoggedIn: true };
      }
    );
    builder.addMatcher(
      userApi.endpoints.userSignUp.matchFulfilled,
      (state, action) => {
        return { ...state, ...action.payload, isLoggedIn: true };
      }
    );
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        return { ...state, ...action.payload, isLoggedIn: true };
      }
    );
    builder.addMatcher(
      userApi.endpoints.resetPassword.matchFulfilled,
      (state, action) => {
        return { ...state, ...action.payload, isLoggedIn: true };
      }
    );
  },
});

export const { setEmail } = userSlice.actions;

export const selectUserName = (state: { user: IUser }) => state.user.name;

export default userSlice.reducer;
