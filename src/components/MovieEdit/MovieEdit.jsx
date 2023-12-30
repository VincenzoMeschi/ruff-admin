import "./movieEdit.scss";
import { useEffect, useState } from "react";
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
				"https://api.rufftv.com/api/movies/find/" + props.editedMovie;
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
				"https://api.rufftv.com/api/movies/find/" + props.editedMovie;
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

		if (formData.img instanceof File) {
			// If title has changed, delete old img
			if (statelessFormData.title) {
				// get the filetype from img url (split from the last occurace of ".")
				const lastIndex = originalData.img.lastIndexOf(".");

				const deleteURL = await axios.get(
					`https://api.rufftv.com/api/auth/s3/delete/movie_posters/${originalData.img.substr(
						lastIndex + 1
					)}`
				);

				await axios.delete(deleteURL, {
					headers: {
						"Content-Type": formData.img.type,
						"authorization":
							window.localStorage.getItem("authorization"),
					},
				});
			}

			// Get Secure URL from Server

			const uploadURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/url/movie_posters/${
					formData.title
				}.${formData.img.type.split("/")[1]}`,
				{
					headers: {
						authorization:
							window.localStorage.getItem("authorization"),
					},
				}
			);

			// Upload Image to S3
			await axios.put(uploadURL, formData.img, {
				headers: {
					"Content-Type": formData.img.type,
				},
			});

			// Update img in statelessFormData
			statelessFormData.img = `https://d34me5uwzdrtz6.cloudfront.net/movie_posters/${
				formData.title
			}.${formData.img.type.split("/")[1]}`;
		}

		if (formData.video instanceof File) {
			// If title has changed, delete old video
			if (statelessFormData.title) {
				// get the filetype from video url (split from the last occurace of ".")
				const lastIndex = originalData.video.lastIndexOf(".");

				const deleteURL = await axios.get(
					`https://api.rufftv.com/api/auth/s3/delete/movies/${originalData.video.substr(
						lastIndex + 1
					)}`
				);

				await axios.delete(deleteURL, {
					headers: {
						"Content-Type": formData.video.type,
						"authorization":
							window.localStorage.getItem("authorization"),
					},
				});
			}

			// Get Secure URL from Server

			const uploadURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/url/movies/${
					formData.title
				}.${formData.video.type.split("/")[1]}`
			);

			// Upload Image to S3
			await axios.put(uploadURL, formData.video, {
				headers: {
					"Content-Type": formData.video.type,
					"authorization":
						window.localStorage.getItem("authorization"),
				},
			});

			// Update video in statelessFormData
			statelessFormData.video = `https://d34me5uwzdrtz6.cloudfront.net/movies/full_trailer/${
				formData.title
			}.${formData.video.type.split("/")[1]}`;
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
