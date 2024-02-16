import toast from "react-hot-toast";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  favItems: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.favItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.favItems.push(action.payload);
        toast.success(`added ${action.payload.name} to favorites`)
      }
    },
    removeFromFavorites: (state, action) => {
      state.favItems = state.favItems.filter(
        (item) => item.id !== action.payload.id
      );
      toast.success(`removed from favorites`)

    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
