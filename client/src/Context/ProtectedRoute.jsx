import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin }) => {
	const { user, loading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !user) {
			navigate("/login", { replace: true });
		}
	}, [user, loading, navigate]);

	if (loading) return <div>Loading...</div>;

	// Only render children
	return user && ((user && !admin) || (admin && user.permissions == "admin"))
		? children
		: null;
};

export default ProtectedRoute;
