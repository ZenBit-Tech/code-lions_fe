import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPublicUserDto, IAuthTokenResponse } from 'src/redux/types/user';
import { RootState } from 'src/redux/store';

interface AuthState {
  user: IPublicUserDto | null;
  tokens: IAuthTokenResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: IPublicUserDto; tokens: IAuthTokenResponse }>) {
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
  },
});

export const { loginStart, loginSuccess, loginFailure, setTokens, setUser, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;
export default authReducer;