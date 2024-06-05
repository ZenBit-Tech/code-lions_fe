import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './userService';

interface IUser {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  error: string;
}

interface IUserState {
  user: IUser;
}

const initialState: IUserState = {
  user: {
    id: '19a34e39-758d-4de6-9fa7-6480bd88f225',
    name: 'Arseniia',
    email: 'arseniiadamaxcoop@gmail.com',
    isEmailVerified: false,
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    error: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.verifyEmail.matchFulfilled,
      (state, action) => {
        state.user.isEmailVerified = true;
        state.user.accessToken = action.payload.accessToken;
        state.user.refreshToken = action.payload.refreshToken;
      }
    );
  },
});

export default userSlice.reducer;
