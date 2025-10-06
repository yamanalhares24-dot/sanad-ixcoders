import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProductsService, {
  type Product,
} from "../../../features/products/services/api";
import { useCart } from "../../../features/cart/services/cart-hooks";
import { useWishlist } from "../../../features/wishlist/services/wishlist-hooks";
import "./search-popup.css";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getAll(),
  });

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleProductDetails = (id: number) => {
    navigate(`/products/${id}`);
    onClose();
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.images?.[0] || "",
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.images?.[0] || "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-popup" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
          />
          <button className="search-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="search-result-item">
                <img
                  src={product.images?.[0] || ""}
                  alt={product.title}
                  className="search-result-img"
                />
                <div className="search-result-info">
                  <h4 className="search-result-title">{product.title}</h4>
                  <div className="search-result-price">
                    <span className="price-now">
                      ${(product.price * 0.6).toFixed(0)}
                    </span>
                    <span className="price-old">${product.price}</span>
                  </div>
                </div>
                <div className="search-result-actions">
                  <button
                    className="search-action-btn"
                    onClick={() => handleProductDetails(product.id)}
                    aria-label="View details"
                  >
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M1.5 12S5.6 5.5 12 5.5 22.5 12 22.5 12 18.4 18.5 12 18.5 1.5 12 1.5 12Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                  <button
                    className="search-action-btn"
                    onClick={() => handleAddToWishlist(product)}
                    aria-label="Add to wishlist"
                  >
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M12 21s-7.2-4.6-9.5-8A5.6 5.6 0 0 1 12 6.6 5.6 5.6 0 0 1 21.5 13c-2.3 3.4-9.5 8-9.5 8Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                  <button
                    className="search-action-btn"
                    onClick={() => handleAddToCart(product)}
                    aria-label="Add to cart"
                  >
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H2M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : searchTerm.trim() ? (
            <div className="search-no-results">No products found</div>
          ) : (
            <div className="search-placeholder">
              Start typing to search products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
