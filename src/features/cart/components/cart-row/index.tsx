import { useCart } from "../../services/cart-hooks"; // غيّر المسار إذا لزم
import type { CartItem as CartItemType } from "../../types";
import "./style.css"; // أو اتركه مستورداً من صفحة الكارت؛ مو ضروري مرتين
import "./../core.css";

interface Props {
  item: CartItemType;
}

export default function CartItemRow({ item }: Props) {
  const { updateQuantity, removeFromCart } = useCart();

  const unit = Math.round(item.price * 0.6);
  const subtotal = unit * item.quantity;

  return (
    <div className="cart-row">
      <div className="cart-prod">
        <button
          className="cart-remove"
          aria-label="Remove item"
          title="Remove item"
          onClick={() => removeFromCart(item.id)}
        >
          ×
        </button>

        <img className="cart-thumb" src={item.img} alt={item.title} />
        <p className="cart-prod-name" title={item.title}>
          {item.title}
        </p>
      </div>

      <div className="cart-details">
        <div className="cart-price ta-right">${unit}</div>

        <div className="cart-qty ta-center">
          <select
            className="qty-select"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            aria-label="Quantity"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {String(n).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        <div className="cart-subtotal ta-right">${subtotal}</div>
      </div>
    </div>
  );
}
