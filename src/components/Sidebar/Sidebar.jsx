import Logobar from "../Logobar/Logobar";
import Navbar from "../Navbar/Navbar";
import Settingsbar from "../Settingsbar/Settingsbar";
import "./sidebar.scss";

const Sidebar = () => {
	


	return (
		<div className="sidebar">
			<Logobar />

			<Navbar />

			<Settingsbar />
		</div>
	);
};

export default Sidebar;
