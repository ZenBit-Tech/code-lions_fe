import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    email: '',
    isEmailVerified: false,
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    error: '',
  },
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;

export default userSlice.reducer;
