import ProfilePicture from "../../assets/Example_Profile_Image.png";
import LogoutIcon from "@mui/icons-material/Logout";
import "./settingsbar.scss";
import Logout from "@mui/icons-material/Logout";

const Settingsbar = () => {
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
					<a href="#">Logout</a>
				</li>
			</ul>
		</div>
	);
};

export default Settingsbar;
