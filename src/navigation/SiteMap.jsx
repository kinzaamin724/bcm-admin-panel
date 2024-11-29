import CustomLayout from "../layout/CustomLayouts";
import LoginPage from "../screens/login";
import LazyComponent from "./LazyComponent";
import PrivateRoute from "./protected/PrivateRoute";

const SiteMap = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="home/home" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/businessProfile",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="businessProfile/BusinessProfile" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/shop",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="shop/Shop" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/countries",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="countries/countries" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/pricing",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="pricing/pricing" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/subscription",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="subscription/subscription" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/role",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="role/role" />
        </CustomLayout>
      </PrivateRoute>
    ),
  },
];

export default SiteMap;
