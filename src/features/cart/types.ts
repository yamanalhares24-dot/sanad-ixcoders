export interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}