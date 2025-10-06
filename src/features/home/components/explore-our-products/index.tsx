import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../../products/services/api";
import { ProductItem } from "../../../products/components/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./style.css";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../../routes";

export function ExploreOurProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductsService.getAll(),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading products...
      </div>
    );
  }

  // تقسيم المنتجات إلى مجموعات من 8 (سطرين × 4 كروت)
  const productGroups = [];
  for (let i = 0; i < products.length; i += 8) {
    productGroups.push(products.slice(i, i + 8));
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
    <section className="explore-products">
      <div className="categories__eyebrow">
        <span className="dot" />
        <span>Our Products</span>
      </div>
      <div className="explore-products__header">
        <h2 className="explore-products__title">Explore Our Products</h2>
        <div className="explore-products__nav">
          <button
            className="swiper-button-prev explore-nav "
            aria-label="Previous"
          >
            <Chevron dir="left" />
          </button>
          <button className="swiper-button-next explore-nav" aria-label="Next">
            {" "}
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".explore-products .swiper-button-next",
          prevEl: ".explore-products .swiper-button-prev",
        }}
      >
        {productGroups.map((group, groupIndex) => (
          <SwiperSlide key={groupIndex}>
            <div className="explore-products__grid">
              {group.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  img={product.images?.[0] || ""}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="product-list-footer">
        <Link to={appRoutes.products.list} className="view-all-btn">
          View All Products
        </Link>
      </div>
    </section>
  );
}
