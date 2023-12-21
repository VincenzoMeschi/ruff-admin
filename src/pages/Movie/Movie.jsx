import AddMovie from "../../components/AddMovie/AddMovie";
import MovieList from "../../components/MovieList/MovieList";
import "./movie.scss";
import { useState } from "react";
import axios from "axios";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Loading from "../Loading/Loading";

const Movie = () => {
	const [newMovies, setNewMovies] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);

	const extractPath = (url, folderName) => {
		const domain = "https://firebasestorage.googleapis.com/v0/b/";
		const queryParamsIndex = url.indexOf("?");
		const bucketPathIndex = url.indexOf("/o/");

		if (
			url.startsWith(domain) &&
			queryParamsIndex !== -1 &&
			bucketPathIndex !== -1
		) {
			const bucketName = url.slice(domain.length, bucketPathIndex);
			let fileName = decodeURIComponent(
				url.slice(bucketPathIndex + 3, queryParamsIndex)
			);

			// Ensure 'movies/' is only added once
			const folderPath = `${folderName}/`;
			if (!fileName.startsWith(folderPath)) {
				fileName = folderPath + fileName;
			}

			return `gs://${bucketName}/${fileName}`;
		} else {
			throw new Error("Invalid Firebase Storage URL");
		}
	};

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
				`http://localhost:8080/api/movies/find/${id}`,
				config
			);
			const movieUrl = movie.data.img;
			const movieVideoUrl = movie.data.video;

			await axios.delete(
				`http://localhost:8080/api/movies/find/${id}`,
				config
			);
			setNewMovies((prevMovies) =>
				prevMovies.filter((movie) => movie._id !== id)
			);

			if (movieUrl.includes("firebasestorage")) {
				const storage = getStorage();
				const imgRef = ref(
					storage,
					extractPath(movieUrl, "movie_images")
				);
				const videoRef = ref(
					storage,
					extractPath(movieVideoUrl, "movies")
				);

				deleteObject(imgRef)
					.then(() => {
						console.log("Poster Deleted");
					})
					.catch((err) => {
						console.log(err);
					});

				deleteObject(videoRef)
					.then(() => {
						console.log("Video Deleted");
					})
					.catch((err) => {
						console.log(err);
					});
			}
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
