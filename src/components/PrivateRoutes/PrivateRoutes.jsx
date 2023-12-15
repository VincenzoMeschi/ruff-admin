import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

import "./privateRoutes.scss";

const PrivateRoutes = () => {
	let auth = true;
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
