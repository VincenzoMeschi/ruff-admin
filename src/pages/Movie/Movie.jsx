import AddMovie from "../../components/AddMovie/AddMovie";
import MovieList from "../../components/MovieList/MovieList";
import "./movie.scss";
import { useState } from "react";
import axios from "axios";

const Movie = () => {
	const [newMovies, setNewMovies] = useState([]);

	const handleNewMovies = (newMovie) => {
		setNewMovies(() => [newMovie]);
	}

	const handleDeleteMovie = (id) => {
		try {
			axios.delete(`http://localhost:8080/api/movies/find/${id}`, {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			});
			setNewMovies((prevMovies) =>
				prevMovies.filter((movie) => movie._id !== id)
			);
			alert(`Movie ${id} Deleted!`);
		} catch (err) {
			console.log(err.response.data);
		}
	};

	return (
		<div className="pageContainer">
			<MovieList 
			onMovieDelete={handleDeleteMovie}
			setNewMovies={handleNewMovies}
			newMovies={newMovies}
			/>
			<AddMovie onNewMovieAdded={handleNewMovies} />
		</div>
	);
};

export default Movie;
