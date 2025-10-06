import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { userStorage } from "../../features/auth/storage";
import { appRoutes } from "../../routes";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isLoggedIn = !!userStorage.get();

  if (!isLoggedIn) {
    return <Navigate to={appRoutes.auth.signUp} replace />;
  }

  return <>{children}</>;
}
