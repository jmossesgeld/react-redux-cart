import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartShown: true, cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggle(state) {
      state.isCartShown = !state.isCartShown;
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    changeQuantity(state, action) {
      const item = state.cartItems[action.payload.idx];
      item.quantity += action.payload.amount;
      if (item.quantity === 0) {
        state.cartItems.splice(action.payload.idx, 1);
      } else {
        item.total = item.price * item.quantity;
      }
    },
  },
});

// const reducerFn = (state = initialState, action) => {
//   if (action.type === "toggle") {
//     return { ...state, isCartShown: !state.isCartShown };
//   }

//   if (action.type === "addToCart") {
//     return { ...state, cartItems: [...state.cartItems, action.cartItem] };
//   }

//   if (action.type === "changeQuantity") {
//     const newCartItems = [...state.cartItems];
//     const item = newCartItems[action.idx];
//     item.quantity += action.amount;
//     if (item.quantity === 0) {
//       newCartItems.splice(action.idx, 1);
//     } else {
//       item.total = item.price * item.quantity;
//     }
//     return { ...state, cartItems: newCartItems };
//   }

//   return state;
// };

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
