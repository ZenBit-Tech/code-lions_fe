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
        const {
          id,
          name,
          email,
          isEmailVerified,
          role,
          accessToken,
          refreshToken,
        } = action.payload;

        state.id = id;
        state.name = name;
        state.email = email;
        state.isEmailVerified = isEmailVerified;
        state.isLoggedIn = true;
        state.role = role;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    );
    builder.addMatcher(
      userApi.endpoints.addUserGoogle.matchFulfilled,
      (state, action) => {
        const {
          id,
          name,
          email,
          role,
          isEmailVerified,
          accessToken,
          refreshToken,
        } = action.payload;

        state.id = id;
        state.name = name;
        state.email = email;
        state.isEmailVerified = isEmailVerified;
        state.isLoggedIn = true;
        state.role = role;

        if (isEmailVerified) {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.userSignUp.matchFulfilled,
      (state, action) => {
        const { id, name, email, role, isEmailVerified } = action.payload;

        state.id = id;
        state.name = name;
        state.email = email;
        state.isEmailVerified = isEmailVerified;
        state.isLoggedIn = true;
        state.role = role;
      }
    );
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        const {
          id,
          name,
          email,
          isEmailVerified,
          role,
          accessToken,
          refreshToken,
        } = action.payload;

        state.id = id;
        state.name = name;
        state.email = email;
        state.isEmailVerified = isEmailVerified;
        state.isLoggedIn = true;
        state.role = role;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    );
    builder.addMatcher(
      userApi.endpoints.resetPassword.matchFulfilled,
      (state, action) => {
        const {
          id,
          name,
          email,
          role,
          isEmailVerified,
          accessToken,
          refreshToken,
        } = action.payload;

        state.id = id;
        state.name = name;
        state.email = email;
        state.isEmailVerified = isEmailVerified;
        state.isLoggedIn = true;
        state.role = role;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    );
  },
});

export const { setEmail } = userSlice.actions;

export default userSlice.reducer;
