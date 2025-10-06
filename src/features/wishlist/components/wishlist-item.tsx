import { useCart } from "../../cart/services/cart-hooks";
import { useWishlist } from "../services/wishlist-hooks";
import "../../products/components/product-item/style.css";

interface WishlistItemProps {
  title: string;
  price: number;
  img: string;
  id: number;
}

export function WishlistItem({ title, price, img, id }: WishlistItemProps) {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({ id, title, price, img });
    handleRemoveFromWishlist();
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(id);
  };

  return (
    <div className="product-card">
      <div className="pc-media">
        <span className="pc-badge">-40%</span>

        <button
          className="pc-icon"
          aria-label="Remove from wishlist"
          onClick={handleRemoveFromWishlist}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <img className="pc-img" src={img} alt={title} />

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
