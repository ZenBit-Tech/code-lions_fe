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
  onboardingStep: 1,
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
    increaseOnboardingStep(state) {
      state.onboardingStep += 1;
    },
    decreaseOnboardingStep(state) {
      state.onboardingStep -= 1;
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
        return {
          ...state,
          ...action.payload,
          isLoggedIn: true,
          onboardingStep: 1,
        };
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

export const { setEmail, increaseOnboardingStep, decreaseOnboardingStep } =
  userSlice.actions;

export const selectUserName = (state: { user: IUser }) => state.user.name;
export const selectOnboardingStep = (state: { user: IUser }) =>
  state.user.onboardingStep;

export default userSlice.reducer;
