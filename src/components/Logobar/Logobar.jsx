import "./logobar.scss";
import Logo from "../../assets/Ruff_Logo-min.svg";

const Logobar = () => {
	return (
		<div className="logobar">
			<img src={Logo} alt="" />
			<h3>Admin Dashboard</h3>
		</div>
	);
};

export default Logobar;
