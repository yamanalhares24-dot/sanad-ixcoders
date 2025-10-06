import { type RouteObject } from "react-router";
import { ProductsListPage } from "../pages/products-list-page";
import { ProductDetailsPage } from "../pages/product-details-page";
import { CategoryProductsPage } from "../pages/category-products-page";
import { appRoutes } from "../../../routes";
import { DefaultLayout } from "../../../shared/layout/default-layout";

export const productsRoutes: RouteObject[] = [
  {
    path: appRoutes.products.list,
    element: (
      <DefaultLayout>
        <ProductsListPage />
      </DefaultLayout>
    ),
  },
  {
    path: appRoutes.products.details,
    element: (
      <DefaultLayout>
        <ProductDetailsPage />
      </DefaultLayout>
    ),
  },
  {
    path: appRoutes.products.category,
    element: (
      <DefaultLayout>
        <CategoryProductsPage />
      </DefaultLayout>
    ),
  },
];
