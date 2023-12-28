import "./movielistitem.scss";
import unknownMovie from "../../assets/Unknown_Movie.png";

const MovieListItem = (props) => {
	const handleEdit = () => {
		props.setShowEdit(true);
		props.setEditedMovie(props.id);
		props.setReady(true);
	};

	const handleDelete = () => {
		props.onMovieDelete(props.id);
		props.setDeletedMovie(props.id);
	};

	const handleImageError = (e) => {
		e.target.src = unknownMovie;
	};
	return (
		<li className="movieListItem">
			<img src={props.img} onError={handleImageError} alt="" />
			<h3>{props.title}</h3>
			<div className="modifyButtons">
				<button className="edit" onClick={handleEdit}>
					Edit
				</button>
				<button className="delete" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default MovieListItem;
