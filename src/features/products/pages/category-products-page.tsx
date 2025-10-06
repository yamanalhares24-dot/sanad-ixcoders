import { useParams } from "react-router-dom";
import { useProductsByCategoryQuery } from "../services/queries";
import { useCategoriesQuery } from "../../home/services/queries";
import { ProductItem } from "../components/product-item";
import "../components/product-grid/style.css";

export function CategoryProductsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: products = [], isLoading: productsLoading } = useProductsByCategoryQuery(Number(categoryId));
  const { data: categories = [] } = useCategoriesQuery();
  
  const category = categories.find(c => c.id === Number(categoryId));

  if (productsLoading) {
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading products...</div>;
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1>{category?.name || "Category"} Products</h1>
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
    </div>
  );
}