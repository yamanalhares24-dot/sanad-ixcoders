import { ProductItem } from "../product-item";
import { Loader } from "../../../../shared/components/loader";
import { useQuery } from "@tanstack/react-query";
import ProductsService, { type Product } from "../../services/api";
import "./style.css";

export function ProductGrid() {
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

  return (
    <div className="product-grid-container">
      {products.map((p) => (
        <ProductItem
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          img={p.images?.[0] || ""}
        />
      ))}
    </div>
  );
}