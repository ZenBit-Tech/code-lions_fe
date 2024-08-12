import { createSlice } from '@reduxjs/toolkit';

import { INotification } from './types';

const initialState: INotification[] = [];

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
});

export default notificationsSlice.reducer;
