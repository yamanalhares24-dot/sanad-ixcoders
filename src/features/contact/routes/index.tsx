import { lazy } from "react";
import { DefaultLayout } from "../../../shared/layout/default-layout";
import { appRoutes } from "../../../routes";
// import ContactPage from "../pages";

const ContactPage = lazy(() => import("../pages"));

export const contactRoutes = [
  {
    path: appRoutes.contact, // Ex: my-app.com/contact
    element: (
      <DefaultLayout>
        <ContactPage />
      </DefaultLayout>
    ),
  },
];
