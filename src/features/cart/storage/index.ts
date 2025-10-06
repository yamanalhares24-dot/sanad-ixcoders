import type { CartState } from "../types";
import { userStorage } from "../../auth/storage";

const getCartStorageKey = (): string => {
  const token = userStorage.get();
  return token ? `homey-cart-${token.slice(-8)}` : "homey-cart-guest";
};

export const cartStorage = {
  get: (): CartState => {
    const key = getCartStorageKey();
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  },

  set: (cart: CartState): void => {
    const key = getCartStorageKey();
    localStorage.setItem(key, JSON.stringify(cart));
  },

  clear: (): void => {
    const key = getCartStorageKey();
    localStorage.removeItem(key);
  },

  clearAllUserCarts: (): void => {
    // Clear current user's cart when logging out
    const key = getCartStorageKey();
    localStorage.removeItem(key);
  },
};
