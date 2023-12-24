import "./logobar.scss";
import logo from "../../assets/Ruff_Logo-min.svg";

const Logobar = () => {
	return (
		<div className="logobar">
			<img src={logo} alt="" />
			<h3>Admin Dashboard</h3>
		</div>
	);
};

export default Logobar;
