import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  isAccountActive: true,
};

const updateState = (state: IUser, action: PayloadAction<IUser>): IUser => {
  return { ...state, ...action.payload, isLoggedIn: true };
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
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.addUserGoogle.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.userSignUp.matchFulfilled,
      updateState
    );
    builder.addMatcher(userApi.endpoints.loginUser.matchFulfilled, updateState);
    builder.addMatcher(
      userApi.endpoints.updateRole.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.uploadPhoto.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.updatePhone.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.updateAddress.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.updateCreditCard.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.resetPassword.matchFulfilled,
      updateState
    );
  },
});

export const {
  setEmail,
  increaseOnboardingStep,
  decreaseOnboardingStep,
  setTokens,
  logout,
} = userSlice.actions;

export const selectUserName = (state: { user: IUser }) => state.user.name;
export const selectOnboardingStep = (state: { user: IUser }) =>
  state.user.onboardingStep;
export const selectUserRole = (state: { user: IUser }) => state.user.role;

export default userSlice.reducer;
