import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  const userId = localStorage.getItem("_id");
  console.log("User ID:", userId);
  
  useEffect(() => {
    if (!userId) navigate("/");
  }, [userId, navigate]);
  
  if (userId) {
    return children;
  }
 
  return null;
}
export default PrivateRoute;