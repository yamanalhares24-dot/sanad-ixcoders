import { type RouteObject } from "react-router";
import { CartPage } from "../pages";
import { CheckoutPage } from "../pages/checkout-page";
import { appRoutes } from "../../../routes";
import { DefaultLayout } from "../../../shared/layout/default-layout";
import { AuthGuard } from "../../../shared/guards/auth-guard";

export const cartRoutes: RouteObject[] = [
  {
    path: appRoutes.cart,
    element: (
      <DefaultLayout>
        <CartPage />
      </DefaultLayout>
    ),
  },
  {
    path: appRoutes.checkout,
    element: (
      <AuthGuard>
        <DefaultLayout>
          <CheckoutPage />
        </DefaultLayout>
      </AuthGuard>
    ),
  },
];