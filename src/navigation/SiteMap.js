import CustomLayout from "../layout/CustomLayouts";
import LoginPage from "../screens/login";
import LazyComponent from "./LazyComponent";

export const SiteMap = {

  home: {
    title: "home",
    path: "/home",
    element: (
      <CustomLayout>
        <LazyComponent path="home/home" />
      </CustomLayout>
    ),
    description: "home-Page",
  },
  
  businessProfile: {
    title: "businessProfileome",
    path: "/businessProfile",
    element: (
      <CustomLayout>
        <LazyComponent path="businessProfile/BusinessProfile" />
      </CustomLayout>
    ),
    description: "businessProfile-Page",
  },
  shop: {
    title: "shop-pages",
    path: "/shop",
    element: (
      <CustomLayout>
        <LazyComponent path="shop/Shop" />
      </CustomLayout>
    ),
    description: "Shop-Page",
  }, 
  countries: {
    title: "country management",                          
    path: "/countries",
    element: (
      <CustomLayout>
        <LazyComponent path="countries/countries" />
      </CustomLayout>
    ),
    description: "Countries Management",
  }, 
  pricing: {
    title: "pricing management",                          
    path: "/pricing",
    element: (
      <CustomLayout>
        <LazyComponent path="pricing/pricing" />
      </CustomLayout>
    ),
    description: "Countries Management",
  },
  packages: {
    title: "subscription management",                          
    path: "/subscription",
    element: (
      <CustomLayout>
        <LazyComponent path="subscription/subscription" />
      </CustomLayout>
    ),
    description: "Subscription Management",
  },
  role: {
    title: "role management",                          
    path: "/role",
    element: (
      <CustomLayout>
        <LazyComponent path="role/role" />
      </CustomLayout>
    ),
    description: "Role Management",
  },
  login:{
    title: "login",
    path: "/",
    element: (
      
        <LoginPage/>
     
    ),
  
  }

};
