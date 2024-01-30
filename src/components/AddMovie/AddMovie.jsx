import "./addmovie.scss";
import { useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const AddMovie = (props) => {
	const [formData, setFormData] = useState({
		img: "",
		video: "",
		title: "",
		desc: "",
		year: "",
		preview: "",
		genre: "",
		limit: "",
		isSeries: false,
	});
	const [fetchingData, setFetchingData] = useState(false);

	const baseURL = "https://api.rufftv.com/api/movies/";

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
					preview: "",
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
			// Get Secure URL from Server
			const uploadURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/url/movie_posters/${
					formData.title
				}.${formData.img.name.split(".")[1]}`,
				{
					headers: {
						authorization:
							window.localStorage.getItem("authorization"),
					},
				}
			);
			// Upload Image to S3
			await axios.put(uploadURL.data, formData.img, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// Update img in statelessFormData
			statelessFormData.img = `https://d34me5uwzdrtz6.cloudfront.net/movie_posters/${
				formData.title
			}.${formData.img.name.split(".")[1]}`;
		}

		if (formData.video instanceof File) {
			// Get Secure URL from Server
			const uploadURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/url/movies/${
					formData.title
				}.${formData.video.name.split(".")[1]}`,
				{
					headers: {
						authorization:
							window.localStorage.getItem("authorization"),
					},
				}
			).then((res) => {
				alert(res)
				isFetchingData(false)
			}).catch((err) => {
				alert(err)
				isFetchingData(false)
			});
			// Upload Video to S3
			await axios.put(uploadURL.data, formData.video, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}).then((res) => {
				alert(res)
				isFetchingData(false)
			}).catch((err) => {
				alert(err)
				isFetchingData(false)
			});

			// Update video in statelessFormData
			statelessFormData.video = `https://d34me5uwzdrtz6.cloudfront.net/movies/full_trailer/${
				formData.title
			}.${formData.video.name.split(".")[1]}`;
		}

		await apiCall(statelessFormData);
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
				<button className="uploadButton">Add Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;
