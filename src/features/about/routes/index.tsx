import { lazy } from "react";
import { DefaultLayout } from "../../../shared/layout/default-layout";
import { appRoutes } from "../../../routes";

const AboutPage = lazy(() => import("../pages"));

export const aboutRoutes = [
  {
    path: appRoutes.about, // Ex: my-app.com/about
    element: (
      <DefaultLayout>
        <AboutPage />
      </DefaultLayout>
    ),
  },
];
