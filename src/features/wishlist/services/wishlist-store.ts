import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { WishlistItem, WishlistState } from '../types';
import { wishlistStorage } from '../storage';

interface WishlistStore extends WishlistState {
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  clearWishlistSilent: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ...wishlistStorage.get(),

  addToWishlist: (item) => {
    const { items } = get();
    const existingItem = items.find((wishlistItem) => wishlistItem.id === item.id);

    if (existingItem) {
      toast.info('Item already in wishlist');
      return;
    }

    const newItems = [...items, item];
    const newState = { items: newItems };
    wishlistStorage.set(newState);
    set(newState);
    toast.success(`${item.title} added to wishlist!`);
  },

  removeFromWishlist: (id) => {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== id);
    const newState = { items: newItems };
    wishlistStorage.set(newState);
    set(newState);
    toast.info('Item removed from wishlist');
  },

  clearWishlist: () => {
    wishlistStorage.clear();
    set({ items: [] });
    toast.info('Wishlist cleared');
  },

  clearWishlistSilent: () => {
    wishlistStorage.clear();
    set({ items: [] });
  },
}));