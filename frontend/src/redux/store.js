import { configureStore, createSlice } from "@reduxjs/toolkit";
import { products } from "../data/catalog.js";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    coupon: null
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    applyCoupon(state, action) {
      state.coupon = action.payload;
    }
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    ids: [products[1].id]
  },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload;
      state.ids = state.ids.includes(id) ? state.ids.filter((item) => item !== id) : [...state.ids, id];
    }
  }
});

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: false,
    notifications: [
      "New order #ORD1234 received",
      "Payment received from Ayesha Khan",
      "Low stock alert for Floral Enamel Ring"
    ]
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    pushNotification(state, action) {
      state.notifications.unshift(action.payload);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, applyCoupon } = cartSlice.actions;
export const { toggleWishlist } = wishlistSlice.actions;
export const { toggleDarkMode, pushNotification } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    ui: uiSlice.reducer
  }
});

