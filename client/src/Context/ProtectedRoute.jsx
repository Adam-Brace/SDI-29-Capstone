import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login", { replace: true });
		}
	}, [user, navigate]);

	// Only render children if user exists
	return user ? children : null;
};

export default ProtectedRoute;
