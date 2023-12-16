import ProfilePicture from "../../assets/Example_Profile_Image.png";
import LogoutIcon from "@mui/icons-material/Logout";
import "./settingsbar.scss";
import { authLogout } from "../../auth/auth";

const Settingsbar = () => {

	const handleLogout = () => {
		authLogout();
	};


	return (
		<div className="settingsbar">
			<ul>
				<li>
					{/* Logged in user with image and name */}
					<img src={ProfilePicture} alt="profile" />
					<span>John Doe</span>
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
