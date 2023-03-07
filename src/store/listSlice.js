import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: []
  },
  reducers: {
    addList: (state, action) => {
      state.value.push(action.payload.value);
    },
    removeList: (state, action) => {
      state.value.splice(action.payload.value, 1);
    }
  }
});

export const { addList, removeList } = listSlice.actions;
export default listSlice.reducer;
