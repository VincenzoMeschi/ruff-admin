import movies from "../../data/movielist";
import "./listlistitem.scss";
import placeholder from "../../assets/Unknown_Movie.png";

const ListListItem = ({ listtitle, content, key }) => {
	const handleImageError = (e) => {
		e.target.src = placeholder;
	};
	const useThisList = movies.filter((m) => {
		return content.includes(m._id);
	});

	return (
		<li className="listListItem" key={key}>
			<h3>{listtitle}</h3>
			<ul>
				{useThisList.map((m) => (
					<li className="listListMovieItem">
						<img src={m.img} onError={handleImageError} alt="" />
						<h5>{m.title}</h5>
					</li>
				))}
			</ul>
			<div className="modifyButtons">
				<button className="edit">Edit</button>
				<button className="delete">Delete</button>
			</div>
		</li>
	);
};

export default ListListItem;
