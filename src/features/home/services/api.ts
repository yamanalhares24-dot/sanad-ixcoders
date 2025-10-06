import { httpClient } from "../../../lib/axios";

export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

class CategoriesService {
  private static readonly CATEGORIES = "/categories";

  static async getCategories(): Promise<Category[]> {
    const { data } = await httpClient.get<Category[]>(this.CATEGORIES);
    return data;
  }
}

export default CategoriesService;