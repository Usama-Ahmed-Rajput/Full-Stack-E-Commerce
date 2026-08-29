import { createSlice } from '@reduxjs/toolkit';

// Helper to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('usama_mobiles_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

// Helper to save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('usama_mobiles_cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage', error);
  }
};

const SHIPPING_THRESHOLD = 10000; // Free shipping over Rs. 10,000
const FLAT_SHIPPING_FEE = 250;    // Rs. 250 flat shipping

const initialState = {
  items: loadCartFromStorage()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.product._id === product._id);

      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQty, product.stock);
      } else {
        state.items.push({
          product,
          quantity: Math.min(quantity, product.stock)
        });
      }
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product._id !== productId);
      saveCartToStorage(state.items);
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i.product._id === productId);
      if (item && item.quantity < item.product.stock) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i.product._id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.product._id !== productId);
        }
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    }
  }
});

// Selectors for calculations
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const selectCartShipping = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0) return 0;
  return subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
};

export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  const shipping = selectCartShipping(state);
  return subtotal + shipping;
};

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
