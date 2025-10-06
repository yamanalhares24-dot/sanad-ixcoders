import { useWishlistStore } from './wishlist-store';

export const useWishlist = () => {
  const items = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
};