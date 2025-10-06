import { useCart } from "../../services/cart-hooks";
import type { CartItem as CartItemType } from "../../types";
import "./style.css";

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const { updateQuantity, removeFromCart } = useCart();

  const unit = Math.round(item.price * 0.6);
  const subtotal = unit * item.quantity;

  return (
    <div className="cart-item">
      <button
        className="cart-remove"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        ×
      </button>
      <img src={item.img} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>${unit}</p>
        <div className="quantity-controls">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
        <p className="subtotal">${subtotal}</p>
      </div>
    </div>
  );
}
