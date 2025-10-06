import { type RouteObject } from "react-router";
import { WishlistPage } from "../pages";
import { appRoutes } from "../../../routes";
import { DefaultLayout } from "../../../shared/layout/default-layout";

export const wishlistRoutes: RouteObject[] = [
  {
    path: appRoutes.wishlist,
    element: (
      <DefaultLayout>
        <WishlistPage />
      </DefaultLayout>
    ),
  },
];