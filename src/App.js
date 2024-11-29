import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/Router";

function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
