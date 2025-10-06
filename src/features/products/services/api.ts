import { httpClient } from "../../../lib/axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

class ProductsService {
  static async getAll(): Promise<Product[]> {
    const response = await httpClient.get("/products");
    return response.data;
  }

  static async getById(id: string): Promise<Product[]> {
    const response = await httpClient.get(`/products/${id}`);
    return [response.data];
  }

  static async getByCategoryId(categoryId: number): Promise<Product[]> {
    const response = await httpClient.get(`/categories/${categoryId}/products`);
    return response.data;
  }
}

export default ProductsService;
