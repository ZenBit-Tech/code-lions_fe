import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPublicUserDto, IAuthTokenResponse } from 'src/redux/auth/types/user';
import { RootState } from 'src/redux/store';

import { authApi } from './authApi';

interface AuthState {
  user: IPublicUserDto | null;
  tokens: IAuthTokenResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean; // Добавлено состояние для сброса пароля
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false, // Начальное значение
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        user: IPublicUserDto;
        tokens: IAuthTokenResponse;
      }>
    ) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setTokens(state, action: PayloadAction<IAuthTokenResponse>) {
      state.tokens = action.payload;
    },
    setUser(state, action: PayloadAction<IPublicUserDto>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
    },
    forgotPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.forgotPasswordSuccess = false;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
      state.forgotPasswordSuccess = true;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.resetPasswordSuccess = false;
    },
    resetPasswordSuccess(
      state,
      action: PayloadAction<{
        user: IPublicUserDto;
        tokens: IAuthTokenResponse;
      }>
    ) {
      state.loading = false;
      state.resetPasswordSuccess = true;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.resetPassword.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addMatcher(
        authApi.endpoints.resetPassword.matchFulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.resetPasswordSuccess = true;
          state.isAuthenticated = true;
          state.user = payload.user;
          state.tokens = payload.tokens;
        }
      )
      .addMatcher(
        authApi.endpoints.resetPassword.matchRejected,
        (state, { error }) => {
          state.loading = false;
          state.error = error.message ?? 'Failed to reset password';
        }
      );
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setTokens,
  setUser,
  logout,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
