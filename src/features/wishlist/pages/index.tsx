import { useWishlist } from "../services/wishlist-hooks";
import { WishlistItem } from "../components/wishlist-item";
import "./style.css";

export function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container">
        <nav className="breadcrumb">
          <a href="#">Home</a> / <span>Wishlist</span>
        </nav>
        <div className="empty-card">
          <h2>Your wishlist is empty</h2>
          <p>Add some products to your wishlist!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <nav className="breadcrumb">
        <a href="#">Home</a> / <span>Wishlist</span>
      </nav>

      <div className="wishlist-header">
        <h2>Wishlist ({items.length})</h2>
      </div>

      <div className="wishlist-grid">
        {items.map((item) => (
          <WishlistItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}
