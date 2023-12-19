import LogoutIcon from "@mui/icons-material/Logout";
import "./settingsbar.scss";
import { authLogout } from "../../auth/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const Settingsbar = () => {
	const [userLoggedIn, setUserLoggedIn] = useState(null);

	useEffect(() => {
		const userId = window.localStorage.getItem("userId");
		// make get request with axios to backend and get user data using the username or email from localstorage
		// set userLoggedIn to the user data
		axios
			.get("http://localhost:8080/api/users/find/" + userId, {
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

	console.log(userLoggedIn);

	return (
		<div className="settingsbar">
			<ul>
				<li>
					{/* Logged in user with image and name */}
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
