import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/Router";

function App() {
  useEffect(() => {

    localStorage.removeItem("_id");
    localStorage.removeItem("token"); // Also clear the token if used
    

   

  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
