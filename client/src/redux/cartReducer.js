import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  wishList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    addToWishList: (state, action) => {
      const item = state.wishList.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.wishList.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload
      );
    },
    resetWishList: (state) => {
      state.wishList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeItem,
  resetCart,
  addToWishList,
  removeFromWishList,
  resetWishList,
} = cartSlice.actions;

export default cartSlice.reducer;
