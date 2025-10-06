export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  img: string;
}

export interface WishlistState {
  items: WishlistItem[];
}