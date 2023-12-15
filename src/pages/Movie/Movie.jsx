import AddMovie from "../../components/AddMovie/AddMovie";
import MovieList from "../../components/MovieList/MovieList";

import "./movie.scss";

const Movie = () => {
	return (
		<div className="pageContainer">
			<MovieList />
			<AddMovie />
		</div>
	);
};

export default Movie;
