import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./privateRoutes.scss";
import Loading from "../../pages/Loading/Loading";
import { useEffect, useState } from "react";
import { authGetCurrentUserInfo } from "../../auth/auth";

const PrivateRoutes = () => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = await authGetCurrentUserInfo();
			setAuth(isAuthenticated);
		};

		checkAuth();
	}, []);

	if (auth === null) {
		return <Loading />;
	}

	return auth ? (
		<>
			<Sidebar />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoutes;
