import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SiteMap from "./navigation/SiteMap";  // Ensure correct import path

function App() {
  const router = createBrowserRouter(SiteMap);  // Pass SiteMap directly

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
