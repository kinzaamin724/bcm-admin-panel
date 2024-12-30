import { createBrowserRouter } from "react-router-dom";
//import { useState, useEffect } from "react";
import Login from "../Pages/Login/Login";
import Users from "../Pages/Users/Users";
import AppLayout from "../Layout/Layout";
import UserDetail from "../Components/Common/userDetail/UserDetail";
import Calculator from "../Pages/Calculator/Calculator";
import AddCalculator from "../Components/Common/AddCalculator/AddCalculator";
import Notification from "../Pages/Notification/Notification";
import AddNotification from "../Components/AddNotification/AddNotification";
import Requests from "../Pages/Requests/Requests";
import RequestProfile from "../Components/RequestProfile/RequestProfile";
// rest of your routes code...

const RouterConfig = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <PublicRoute>
        <Login
        // setIsAuthenticated={setIsAuthenticated}
        />
        // </PublicRoute>
      )
    },
    {
      path: "/users",
      element: (
        //<PrivateRoute>
        <AppLayout>
          <Users />
        </AppLayout>
        //</PrivateRoute>
      )
    },
    {
      path: "/request",
      element: (
        //<PrivateRoute>
        <AppLayout>
          <Requests />
        </AppLayout>
        //</PrivateRoute>
      )
    },
    {
      path: "/calculator",
      element: (
        <AppLayout>
          <Calculator />
        </AppLayout>
      )
    },
    {
      path: "/notification",
      element: (
        <AppLayout>
          <Notification />
        </AppLayout>
      )
    },
    {
      path: "/users/:id",
      element: (
        <AppLayout>
          <UserDetail />
        </AppLayout>
      )
    },
    {
      path: "/request/:id",
      element: (
        <AppLayout>
          <RequestProfile />
        </AppLayout>
      )
    },
    {
      path: "/calculator/add",
      element: (
        <AppLayout>
          <AddCalculator />
        </AppLayout>
      )
    },
    {
      path: "/notification/add",
      element: (
        <AppLayout>
          <AddNotification />
        </AppLayout>
      )
    }
  ]);

  return router;
};

export default RouterConfig;
