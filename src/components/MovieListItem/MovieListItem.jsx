import "./movielistitem.scss";
import placeholder from "../../assets/Unknown_Movie.png";

// Take a image url and movie title and id in as props, and display them in a list item
const MovieListItem = ({ img, title, key }) => {
	const handleImageError = (e) => {
		e.target.src = placeholder;
	};
	return (
		<li className="movieListItem" key={key}>
			<img src={img} onError={handleImageError} alt="" />
			<h3>{title}</h3>
			<div className="modifyButtons">
				<button className="edit">Edit</button>
				<button className="delete">Delete</button>
			</div>
		</li>
	);
};

export default MovieListItem;
