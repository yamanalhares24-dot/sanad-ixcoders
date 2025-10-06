import { lazy } from "react";
import { LayoutContainer } from "../../../shared/layout/layout-container";
import { appRoutes } from "../../../routes";

const SignUpPage = lazy(() => import("../pages/sign-up"));
const LoginPage = lazy(() => import("../pages/login"));

export const authRoutes = [
  {
    path: appRoutes.auth.login,
    element: (
      <LayoutContainer>
        <LoginPage />,
      </LayoutContainer>
    ),
  },
  {
    path: appRoutes.auth.signUp,
    element: (
      <LayoutContainer>
        <SignUpPage />,
      </LayoutContainer>
    ),
  },
];
