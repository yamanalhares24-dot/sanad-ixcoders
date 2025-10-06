import "./style.css";
import { useNavigate } from "react-router";
import { useCart } from "../../../cart/services/cart-hooks";
import { useWishlist } from "../../../wishlist/services/wishlist-hooks";

interface ProductItemProps {
  title: string;
  price: number;
  img: string;
  id: number;
}

export function ProductItem({ title, price, img, id }: ProductItemProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleViewDetails = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    addToCart({ id, title, price, img });
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id, title, price, img });
  };

  return (
    <div className="product-card">
      <div className="pc-media">
        <span className="pc-badge">-40%</span>

        <button
          className="pc-icon"
          aria-label="Add to wishlist"
          onClick={handleAddToWishlist}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 21s-7.2-4.6-9.5-8A5.6 5.6 0 0 1 12 6.6 5.6 5.6 0 0 1 21.5 13c-2.3 3.4-9.5 8-9.5 8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2" /* <-- fixed for JSX */
            />
          </svg>
        </button>

        <button
          className="pc-icon pc-icon--second"
          aria-label="Quick view"
          onClick={handleViewDetails}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M1.5 12S5.6 5.5 12 5.5 22.5 12 22.5 12 18.4 18.5 12 18.5 1.5 12 1.5 12Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2" /* <-- fixed for JSX */
            />
            <circle
              cx="12"
              cy="12"
              r="3.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2" /* <-- fixed for JSX */
            />
          </svg>
        </button>

        <img className="pc-img" src={img} alt={title} />

        {/* 👇 Appears on hover only */}
        <button className="pc-cta" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>

      <h3 className="pc-title">{title}</h3>

      <div className="pc-price">
        <span className="pc-price__now">{(price * 0.6).toFixed(0)}$</span>
        <span className="pc-price__old">{price}$</span>
      </div>

      <div className="pc-rating">
        <span className="pc-stars" aria-label="5 stars">
          <svg viewBox="0 0 24 24">
            <path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.2-4.1 5.9-.9L12 3.5Z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.2-4.1 5.9-.9L12 3.5Z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.2-4.1 5.9-.9L12 3.5Z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.2-4.1 5.9-.9L12 3.5Z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.2-4.1 5.9-.9L12 3.5Z" />
          </svg>
        </span>
        <span className="pc-reviews">(88)</span>
      </div>
    </div>
  );
}
