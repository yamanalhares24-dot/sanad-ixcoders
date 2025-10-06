import type { ReactNode } from "react";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import "./style.css";

export function LayoutContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="app-continer">{children}</main>
      <Footer />
    </>
  );
}
