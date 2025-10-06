import type { WishlistState } from "../types";
import { userStorage } from "../../auth/storage";

const getWishlistStorageKey = (): string => {
  const token = userStorage.get();
  return token ? `homey-wishlist-${token.slice(-8)}` : "homey-wishlist-guest";
};

export const wishlistStorage = {
  get: (): WishlistState => {
    const key = getWishlistStorageKey();
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : { items: [] };
  },

  set: (wishlist: WishlistState): void => {
    const key = getWishlistStorageKey();
    localStorage.setItem(key, JSON.stringify(wishlist));
  },

  clear: (): void => {
    const key = getWishlistStorageKey();
    localStorage.removeItem(key);
  },
};