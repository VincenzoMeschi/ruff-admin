import "./listlistitem.scss";
import unknownMovie from "../../assets/Unknown_Movie.png";

const ListListItem = (props) => {
	const handleImageError = (e) => {
		e.target.src = unknownMovie;
	};

	const handleEdit = () => {
		props.setShowEdit(true);
		props.setEditedList(props.id);
		props.setReady(true);
	};

	const handleDelete = () => {
		props.onListDelete(props.id);
		props.setDeletedList(props.id);
	};

	return (
		<li className="listListItem">
			<h3>{props.listtitle}</h3>
			<ul>
				{props.movieList.map((m) => (
					<li className="listListMovieItem" key={m._id}>
						<img src={m.img} onError={handleImageError} alt="" />
						<h5>{m.title}</h5>
					</li>
				))}
			</ul>
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

export default ListListItem;
