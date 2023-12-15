import "./movielist.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import movies from "../../data/movielist";

// {
// 		_id: { type: String },
// 		title: { type: String, required: true, unique: true },
// 		desc: { type: String },
// 		img: { type: String },
// 		imgTitle: { type: String },
// 		imgSm: { type: String },
// 		trailer: { type: String },
// 		video: { type: String },
// 		year: { type: String },
// 		limit: { type: String },
// 		genere: { type: String },
// 		isSeries: { type: Boolean, default: false },
// 	},

const MovieList = () => {
	return (
		<div className="movielist">
			<h2>Listed Movies</h2>
			<ul>
				{movies ? (
					movies.map((movie) => (
						<MovieListItem
							key={movie._id}
							img={movie.img}
							title={movie.title}
						/>
					))
				) : (
					<h3>Add some movies to get started!</h3>
				)}
			</ul>
		</div>
	);
};

export default MovieList;
