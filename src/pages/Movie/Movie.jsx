import AddMovie from "../../components/AddMovie/AddMovie";
import MovieList from "../../components/MovieList/MovieList";
import "./movie.scss";
import { useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

const Movie = () => {
	const [newMovies, setNewMovies] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);

	const handleNewMovies = (newMovie) => {
		setNewMovies(() => [newMovie]);
	};

	const handleDeleteMovie = async (id) => {
		const config = {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		};

		try {
			setFetchingData(true);
			const movie = await axios.get(
				`https://api.rufftv.com/api/movies/find/${id}`,
				config
			);
			const movieUrl = movie.data.img;
			const movieVideoUrl = movie.data.video;

			await axios.delete(
				`https://api.rufftv.com/api/movies/find/${id}`,
				config
			);
			setNewMovies((prevMovies) =>
				prevMovies.filter((movie) => movie._id !== id)
			);

			const movieImgPathIndex = movieUrl.lastIndexOf("/");
			const deleteMovieImgURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/delete/movie_posters/${movieUrl.substr(
					movieImgPathIndex + 1
				)}`,
				{
					headers: {
						authorization:
							window.localStorage.getItem("authorization"),
					},
				}
			);

			await axios.delete(deleteMovieImgURL, {
				headers: {
					"Content-Type": "application/json",
					"authorization":
						window.localStorage.getItem("authorization"),
				},
			});

			// Delete Movie video from S3
			const moviePathIndex = movieVideoUrl.lastIndexOf("/");
			const deleteMoviesURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/delete/movies/${movieVideoUrl.substr(
					moviePathIndex + 1
				)}`,
				{
					headers: {
						authorization:
							window.localStorage.getItem("authorization"),
					},
				}
			);

			await axios.delete(deleteMoviesURL, {
				headers: {
					"Content-Type": "application/json",
					"authorization":
						window.localStorage.getItem("authorization"),
				},
			});
			setFetchingData(false);
			alert(`Movie ${id} Deleted!`);
		} catch (err) {
			setFetchingData(false);
			console.log(err.response.data);
		}
	};

	if (fetchingData) {
		return <Loading />;
	}

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
