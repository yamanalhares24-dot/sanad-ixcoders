import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../services/cart-hooks";
import { userStorage } from "../../auth/storage";
import { appRoutes } from "../../../routes";
import { toast } from "react-toastify";
import "./style.css";
import "./../components/core.css";
import CartItemRow from "../components/cart-row";

export function CartPage() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [coupon, setCoupon] = useState("");

  // Keep totals consistent with row pricing (unit = 60% of base)
  const subtotal = useMemo(
    () =>
      items.reduce((s, it) => s + Math.round(it.price * 0.6) * it.quantity, 0),
    [items]
  );
  const shippingLabel = "Free";
  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="container cart-page">
        <nav className="breadcrumb">
          <a href="#">Home</a> / <span>Cart</span>
        </nav>
        <div className="empty-card">
          <h2 style={{ margin: 0, color: "#666" }}>Your cart is empty</h2>
          <p style={{ marginTop: 8 }}>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* breadcrumb like screenshot */}
      <nav className="breadcrumb">
        <a href="#">Home</a> / <span>Cart</span>
      </nav>

      <div className="cart-wrap">
        <div className="cart-left">
          <div className="cart-table">
            {/* Header above rows */}
            <div className="cart-head">
              <div>Product</div>
              <div className="ta-right">Price</div>
              <div className="ta-center">Quantity</div>
              <div className="ta-right">Subtotal</div>
            </div>

            {/* Rows */}
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}

            {/* Under-row actions */}
            <div className="cart-actions">
              <button className="btn-outline">Return To Shop</button>
              <button className="btn-outline">Update Cart</button>
            </div>

            {/* Coupon row */}
            <div className="cart-coupon" style={{ marginTop: 18 }}>
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="coupon-input"
                placeholder="Coupon Code"
              />
              <button className="btn-accent">Apply Coupon</button>
            </div>
          </div>
        </div>

        {/* Summary on the right */}
        <aside className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Cart Total</h3>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shippingLabel}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <button
              className="btn-accent summary-cta"
              onClick={() => {
                const isLoggedIn = !!userStorage.get();
                if (isLoggedIn) {
                  navigate(appRoutes.checkout);
                } else {
                  toast.error("Please login to proceed to checkout");
                  navigate(appRoutes.auth.signUp);
                }
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
