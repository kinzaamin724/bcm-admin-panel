import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("adminId");

    useEffect(() => {
        if (userId) {
            navigate("/users"); // Redirect to a protected route if the user is signed in
        }
    }, [userId, navigate]);

    return userId ? null : children;
}

export default PublicRoute;
