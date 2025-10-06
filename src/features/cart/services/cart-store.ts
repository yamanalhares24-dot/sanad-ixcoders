import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { CartItem, CartState } from '../types';
import { cartStorage } from '../storage';

interface CartStore extends CartState {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  clearCartSilent: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  ...cartStorage.get(),

  addToCart: (item) => {
    const { items } = get();
    const existingItem = items.find((cartItem) => cartItem.id === item.id);

    let newItems: CartItem[];
    if (existingItem) {
      newItems = items.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newItems = [...items, { ...item, quantity: 1 }];
    }

    const total = newItems.reduce(
      (sum, cartItem) => sum + cartItem.price * 0.6 * cartItem.quantity,
      0
    );

    const newState = { items: newItems, total };
    cartStorage.set(newState);
    set(newState);
    toast.success(`${item.title} added to cart!`);
  },

  removeFromCart: (id) => {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== id);
    const total = newItems.reduce(
      (sum, item) => sum + item.price * 0.6 * item.quantity,
      0
    );

    const newState = { items: newItems, total };
    cartStorage.set(newState);
    set(newState);
    toast.info('Item removed from cart');
  },

  updateQuantity: (id, quantity) => {
    const { items } = get();
    const newItems = items
      .map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
      .filter((item) => item.quantity > 0);

    const total = newItems.reduce(
      (sum, item) => sum + item.price * 0.6 * item.quantity,
      0
    );

    const newState = { items: newItems, total };
    cartStorage.set(newState);
    set(newState);
  },

  clearCart: () => {
    cartStorage.clear();
    set({ items: [], total: 0 });
    toast.info('Cart cleared');
  },

  clearCartSilent: () => {
    cartStorage.clear();
    set({ items: [], total: 0 });
  },

  initializeCart: () => {
    const cartData = cartStorage.get();
    set(cartData);
  },
}));