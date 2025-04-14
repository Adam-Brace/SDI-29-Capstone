import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin }) => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login", { replace: true });
		}
	}, [user, navigate]);

	// Only render children
	return (user && !admin) || (admin && user.permissions == "admin")
		? children
		: null;
};

export default ProtectedRoute;
