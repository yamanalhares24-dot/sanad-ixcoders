import { useQuery } from "@tanstack/react-query";
import CategoriesService from "./api";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesService.getCategories(),
  });
}