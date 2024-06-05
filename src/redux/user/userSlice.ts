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
  reducers: {
    setUser(state, action) {
      const { id, name, email, isEmailVerified } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.isEmailVerified = isEmailVerified;
      state.isLoggedIn = true;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
