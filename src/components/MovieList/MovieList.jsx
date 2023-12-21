import "./movielist.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieEdit from "../MovieEdit/MovieEdit";
// import movies from "../../data/movielist";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const baseURL = "http://localhost:8080/api/movies";

const config = {
	headers: {
		authorization: window.localStorage.getItem("authorization"),
	},
};

const MovieList = (props) => {
	const [movies, setMovies] = useState(null);
	const [deletedMovie, setDeletedMovie] = useState(null);
	const [editedMovie, setEditedMovie] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [ready, setReady] = useState(false);
	const [updatedMovieInfo, setUpdatedMovieInfo] = useState(null);
	const [fetchingData, setFetchingData] = useState(false);

	// Get Movies and update state
	useEffect(() => {
		const getMovies = async () => {
			setFetchingData(true);
			try {
				const res = await axios.get(baseURL, config);
				setMovies(res.data);
				setFetchingData(false);
			} catch (err) {
				setFetchingData(false);
				console.log(err.response.data);
			}
		};
		getMovies();
	}, []);

	// append props to movies
	useEffect(() => {
		if (props.newMovies) {
			setMovies((prevMovies) => [
				...(props.newMovies ?? []),
				...(prevMovies ?? []),
			]);
		}
	}, [props.newMovies]);

	// remove deleted movie from movies and firebase
	useEffect(() => {
		if (deletedMovie) {
			setMovies((prevMovies) =>
				prevMovies.filter((movie) => movie._id !== deletedMovie)
			);
		}
	}, [deletedMovie]);

	// update edited movie in movies
	useEffect(() => {
		if (updatedMovieInfo) {
			setMovies((prevMovies) =>
				prevMovies.map((movie) => {
					if (movie._id === updatedMovieInfo._id) {
						return updatedMovieInfo;
					}
					return movie;
				})
			);
		}
	}, [updatedMovieInfo]);

	if (fetchingData) {
		return <Loading />;
	}

	return (
		<div className="movielist">
			<h2>Listed Movies</h2>
			<ul>
				{movies ? (
					movies.map((movie) => (
						<MovieListItem
							key={movie._id + "0"}
							id={movie._id}
							img={movie.img}
							title={movie.title}
							onMovieDelete={props.onMovieDelete}
							setDeletedMovie={setDeletedMovie}
							setShowEdit={setShowEdit}
							setReady={setReady}
							setEditedMovie={setEditedMovie}
						/>
					))
				) : (
					<h3>Add some movies to get started!</h3>
				)}
			</ul>
			<MovieEdit
				show={showEdit}
				setShowEdit={setShowEdit}
				ready={ready}
				editedMovie={editedMovie}
				setReady={setReady}
				setUpdatedMovieInfo={setUpdatedMovieInfo}
			/>
		</div>
	);
};

export default MovieList;
