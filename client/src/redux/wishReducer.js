import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishProducts: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = state.wishProducts.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.wishProducts.push(action.payload);
      }
    },
    removeFromWishList: (state, action) => {
      state.wishProducts = state.wishProducts.filter(
        (item) => item.id !== action.payload
      );
    },
    resetWishList: (state) => {
      state.wishProducts = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishList, removeFromWishList, resetWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;
