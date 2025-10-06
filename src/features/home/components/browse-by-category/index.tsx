import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrowseByCategory.scss";
import { useCategoriesQuery } from "../../services/queries";
import { appRoutes } from "../../../../routes";

type Props = {
  title?: string;
  initialActiveId?: number;
  onSelect?: (id: number) => void;
};

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

export default function BrowseByCategory({
  title = "Browse By Category",
  initialActiveId,
  onSelect,
}: Props) {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useCategoriesQuery();
  const [activeId, setActiveId] = useState<number | undefined>(initialActiveId);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleSelect = (id: number) => {
    setActiveId(id);
    onSelect?.(id);
    navigate(appRoutes.products.category.replace(":categoryId", id.toString()));
  };

  if (isLoading) {
    return (
      <section className="categories">
        <div style={{ textAlign: "center", padding: "40px" }}>
          Loading categories...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categories">
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          Error loading categories
        </div>
      </section>
    );
  }

  return (
    <section className="categories">
      <header className="categories__header">
        <div className="categories__eyebrow">
          <span className="dot" />
          <span>Categories</span>
        </div>
        <h2 className="categories__title">{title}</h2>
        <div className="categories__nav">
          <button
            className="navBtn"
            aria-label="Scroll left"
            onClick={() => scrollBy(-280)}
          >
            <Chevron dir="left" />
          </button>
          <button
            className="navBtn"
            aria-label="Scroll right"
            onClick={() => scrollBy(280)}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </header>

      <div
        className="categories__scroller"
        style={{ overflow: "hidden" }}
        ref={scrollerRef}
      >
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={
              "catCard" + (c.id === activeId ? " catCard--active" : "")
            }
            onClick={() => handleSelect(c.id)}
          >
            <span className="catCard__icon" aria-hidden="true">
              <img
                src={c.image}
                alt={c.name}
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </span>
            <span className="catCard__label">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
