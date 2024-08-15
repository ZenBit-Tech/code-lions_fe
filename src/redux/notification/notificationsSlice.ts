import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INotification } from './types';

interface NotificationsState {
  notifications: INotification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.push(action.payload);
    },
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { setNotification, setNotifications, clearNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
