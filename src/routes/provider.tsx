import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { authRoutes } from "../features/auth/routes";
import { productsRoutes } from "../features/products/routes";
import { AppContainer } from "../shared/layout/app-container";
import { lazy } from "react";
import { LayoutContainer } from "../shared/layout/layout-container";
import { homeRoutes } from "../features/home/routes";
import { contactRoutes } from "../features/contact/routes";
import { aboutRoutes } from "../features/about/routes";
import { cartRoutes } from "../features/cart/routes";
import { wishlistRoutes } from "../features/wishlist/routes";

const NotFoundPage = lazy(() => import("../shared/pages/not-found-page"));

const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      ...homeRoutes,
      ...contactRoutes,
      ...aboutRoutes,
      ...productsRoutes,
      ...authRoutes,
      ...cartRoutes,
      ...wishlistRoutes,
      {
        path: "*",
        element: (
          <LayoutContainer>
            <NotFoundPage />
          </LayoutContainer>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/sanad-ixcoders/",
});

export function AppRouterProvider() {
  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
}
