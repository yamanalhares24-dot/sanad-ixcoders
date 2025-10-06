import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import ProductsService from "../services/api";
import type { Product } from "../services/api";
import { ProductItem } from "../components/product-item";
import s from "./ProductDetails.module.scss";

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeIdx, setActiveIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<"XS" | "S" | "M" | "L" | "XL">("M");
  const [color, setColor] = useState<string>("#DB4444"); // red as default

  // mock rating/reviews if your API doesn’t have them
  const rating = 4.8;
  const reviews = 160;

  useEffect(() => {
    let mounted = true;
    if (id) {
      ProductsService.getById(id)
        .then((data) => {
          if (!mounted) return;
          const item = Array.isArray(data) ? data[0] : data;
          setProduct(item ?? null);

          // Fetch related products from same category
          if (item?.category?.id) {
            return ProductsService.getByCategoryId(item.category.id);
          }
          return [];
        })
        .then((categoryProducts) => {
          if (!mounted) return;
          // Filter out current product and take first 4
          const filtered = (categoryProducts || [])
            .filter((p) => p.id !== Number(id))
            .slice(0, 4);
          setRelatedProducts(filtered);
        })
        .catch(() => {
          setProduct(null);
          setRelatedProducts([]);
        })
        .finally(() => setLoading(false));
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  const images: string[] = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images.filter(Boolean);
  }, [product]);

  const discounted = useMemo(() => {
    if (!product) return 0;
    // same as your previous: show ~60% of original
    return +(product.price * 0.6).toFixed(2);
  }, [product]);

  if (loading) return <div className={s.loading}>Loading…</div>;
  if (!product) return <div className={s.notFound}>Product not found</div>;

  return (
    <section className={`container ${s.root}`}>
      {/* container */}
      {/* Breadcrumbs */}
      <nav className={s.breadcrumb} aria-label="Breadcrumb">
        <a href="/" className={s.bcLink}>
          Account
        </a>
        <span className={s.bcSep}>/</span>
        <a href="#" className={s.bcLink}>
          Gaming
        </a>
        <span className={s.bcSep}>/</span>
        <span className={s.bcCurrent}>{product.title}</span>
      </nav>

      <div className={s.wrap}>
        {/* Left: gallery */}
        <aside className={s.gallery}>
          <ul className={s.thumbs}>
            {images.map((src, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`${s.thumb} ${i === activeIdx ? s.active : ""}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Preview image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              </li>
            ))}
          </ul>

          <div className={s.mainImgBox}>
            <img
              className={s.mainImg}
              src={images[activeIdx] ?? images[0]}
              alt={product.title}
            />
          </div>
        </aside>

        {/* Right: info */}
        <main className={s.info}>
          <h1 className={s.title}>{product.title}</h1>

          <div className={s.metaRow}>
            <div className={s.stars} aria-label={`${rating} stars`}>
              {/* 5 solid stars */}
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className={s.star}>
                  <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.9L12 16.9 6.7 19.7l1-5.9-4.2-4.1 5.9-.9L12 3.5z" />
                </svg>
              ))}
            </div>
            <span className={s.reviews}>({reviews} Reviews)</span>
            <span className={s.stock}>In Stock</span>
          </div>

          <div className={s.priceRow}>
            <span className={s.priceNow}>${discounted.toFixed(2)}</span>
            <span className={s.priceOld}>${product.price}</span>
          </div>

          <p className={s.desc}>{product.description}</p>

          {/* Colours */}
          <div className={s.row}>
            <span className={s.label}>Colours:</span>
            <div className={s.colors}>
              {["#DB4444", "#111111"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${s.color} ${color === c ? s.colorActive : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Colour ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className={s.row}>
            <span className={s.label}>Size:</span>
            <div className={s.sizes}>
              {(["XS", "S", "M", "L", "XL"] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`${s.size} ${size === sz ? s.sizeActive : ""}`}
                  onClick={() => setSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Buy */}
          <div className={s.buyRow}>
            <div className={s.qty}>
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
              >
                −
              </button>
              <input
                className={s.qtyInput}
                value={qty}
                onChange={(e) => {
                  const v = Math.max(1, +e.target.value || 1);
                  setQty(v);
                }}
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((n) => n + 1)}
              >
                +
              </button>
            </div>

            <button className={`${s.btn} ${s.btnPrimary}`} type="button">
              Buy Now
            </button>

            <button className={`${s.btnIcon}`} aria-label="Add to wishlist">
              <svg viewBox="0 0 24 24" className={s.heart}>
                <path
                  d="M12 21s-7.2-4.6-9.5-8A5.6 5.6 0 0 1 12 6.6 5.6 5.6 0 0 1 21.5 13c-2.3 3.4-9.5 8-9.5 8Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          {/* Delivery cards */}
          <div className={s.cards}>
            <div className={s.card}>
              <div className={s.cardIcon}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M3 16V7a2 2 0 0 1 2-2h9v11H3Zm11 0h4.2a2 2 0 0 0 1.9-1.4l.8-2.4A2 2 0 0 0 19.9 9H14v7ZM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className={s.cardBody}>
                <h4 className={s.cardTitle}>Free Delivery</h4>
                <a href="#" className={s.cardLink}>
                  Enter your postal code for Delivery Availability
                </a>
              </div>
            </div>

            <div className={s.card}>
              <div className={s.cardIcon}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className={s.cardBody}>
                <h4 className={s.cardTitle}>Return Delivery</h4>
                <p className={s.cardNote}>
                  Free 30 Days Delivery Returns. <a href="#">Details</a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className={s.relatedSection}>
          {/* <h2 className={s.relatedTitle}>Relcvbnated Items</h2> */}
          <div className="categories__eyebrow">
            <span className="dot" />
            <span>Related Item</span>
          </div>
          {/* <div className={`${s.relatedTitle} categories__eyebrow`}>
            <span className="dot" />
            <span>Categories</span>
          </div> */}
          {/* <div className="categories__eyebrow">
            <span className="dot" />
            <span>This Month</span>
          </div> */}
          <div className={s.relatedGrid}>
            {relatedProducts.map((relatedProduct) => (
              <ProductItem
                key={relatedProduct.id}
                id={relatedProduct.id}
                title={relatedProduct.title}
                price={relatedProduct.price}
                img={relatedProduct.images?.[0] || ""}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
