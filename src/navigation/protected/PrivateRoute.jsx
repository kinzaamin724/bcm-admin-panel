import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  //   const userInfo = useSelector((state) => state.signUp?.userInfo);
  // console.log(userInfo);
  // Get the user ID from the Redux store
  const userId = localStorage.getItem("_id");
  console.log("User ID:", userId);
  // 1. if no user ID is found, redirect to /login
  useEffect(() => {
    if (!userId) navigate("/");
  }, [userId, navigate]);
  // 2. If user ID is present, allow access to the protected route
  if (userId) {
    return children;
  }
  // 3. Optionally, add a loading state or return null while the check happens
  return null;
}
export default PrivateRoute;