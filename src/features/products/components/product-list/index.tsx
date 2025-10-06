import { ProductItem } from "../product-item";
import { Loader } from "../../../../shared/components/loader";
import { useQuery } from "@tanstack/react-query";
import ProductsService, { type Product } from "../../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router";
import { appRoutes } from "../../../../routes";
import "./style.css";

// لو تستخدم React Router تقدر تغيّر <a> إلى <Link> من 'react-router-dom'
export function ProductList() {
  const {
    isLoading,
    isError,
    error,
    data: products = [],
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => await ProductsService.getAll(),
  });

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ color: "red", fontSize: "2rem" }}>{error.message}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ color: "#eee", fontSize: "2rem" }}>No data found</p>
      </div>
    );
  }
  const Chevron = ({ dir = "left" }: { dir?: "left" | "right" }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {dir === "left" ? (
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      ) : (
        <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
      )}
    </svg>
  );

  return (
    <section className="product-list-container">
      {/* أزرار التنقّل فوق يمين */}
      <div className="product-list-head">
        <div className="product-navs">
          <button
            className="swiper-button-prev product-nav"
            aria-label="Scroll left"
          >
            <Chevron dir="left" />
          </button>
          <button className="swiper-button-next product-nav" aria-label="Next">
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          nextEl: ".product-list-container .swiper-button-next",
          prevEl: ".product-list-container .swiper-button-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductItem
              id={p.id}
              title={p.title}
              price={p.price}
              img={p.images?.[0] || ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* زر View All Products أسفل السلايدر */}
      <div className="product-list-footer">
        <Link to={appRoutes.products.list} className="view-all-btn">
          View All Products
        </Link>
      </div>
    </section>
  );
}
