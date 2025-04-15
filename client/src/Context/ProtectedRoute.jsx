import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin }) => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			if (!user) {
				navigate("/login", { replace: true });
			}
		}, 1000);
	}, [user, navigate]);

	// Only render children
	return user && ((user && !admin) || (admin && user.permissions == "admin"))
		? children
		: null;
};

export default ProtectedRoute;
