import type { ReactNode } from "react";
import { LayoutContainer } from "../layout-container";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
