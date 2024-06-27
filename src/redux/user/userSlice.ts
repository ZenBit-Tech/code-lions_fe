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
  photoUrl: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  country: '',
  state: '',
  city: '',
  clothesSize: '',
  jeansSize: '',
  shoesSize: '',
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
      userApi.endpoints.updateSizes.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.resetPassword.matchFulfilled,
      updateState
    );
    builder.addMatcher(
      userApi.endpoints.updatePersonalInfo.matchFulfilled,
      (state, action) => {
        state.isLoggedIn = true;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.photoUrl = action.payload.photoUrl;
        state.phoneNumber = action.payload.phoneNumber;
        state.addressLine1 = action.payload.addressLine1;
        state.addressLine2 = action.payload.addressLine2;
        state.country = action.payload.country;
        state.state = action.payload.state;
        state.city = action.payload.city;
        state.clothesSize = action.payload.clothesSize;
        state.jeansSize = action.payload.jeansSize;
        state.shoesSize = action.payload.shoesSize;
      }
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
export const selectUser = (state: { user: IUser }) => state.user;
export const selectUserId = (state: { user: IUser }) => state.user.id;
export const selectUserAvatar = (state: { user: IUser }) => state.user.photoUrl;
export const selectUserPhone = (state: { user: IUser }) =>
  state.user.phoneNumber;

export default userSlice.reducer;
