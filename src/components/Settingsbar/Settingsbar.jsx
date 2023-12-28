import LogoutIcon from "@mui/icons-material/Logout";
import "./settingsbar.scss";
import { authLogout } from "../../auth/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const Settingsbar = () => {
	const [userLoggedIn, setUserLoggedIn] = useState(null);

	useEffect(() => {
		const userId = window.localStorage.getItem("userId");
		axios
			.get("https://api.rufftv.com/api/users/find/" + userId, {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			})
			.then((res) => {
				setUserLoggedIn(res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	const handleLogout = () => {
		authLogout();
	};

	if (userLoggedIn === null) {
		return <Loading />;
	}

	return (
		<div className="settingsbar">
			<ul>
				<li>
					<img src={userLoggedIn.profilePic} alt="profile" />
					<span>{userLoggedIn.username}</span>
				</li>
				<li>
					<LogoutIcon className="icon" />
					<button onClick={handleLogout}>Logout</button>
				</li>
			</ul>
		</div>
	);
};

export default Settingsbar;
