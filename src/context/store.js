import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "features/users/usersSlice";
import searchReducer from "features/search/searchSlice";
import pageReducer from "features/pagination/pageSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    search: searchReducer,
    page: pageReducer,
  },
})

export default store;
