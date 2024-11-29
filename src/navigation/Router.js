import { createBrowserRouter } from "react-router-dom";
import { SiteMap } from "./SiteMap";

import PrivateRoute from "../navigation/protected/PrivateRoute.jsx";
import PublicRoute from "./public/PublicRoute.jsx";
export const router = createBrowserRouter(
  Object.values(SiteMap).map((page) => {
    const isPublicRoute = page.path === "/";

    return {
      path: page.path,
      element: isPublicRoute ? (
        <PublicRoute>{page.element}</PublicRoute>
      ) : (
        <PrivateRoute>{page.element}</PrivateRoute>
      ),
    };
  })
);