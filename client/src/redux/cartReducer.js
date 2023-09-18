import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  //wishList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
        toast.info("Increased product quantity", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        state.products.push(action.payload);
      }
    },
    // addToWishList: (state, action) => {
    //   const item = state.wishList.find((item) => item.id === action.payload.id);

    //   if (item) {
    //     item.quantity += action.payload.quantity;
    //   } else {
    //     state.wishList.push(action.payload);
    //   }
    // },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },

    clearCart: (state) => {
      state.products = [];
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    // removeFromWishList: (state, action) => {
    //   state.wishList = state.wishList.filter(
    //     (item) => item.id !== action.payload
    //   );
    // },
    // resetWishList: (state) => {
    //   state.wishList = [];
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeItem,
  resetCart,
  clearCart,
  // addToWishList,
  // removeFromWishList,
  // resetWishList,
} = cartSlice.actions;

export default cartSlice.reducer;
