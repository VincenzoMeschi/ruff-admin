import "./addmovie.scss";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const AddMovie = (props) => {
	const [formData, setFormData] = useState({
		img: "",
		video: "",
		title: "",
		desc: "",
		year: "",
		genre: "",
		limit: "",
		isSeries: false,
	});
	const [fetchingData, setFetchingData] = useState(false);

	const baseURL = "http://localhost:8080/api/movies/";

	if (fetchingData) {
		return <Loading />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFetchingData(true);

		const statelessFormData = { ...formData };

		const apiCall = async (data) => {
			const config = {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			};
			try {
				const res = await axios.post(baseURL, data, config);
				setFormData({
					img: "",
					video: "",
					title: "",
					desc: "",
					year: "",
					genre: "",
					limit: "",
					isSeries: false,
				});
				setFetchingData(false);
				alert("Movie Added!");
				return res;
			} catch (err) {
				setFetchingData(false);
				console.log("Error during API call: " + err);
			}
		};

		if (formData.img instanceof File) {
			const newFileName = `${
				formData.title
			}_${Date.now()}.${formData.img.name.split(".").pop()}`;
			const file = formData.img;
			const storage = getStorage();
			const storageRef = ref(storage, `movie_images/${newFileName}`);

			uploadBytes(storageRef, file)
				.then(() => {
					getDownloadURL(storageRef).then((url) => {
						statelessFormData.img = url;
						if (formData.video instanceof File) {
							const newFileName = `${
								formData.title
							}_${Date.now()}.${formData.video.name
								.split(".")
								.pop()}`;
							const file = formData.video;
							const storageRef2 = ref(
								storage,
								`movies/${newFileName}`
							);

							uploadBytes(storageRef2, file)
								.then(() => {
									getDownloadURL(storageRef2).then((url) => {
										statelessFormData.video = url;
										apiCall(statelessFormData).then((res) =>
											props.onNewMovieAdded(res.data)
										);
									});
								})
								.catch((err) => {
									console.log(err);
								});
						} else {
							apiCall(statelessFormData);
						}
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
			alert("Please select a valid image file (png, jpg, jpeg)");
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
			alert("Please select a valid video file (.mp4)");
		}
	};

	return (
		<div className="addMovieBlock">
			<h2>Add New Movie</h2>
			<form
				className="uploadNewMovie"
				onSubmit={handleSubmit}
				encType="multipart/form-data">
				<div className="uploadMovieItem">
					<label htmlFor="file">Poster</label>
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
				<button className="uploadButton">Add Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;
