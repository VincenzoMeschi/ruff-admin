import "./movielist.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import movies from "../../data/movielist";


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
