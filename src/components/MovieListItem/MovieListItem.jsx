import "./movielistitem.scss";

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
		e.target.src =
			"https://firebasestorage.googleapis.com/v0/b/ruff-3fe3b.appspot.com/o/movie_posters%2FUnknown_Movie.png?alt=media&token=de715e3e-0cf2-4df5-9553-d9466172d8b4";
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
