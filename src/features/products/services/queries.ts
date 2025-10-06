import { useQuery } from "@tanstack/react-query";
import ProductsService from "./api";

export function useProductsByCategoryQuery(categoryId: number) {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => ProductsService.getByCategoryId(categoryId),
  });
}