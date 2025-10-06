import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { appRoutes } from "../../../routes";
import { useCart } from "../../../features/cart/services/cart-hooks";
import { useWishlist } from "../../../features/wishlist/services/wishlist-hooks";
import { userStorage } from "../../../features/auth/storage";
import AuthServices from "../../../features/auth/services/api";
import { SearchPopup } from "../../components/search/search-popup";
import "./style.scss";
import USER from "/assets/imgs/user.svg";
import WISHLIST from "/assets/imgs/Wishlist.svg";
import USERACC from "/assets/imgs/USERACC.svg";
import ORDERACC from "/assets/imgs/icon-mallbag.svg";
import CANCELORDER from "/assets/imgs/icon-cancel.svg";
import REVIEW from "/assets/imgs/Icon-Reviews.svg";
import LOGOUT from "/assets/imgs/Icon-logout.svg";
import CART from "/public/assets/icons/Cart1.svg";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const isLoggedIn = !!userStorage.get();

  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  const handleLogout = async () => {
    localStorage.clear();
    window.location.reload();
    await AuthServices.logout();
    setShowUserMenu(false);
    navigate(appRoutes.home);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setShowSearchPopup(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className=" offer">
            <span>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </span>
            <a href="#" style={{ marginLeft: "10px" }}>
              ShopNow
            </a>
          </div>
          <div className="lang" title="Language">
            English
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <nav className="nav container">
        <div className="nav-inner">
          <button
            className="categories-btn"
            onClick={() => setShowCategories(!showCategories)}
            aria-label="Categories"
          >
            {showCategories ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m18 6-12 12" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18" />
                <path d="M3 6h18" />
                <path d="M3 18h18" />
              </svg>
            )}
          </button>
          {showCategories && (
            <>
              <div
                className="categories-overlay"
                onClick={() => setShowCategories(false)}
              />
              <div className="categories-dropdown">
                <div className="categories-list">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="category-item"
                      onClick={() => {
                        setShowCategories(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="brand">Exclusive</div>

          <div className="links">
            <Link
              to={appRoutes.home}
              className={location.pathname === appRoutes.home ? "active" : ""}
            >
              Home
            </Link>
            <Link
              to={appRoutes.contact}
              className={
                location.pathname === appRoutes.contact ? "active" : ""
              }
            >
              Contact
            </Link>
            <Link
              to={appRoutes.about}
              className={location.pathname === appRoutes.about ? "active" : ""}
            >
              About
            </Link>
            <Link
              to={appRoutes.auth.signUp}
              className={
                location.pathname === appRoutes.auth.signUp ? "active" : ""
              }
            >
              Sign Up
            </Link>
          </div>

          {/* <div className="spacer"></div> */}
          <div className="search-container">
            <button
              className="search"
              onClick={() => setShowSearchPopup(true)}
              aria-label="Search"
              title="Click / to search"
            >
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ width: "24px", height: "24px" }}
              >
                <circle cx="11" cy="11" r="7"></circle>
                <path d="m20 20-3.5-3.5"></path>
              </svg>
            </button>

            <div className="actions">
              <Link to={appRoutes.wishlist} className="wishlist-link">
                <img src={WISHLIST} className="user-dot" alt="Wishlist" />
                {wishlistItems.length > 0 && (
                  <span className="wishlist-badge">{wishlistItems.length}</span>
                )}
              </Link>
              <Link to={appRoutes.cart} className="cart-link">
                <img
                  src={CART}
                  alt="Cart"
                  style={{ width: "32px", height: "32px" }}
                />
                {items.length > 0 && (
                  <span className="cart-badge">{items.length}</span>
                )}
              </Link>
              {isLoggedIn && (
                <div className="user-menu">
                  <button
                    className="user-indicator"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    aria-label="User menu"
                  >
                    <img
                      src={USER}
                      className="user-dot"
                      style={{ width: "32px", height: "32px" }}
                      alt=""
                    />
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button className="logout-btn db-row">
                        <img
                          src={USERACC}
                          className="user-dot"
                          style={{ width: "32px", height: "32px" }}
                          alt=""
                        />
                        Manage My Account
                      </button>
                      <button className="logout-btn  db-row">
                        <img
                          src={ORDERACC}
                          className="user-dot"
                          style={{ width: "32px", height: "32px" }}
                          alt=""
                        />
                        My Order
                      </button>
                      <button className="logout-btn  db-row">
                        <img
                          src={CANCELORDER}
                          className="user-dot"
                          style={{ width: "32px", height: "32px" }}
                          alt=""
                        />
                        My Cancellations
                      </button>
                      <button className="logout-btn  db-row">
                        <img
                          src={REVIEW}
                          className="user-dot"
                          style={{ width: "32px", height: "32px" }}
                          alt=""
                        />
                        My Reviews
                      </button>
                      <button
                        onClick={handleLogout}
                        className="logout-btn  db-row"
                      >
                        <img
                          src={LOGOUT}
                          className="user-dot"
                          style={{ width: "32px", height: "32px" }}
                          alt=""
                        />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SearchPopup
        isOpen={showSearchPopup}
        onClose={() => setShowSearchPopup(false)}
      />
    </>
  );
}
