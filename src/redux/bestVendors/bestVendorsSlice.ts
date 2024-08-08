import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBestVendor } from './types';

interface FollowStatus {
  [vendorId: string]: boolean;
}

interface BestVendorsState {
  bestVendors: IBestVendor[];
  followStatus: FollowStatus;
}

const initialState: BestVendorsState = {
  bestVendors: [],
  followStatus: {},
};

export const bestVendorsSlice = createSlice({
  name: 'bestVendors',
  initialState,
  reducers: {
    setBestVendors(state, action: PayloadAction<IBestVendor[]>) {
      state.bestVendors = action.payload;
    },
    setFollowStatus(state, action: PayloadAction<FollowStatus>) {
      state.followStatus = action.payload;
    },
    updateFollowStatus(
      state,
      action: PayloadAction<{ vendorId: string; status: boolean }>
    ) {
      state.followStatus[action.payload.vendorId] = action.payload.status;
    },
  },
});

export const { setBestVendors, setFollowStatus, updateFollowStatus } =
  bestVendorsSlice.actions;
export default bestVendorsSlice.reducer;
