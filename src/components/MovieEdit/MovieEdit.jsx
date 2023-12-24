import "./movieEdit.scss";
import { useEffect, useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
	deleteObject,
} from "firebase/storage";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const MovieEdit = (props) => {
	const [formData, setFormData] = useState({
		img: "",
		video: "",
		title: "",
		desc: "",
		preview: "",
		year: "",
		genre: "",
		limit: "",
		isSeries: false,
	});
	const [fetchingData, setFetchingData] = useState(false);
	const [originalData, setOriginalData] = useState("");

	useEffect(() => {
		const apiCall = () => {
			setFetchingData(true);
			const baseURL =
				"http://localhost:8080/api/movies/find/" + props.editedMovie;
			const config = {
				headers: {
					authorization: localStorage.getItem("authorization"),
				},
			};
			try {
				axios
					.get(baseURL, config)
					.then((res) => {
						const fetchedData = {
							img: res.data.img,
							video: res.data.video,
							title: res.data.title,
							desc: res.data.desc,
							preview: res.data.preview,
							year: res.data.year,
							genre: res.data.genre,
							limit: res.data.limit,
							isSeries: res.data.isSeries,
						};
						setFormData(fetchedData);
						setOriginalData(fetchedData);
					})
					.then(() => setFetchingData(false));
			} catch (err) {
				setFetchingData(false);
				console.log("YOU CANT DO THAT");
			}
		};

		if (props.ready) {
			apiCall();
		}
	}, [props.editedMovie, props.ready]);

	if (!props.show) {
		return null;
	}

	if (fetchingData) {
		return <Loading />;
	}

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFetchingData(true);

		const statelessFormData = {};

		Object.keys(formData).forEach((key) => {
			if (formData[key] !== originalData[key]) {
				statelessFormData[key] = formData[key];
			}
		});

		const apiCall = async (data) => {
			const config = {
				headers: {
					authorization: localStorage.getItem("authorization"),
				},
			};
			const baseURL =
				"http://localhost:8080/api/movies/find/" + props.editedMovie;
			console.log(data);
			try {
				axios.put(baseURL, data, config).then((res) => {
					setFetchingData(false);
					props.setUpdatedMovieInfo(res.data);
				});
				alert("Movie Updated!");
			} catch (err) {
				setFetchingData(false);
				console.log("Error during API call: " + err);
			}
			return;
		};

		const storage = getStorage();

		if (formData.img instanceof File) {
			if (
				!originalData.img.includes(
					"https://firebasestorage.googleapis.com/v0/b/ruff-3fe3b.appspot.com/o/movie_posters%2FUnknown_Movie.png?alt=media&token=de715e3e-0cf2-4df5-9553-d9466172d8b4"
				)
			) {
				const imgRef = ref(
					storage,
					extractPath(originalData.img, "movie_posters")
				);

				deleteObject(imgRef)
					.then(() => {
						console.log("Poster Deleted");
					})
					.catch((err) => {
						console.log(err);
					});
			}

			// upload new poster
			const newFileName = `${
				formData.title
			}_${Date.now()}.${formData.img.name.split(".").pop()}`;
			const file = formData.img;
			const storageRef = ref(storage, `movie_posters/${newFileName}`);
			uploadBytes(storageRef, file)
				.then(() => {
					getDownloadURL(storageRef).then((url) => {
						statelessFormData.img = url;
						apiCall(statelessFormData);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			apiCall(statelessFormData);
		}

		if (formData.video instanceof File) {
			const videoRef = ref(
				storage,
				extractPath(originalData.video, "movies")
			);

			deleteObject(videoRef)
				.then(() => {
					console.log("Video Deleted");
				})
				.catch((err) => {
					console.log(err);
				});

			// upload new video
			const newFileName = `${
				formData.title
			}_${Date.now()}.${formData.video.name.split(".").pop()}`;
			const file = formData.video;
			const storageRef = ref(storage, `movies/${newFileName}`);
			uploadBytes(storageRef, file)
				.then(() => {
					getDownloadURL(storageRef).then((url) => {
						statelessFormData.video = url;
						apiCall(statelessFormData);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			apiCall(statelessFormData);
		}

		if (formData.preview instanceof File) {
			const previewRef = ref(
				storage,
				extractPath(originalData.preview, "previews")
			);

			deleteObject(previewRef)
				.then(() => {
					console.log("Preview Deleted");
				})
				.catch((err) => {
					console.log(err);
				});

			// upload new preview
			const newFileName = `${
				formData.title
			}_${Date.now()}.${formData.preview.name.split(".").pop()}`;
			const file = formData.preview;
			const storageRef = ref(storage, `previews/${newFileName}`);
			uploadBytes(storageRef, file)
				.then(() => {
					getDownloadURL(storageRef).then((url) => {
						statelessFormData.preview = url;
						apiCall(statelessFormData);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleFile = (e) => {
		let file = e.target.files[0];
		const fileType = file.type;
		const fileSize = file.size;
		const validTypes = ["image/png", "image/jpg", "image/jpeg"];
		const validSize = 2000000;

		if (validTypes.includes(fileType) && fileSize < validSize) {
			setFormData({
				...formData,
				img: file,
			});
		} else {
			alert("File must be png, jpg, or jpeg and under 2MB");
		}
	};

	const handleVideo = (e) => {
		let file = e.target.files[0];
		const fileType = file.type;
		const fileSize = file.size;
		const validTypes = ["video/mp4"];
		const validSize = 50000000;

		if (validTypes.includes(fileType) && fileSize < validSize) {
			setFormData({
				...formData,
				video: file,
			});
		} else {
			alert("File must be .mp4 and under 50MB");
		}
	};

	const handlePreview = (e) => {
		let file = e.target.files[0];
		const fileType = file.type;
		const fileSize = file.size;
		const validTypes = ["video/mp4"];
		const validSize = 50000000;

		if (validTypes.includes(fileType) && fileSize < validSize) {
			setFormData({
				...formData,
				preview: file,
			});
		} else {
			alert("File must be .mp4 and under 50MB");
		}
	};

	const handleClose = () => {
		props.setShowEdit(false);

		setFormData({
			img: "",
			video: "",
			title: "",
			desc: "",
			preview: "",
			year: "",
			genre: "",
			limit: "",
			isSeries: false,
		});
		props.setReady(false);
	};

	return (
		<div className="movieEditBG">
			<div className="editMovieBlock">
				<div className="headerContainer">
					<h2>Add New Movie</h2>
					<div className="closeButton">
						<button onClick={handleClose}>X</button>
					</div>
				</div>
				<form
					className="uploadEditMovie"
					onSubmit={handleSubmit}
					encType="multipart/form-data">
					<div className="uploadMovieItem">
						<label htmlFor="file">Image</label>
						<input
							type="file"
							name="file"
							id="file"
							onChange={handleFile}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="video">Video</label>
						<input
							type="file"
							name="video"
							id="video"
							onChange={handleVideo}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="preview">Preview</label>
						<input
							type="file"
							name="preview"
							id="preview"
							onChange={handlePreview}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Movie Title"
							value={formData.title}
							onChange={(e) =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="desc">Description</label>
						<textarea
							type="text"
							name="desc"
							id="desc"
							placeholder="Movie Description"
							value={formData.desc}
							onChange={(e) =>
								setFormData({
									...formData,
									desc: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="year">Year</label>
						<input
							type="text"
							name="year"
							id="year"
							placeholder="Movie Year"
							value={formData.year}
							onChange={(e) =>
								setFormData({
									...formData,
									year: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="genre">Genre</label>
						<input
							type="text"
							name="genre"
							id="genre"
							placeholder="Movie Genre"
							value={formData.genre}
							onChange={(e) =>
								setFormData({
									...formData,
									genre: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="limit">Limit</label>
						<input
							type="text"
							name="limit"
							id="limit"
							placeholder="Movie Limit"
							value={formData.limit}
							onChange={(e) =>
								setFormData({
									...formData,
									limit: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadMovieItem">
						<label htmlFor="isSeries">Is Series?</label>
						<select
							name="isSeries"
							id="isSeries"
							value={formData.isSeries}
							onChange={(e) =>
								setFormData({
									...formData,
									isSeries: e.target.value,
								})
							}>
							<option value="false">No</option>
							<option value="true">Yes</option>
						</select>
					</div>
					<button className="uploadButton">Submit Changes</button>
				</form>
			</div>
		</div>
	);
};

export default MovieEdit;
