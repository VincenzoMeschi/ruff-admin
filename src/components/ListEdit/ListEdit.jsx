import "./listEdit.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const generes = [
	"",
	"Action",
	"Adventure",
	"Animation",
	"Comedy",
	"Crime",
	"Documentary",
	"Drama",
	"Family",
	"Fantasy",
	"History",
	"Horror",
	"Music",
	"Mystery",
	"Romance",
	"Science Fiction",
	"TV Movie",
	"Thriller",
	"War",
	"Western",
];

const ListEdit = (props) => {
	const [formData, setFormData] = useState({
		title: "",
		type: "movie",
		genre: "",
		content: [],
	});

	const [movies, setMovies] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [originalData, setOriginalData] = useState("");

	useEffect(() => {
		const config = {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		};

		const baseURL = "https://api.rufftv.com/api/movies";

		const getMovies = async () => {
			try {
				setFetchingData(true);
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

	useEffect(() => {
		const apiCall = () => {
			setFetchingData(true);
			const baseURL =
				"https://api.rufftv.com/api/lists/find/" + props.editedList;
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
							title: res.data.title,
							type: res.data.type,
							genre: res.data.genre,
							content: res.data.content,
						};
						setFormData(fetchedData);
						setOriginalData(fetchedData);
					})
					.then(() => setFetchingData(false))
					.catch((err) => console.log(err));
			} catch (err) {
				setFetchingData(false);
				console.log("YOU CANT DO THAT");
			}
		};

		if (props.ready) {
			apiCall();
		}
	}, [props.editedList, props.ready]);

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
					authorization: window.localStorage.getItem("authorization"),
				},
			};

			const baseURL =
				"https://api.rufftv.com/api/lists/" + props.editedList;
			console.log(data);
			try {
				axios.put(baseURL, data, config).then((res) => {
					setFetchingData(false);
					props.setUpdatedListInfo(res.data);
				});
				alert("List Updated!");
			} catch (err) {
				setFetchingData(false);
				console.log("Error during API call: " + err.response.data);
			}
			return;
		};

		apiCall(statelessFormData);
	};

	const handleCurrentMovies = (e) => {
		const selectedIds = Array.from(e.target.selectedOptions).map(
			(option) => option.id
		);

		const newContent = formData.content.filter((id) => {
			return !selectedIds.includes(id);
		});

		setFormData({
			...formData,
			content: newContent,
		});
	};

	const handleOtherMovies = (e) => {
		const selectedIds = Array.from(e.target.selectedOptions).map(
			(option) => option.id
		);

		const newContent = formData.content.concat(selectedIds);

		setFormData({
			...formData,
			content: newContent,
		});
	};

	const handleClose = () => {
		props.setShowEdit(false);
	};

	if (fetchingData) {
		return <Loading />;
	}

	if (!props.show) {
		return null;
	}

	return (
		<div className="listEditBG">
			<div className="editListBlock">
				<div className="headerContainer">
					<h2>Add New List</h2>
					<div className="closeButton">
						<button onClick={handleClose}>X</button>
					</div>
				</div>
				<form
					className="uploadEditList"
					onSubmit={handleSubmit}
					encType="multipart/form-data">
					<div className="uploadListItem">
						<label htmlFor="title">Title</label>
						<input
							required
							type="text"
							name="title"
							id="title"
							placeholder="List Title"
							value={formData.title}
							onChange={(e) =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadListItem">
						<label htmlFor="type">Type</label>
						<select
							required
							name="type"
							id="type"
							value={formData.type}
							onChange={(e) =>
								setFormData({
									...formData,
									type: e.target.value,
								})
							}>
							<option value="movie">Movie</option>
							<option value="series">Series</option>
						</select>
					</div>
					<div className="uploadListItem">
						<label htmlFor="genre">Genre</label>
						<select
							name="genre"
							id="genre"
							value={formData.genre}
							onChange={(e) =>
								setFormData({
									...formData,
									genre: e.target.value,
								})
							}>
							{generes.map((genere, index) => {
								return (
									<option value={genere} key={index}>
										{genere}
									</option>
								);
							})}
						</select>
					</div>
					<div className="uploadListItem">
						<label htmlFor="currentMovies">Current</label>
						<select
							name="currentMovies"
							id="currentMovies"
							value={movies.title}
							onChange={handleCurrentMovies}
							multiple>
							{movies.map((movie) => {
								let movieList = [];
								if (formData.content.includes(movie._id)) {
									movieList.push(movie);
								}
								return movieList.map((movie) => {
									return (
										<option
											value={movie.title}
											id={movie._id}
											key={movie._id}>
											{movie.title}
										</option>
									);
								});
							})}
						</select>
					</div>
					<div className="uploadListItem">
						<label htmlFor="otherMovies">Bank</label>
						<select
							name="otherMovies"
							id="otherMovies"
							value={movies.title}
							onChange={handleOtherMovies}
							multiple>
							{movies.map((movie) => {
								let movieList = [];
								if (!formData.content.includes(movie._id)) {
									movieList.push(movie);
								}
								return movieList.map((movie) => {
									return (
										<option
											value={movie.title}
											id={movie._id}
											key={movie._id}>
											{movie.title}
										</option>
									);
								});
							})}
						</select>
					</div>
					<button className="uploadButton">Submit Changes</button>
				</form>
			</div>
		</div>
	);
};

export default ListEdit;
