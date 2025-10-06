import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../../products/services/api";
import { ProductItem } from "../../../products/components/product-item";
import "./style.css";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../../routes";

export function BestSellingProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getAll(),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading best selling products...
      </div>
    );
  }

  const firstFourProducts = products.slice(0, 4);

  return (
    <section className="best-selling">
      <div className="categories__eyebrow">
        <span className="dot" />
        <span>This Month</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="categories__title">Best Selling Products</h2>
        <div className="product-list-footer">
          <Link to={appRoutes.products.list} className="view-all-btn">
            View All
          </Link>
        </div>
      </div>
      <div className="best-selling__grid">
        {firstFourProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            img={product.images?.[0] || ""}
          />
        ))}
      </div>
    </section>
  );
}

// import { useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import ProductsService from "../../../products/services/api";
// import "./BestSellingProducts.scss";

// type Product = {
//   id: string | number;
//   title: string;
//   price: number;
//   images?: string[];
//   rating?: { rate: number; count: number }; // optional; we'll fallback if missing
// };

// export function BestSellingProducts() {
//   const { data = [], isLoading } = useQuery<Product[]>({
//     queryKey: ["products"],
//     queryFn: () => ProductsService.getAll(),
//   });

//   const items = useMemo(
//     () => (Array.isArray(data) ? data.slice(0, 4) : []),
//     [data]
//   );

//   if (isLoading) {
//     return (
//       <section className="bestSelling">
//         <Header />
//         <div className="grid">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="card skeleton" />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bestSelling">
//       <Header />
//       <div className="grid">
//         {items.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------- UI bits ---------------- */

// function Header() {
//   return (
//     <header className="bsHeader">
//       <div className="eyebrow">
//         <span className="dot" aria-hidden="true" />
//         <span>This Month</span>
//       </div>
//       <h2 className="title">Best Selling Products</h2>
//       <a className="cta" href="/products/best-selling">
//         View All
//       </a>
//     </header>
//   );
// }

// function ProductCard({ product }: { product: Product }) {
//   const img = product.images?.[0] || "";
//   const rating = product.rating?.rate ?? 4.6;
//   const count = product.rating?.count ?? 65;
//   // If your API doesn’t have oldPrice/discount, fake a subtle one for UI
//   const oldPrice = Math.round(product.price * 1.12);

//   return (
//     <article className="card">
//       <div className="media">
//         {img ? (
//           <img src={img} alt={product.title} />
//         ) : (
//           <div className="imgFallback" />
//         )}
//         <div className="actions">
//           <button className="iconBtn" aria-label="Add to wishlist">
//             <HeartIcon />
//           </button>
//           <button className="iconBtn" aria-label="Quick view">
//             <EyeIcon />
//           </button>
//         </div>
//       </div>

//       <h3 className="cardTitle">{product.title}</h3>

//       <div className="priceRow">
//         <span className="priceNow">${product.price}</span>
//         <span className="priceWas">${oldPrice}</span>
//       </div>

//       <div className="ratingRow" aria-label={`${rating} out of 5 stars`}>
//         <Stars value={rating} />
//         <span className="count">({count})</span>
//       </div>
//     </article>
//   );
// }

// /* --------------- Icons --------------- */

// function HeartIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path
//         d="M12 21s-7.5-4.6-9.4-8.5C1.3 9.7 3.1 6 6.6 6c2 0 3.1 1.1 3.9 2.2C11.3 7.1 12.4 6 14.4 6 17.9 6 19.7 9.7 21.4 12.5 19.5 16.4 12 21 12 21z"
//         stroke="currentColor"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function EyeIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path
//         d="M1.5 12S5.5 5.5 12 5.5 22.5 12 22.5 12 18.5 18.5 12 18.5 1.5 12 1.5 12z"
//         stroke="currentColor"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
//     </svg>
//   );
// }

// function Star({ filled }: { filled: boolean }) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
//       <path
//         d="M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 18.8 5.7 21.2 6.9 14.2 2 9.3l7-1L12 2z"
//         fill={filled ? "currentColor" : "none"}
//         stroke="currentColor"
//         strokeWidth="1.4"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function Stars({ value }: { value: number }) {
//   const full = Math.floor(value);
//   const hasHalf = value - full >= 0.5;
//   return (
//     <div className="stars">
//       {Array.from({ length: 5 }).map((_, i) => {
//         const filled = i < full || (i === full && hasHalf);
//         return <Star key={i} filled={filled} />;
//       })}
//     </div>
//   );
// }
