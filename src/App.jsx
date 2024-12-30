// import { useState } from "react";
import RouterConfig from "./routes/routes";
// import "./App.css";

import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={RouterConfig()} />;
    </>
  );
}

export default App;
