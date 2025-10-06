import { useCart } from "../services/cart-hooks";
import "./style.css";

import VISA from "/assets/imgs/Visa.svg";
import MASTERCARD from "/assets/imgs/Mastercard.svg";
import NAGAD from "/assets/imgs/Nagad.svg";
import BKASH from "/assets/imgs/Bkash.svg";

export function CheckoutPage() {
  const { items } = useCart();

  const subtotal = items.reduce(
    (s, it) => s + Math.round(it.price * 0.6) * it.quantity,
    0
  );
  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="container">
        <nav className="breadcrumb">
          <a href="#">Account</a> / <a href="#">My Account</a> /{" "}
          <a href="#">Product</a> / <a href="/cart">View Cart</a> /{" "}
          <span>CheckOut</span>
        </nav>

        <div className="empty-card">
          <h2>No items to checkout</h2>
          <p>Your cart is empty. Add some products first!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Breadcrumb like screenshot */}
      <nav className="breadcrumb">
        <a href="#">Account</a> / <a href="#">My Account</a> /{" "}
        <a href="#">Product</a> / <a href="/cart">View Cart</a> /{" "}
        <span>CheckOut</span>
      </nav>

      <div className="checkout-wrap">
        {/* LEFT — Billing form */}
        <div className="checkout-left">
          <h2 className="page-title">Billing Details</h2>

          <form className="checkout-form" action="#">
            <label className="field">
              <span className="label">
                First Name<span className="req">*</span>
              </span>
              <input type="text" placeholder="" required />
            </label>

            <label className="field">
              <span className="label">Company Name</span>
              <input type="text" placeholder="" />
            </label>

            <label className="field">
              <span className="label">
                Street Address<span className="req">*</span>
              </span>
              <input type="text" placeholder="" required />
            </label>

            <label className="field">
              <span className="label">Apartment, floor, etc. (optional)</span>
              <input type="text" placeholder="" />
            </label>

            <label className="field">
              <span className="label">
                Town/City<span className="req">*</span>
              </span>
              <input type="text" placeholder="" required />
            </label>

            <label className="field">
              <span className="label">Phone Number*</span>
              <input type="tel" placeholder="" required />
            </label>

            <label className="field">
              <span className="label">
                Email Address<span className="req">*</span>
              </span>
              <input type="email" placeholder="" required />
            </label>

            <label className="save-check">
              <input type="checkbox" defaultChecked />
              <span>Save this information for faster check-out next time</span>
            </label>
          </form>
        </div>

        {/* RIGHT — Order summary */}
        <aside className="checkout-right">
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="mini">
                  <img src={item.img} alt="" />
                  <span className="mini-title">{item.title}</span>
                </div>
                <span className="mini-price">
                  ${Math.round(item.price * 0.6) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="row">
              <span className="muted">Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="row">
              <span className="muted">Shipping:</span>
              <span>Free</span>
            </div>
            <div className="divider" />
            <div className="row total">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          <div className="payment">
            <label className="pay-opt">
              <input type="radio" name="pay" defaultChecked />
              <span>Bank</span>
              <span className="pay-logos">
                {/* بدّل المسارات وفق ملفاتك */}
                <img src={VISA} alt="Visa" />
                <img src={MASTERCARD} alt="Mastercard" />
                <img src={NAGAD} alt="Nagad" />
                <img src={BKASH} alt="Bkash" />
              </span>
            </label>

            <label className="pay-opt">
              <input type="radio" name="pay" />
              <span>Cash on delivery</span>
            </label>
          </div>

          <div className="coupon-row">
            <input
              type="text"
              className="coupon-input"
              placeholder="Coupon Code"
            />
            <button className="btn btn-accent outline">Apply Coupon</button>
          </div>

          <button className="btn btn-accent place">Place Order</button>
        </aside>
      </div>
    </div>
  );
}
