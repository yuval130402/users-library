import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const user = action.payload;
      state.push(user);
    },
    removeFromFavorites: (state, action) => {
      const userEmail = action.payload;
      return state.filter((user) => user.email !== userEmail);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;