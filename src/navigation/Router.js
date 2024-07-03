import { createBrowserRouter } from "react-router-dom";
import { SiteMap } from "./SiteMap";
// import ErrorScreen from "../screens/errorScreen/ErrorScreen";

export const router = createBrowserRouter(
  Object?.values(SiteMap)?.map((page) => ({
    path: page?.path,
    element: page?.element,
    // errorElement: <ErrorScreen />,.
  }))
);
