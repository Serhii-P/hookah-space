import { createSelector, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
      } else {
        state.cartItems.push({
          product: action.payload,
          qty: 1,
        });

        toast.success(`added ${action.payload.name} to cart`);
      }
    },

    decrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (state.cartItems[itemIndex].qty > 1) {
        state.cartItems[itemIndex].qty -= 1;
      } else if (state.cartItems[itemIndex].qty === 1) {
        const filteredItems = state.cartItems.filter(
          (item) => item.product.id !== action.payload.id
        );

        state.cartItems = filteredItems;

        toast.success(`${action.payload.name} removed from cart`);
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload.id);
      const nextCartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload.id
      );
      state.cartItems = nextCartItems;

      toast.success("removed from cart");
    },
    clearCart: (state) => {
      state.cartItems = [];
      toast.success("Cart cleared");
    },
  },
});

const cartItems = (state) => state.cart?.cartItems;

export const productQtyInCartSelector = createSelector(
  [cartItems, (cartItems, productId) => productId],
  (cartItems, productId) =>
    cartItems?.find((el) => el.product.id === productId)?.qty
);

export const totalCartItemsSelector = createSelector([cartItems], (cartItems) =>
  cartItems?.reduce((total, curr) => (total += curr.qty), 0)
);
export const TotalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total, curr) => (total += curr.qty * curr.product.basePrice),
    0
  )
);

export const { increment, decrement, removeFromCart, clearCart, getTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
