import { createSlice } from "@reduxjs/toolkit";

export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    value: null,
  },
  reducers: {
    updateUserDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { updateUserDetails } = userDetails.actions;
export const userDetailsObj = (state) => state.userDetails.value;
export default userDetails.reducer;
