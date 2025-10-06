import { ProductGrid } from '../components/product-grid';

export function ProductsListPage() {
  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Products</h1>
      </div>
      <ProductGrid />
    </div>
  );
}