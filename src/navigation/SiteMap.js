import CustomLayout from "../layout/CustomLayouts";
import LoginPage from "../screens/login";
import LazyComponent from "./LazyComponent";
import PrivateRoute from "./protected/PrivateRoute";
// export const SiteMap = {

//   home: {
//     title: "home",
//     path: "/home",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="home/home" />
//       </CustomLayout>
//     ),
//     description: "home-Page",
//   },
  
//   businessProfile: {
//     title: "businessProfileome",
//     path: "/businessProfile",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="businessProfile/BusinessProfile" />
//       </CustomLayout>
//     ),
//     description: "businessProfile-Page",
//   },
//   shop: {
//     title: "shop-pages",
//     path: "/shop",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="shop/Shop" />
//       </CustomLayout>
//     ),
//     description: "Shop-Page",
//   }, 
//   countries: {
//     title: "country management",                          
//     path: "/countries",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="countries/countries" />
//       </CustomLayout>
//     ),
//     description: "Countries Management",
//   }, 
//   pricing: {
//     title: "pricing management",                          
//     path: "/pricing",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="pricing/pricing" />
//       </CustomLayout>
//     ),
//     description: "Countries Management",
//   },
//   packages: {
//     title: "subscription management",                          
//     path: "/subscription",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="subscription/subscription" />
//       </CustomLayout>
//     ),
//     description: "Subscription Management",
//   },
//   role: {
//     title: "role management",                          
//     path: "/role",
//     element: (
//       <CustomLayout>
//         <LazyComponent path="role/role" />
//       </CustomLayout>
//     ),
//     description: "Role Management",
//   },
//   login:{
//     title: "login",
//     path: "/",
//     element: (
      
//         <LoginPage/>
     
//     ),
  
//   }

// };


export const SiteMap = {
  home: {
    title: "home",
    path: "/home",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="home/home" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "home-Page",
  },
  businessProfile: {
    title: "businessProfile",
    path: "/businessProfile",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="businessProfile/BusinessProfile" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "businessProfile-Page",
  },
  shop: {
    title: "shop-pages",
    path: "/shop",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="shop/Shop" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "Shop-Page",
  },
  countries: {
    title: "country management",
    path: "/countries",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="countries/countries" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "Countries Management",
  },
  pricing: {
    title: "pricing management",
    path: "/pricing",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="pricing/pricing" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "Pricing Management",
  },
  packages: {
    title: "subscription management",
    path: "/subscription",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="subscription/subscription" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "Subscription Management",
  },
  role: {
    title: "role management",
    path: "/role",
    element: (
      <PrivateRoute>
        <CustomLayout>
          <LazyComponent path="role/role" />
        </CustomLayout>
      </PrivateRoute>
    ),
    description: "Role Management",
  },
  login: {
    title: "login",
    path: "/",
    element: <LoginPage />,
  },
};
