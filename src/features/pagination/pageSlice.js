import { createSlice } from "@reduxjs/toolkit";

// define the initial state
const initialState = {
  currentPage: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    nextPage(state) {
      state.currentPage += 1;
    },
    previousPage(state) {
      state.currentPage -= 1;
    },
    changePage(state, action) {
      state.currentPage = action.payload;
    },
    resetPage(state) {
      state.currentPage = 1;
    },
  },
});

export const { nextPage, previousPage, resetPage, changePage } =
  pageSlice.actions;
export default pageSlice.reducer;
