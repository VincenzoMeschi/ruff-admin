import "./navbar.scss";
import MovieIcon from "@mui/icons-material/Movie";
import GroupIcon from "@mui/icons-material/Group";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar">
			<ul>
				<li>
					<GroupIcon className="icon" />
					<Link to="/users">Users</Link>
				</li>
				<li>
					<MovieIcon className="icon" />
					<Link to="/movies">Movies</Link>
				</li>
				<li>
					<AddToPhotosIcon className="icon" />
					<Link to="/lists">Lists</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
