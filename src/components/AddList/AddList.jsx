import "./addlist.scss";
// import movies from "../../data/movielist";
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

const AddList = (props) => {
	const [formData, setFormData] = useState({
		title: "",
		type: "movie",
		genre: "",
		content: [],
	});

	const [movies, setMovies] = useState([]);

	const [fetchingData, setFetchingData] = useState(false);
	// get all movie objects
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

	if (fetchingData) {
		return <Loading />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const baseURL = "https://api.rufftv.com/api/lists";
		const config = {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		};
		const statelessFormData = { ...formData };
		const apiCall = async (data) => {
			try {
				setFetchingData(true);
				const res = await axios.post(baseURL, data, config);
				setFormData({
					title: "",
					type: "movie",
					genre: "",
					content: [],
				});
				setFetchingData(false);
				alert("List Added!");
				return res;
			} catch (err) {
				setFetchingData(false);
				console.log(err.response.data);
			}
		};

		apiCall(statelessFormData).then((res) => {
			props.onNewListAdded(res.data);
		});
	};

	const handleSelectedMovies = (e) => {
		const selectedIds = Array.from(e.target.selectedOptions).map(
			(option) => option.id
		);
		setFormData({
			...formData,
			content: selectedIds,
		});
	};

	return (
		<div className="addListBlock">
			<h2>Add New List</h2>
			<form
				className="uploadNewList"
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
					<label htmlFor="content">Content</label>
					<select
						name="content"
						id="content"
						value={movies.title}
						onChange={handleSelectedMovies}
						multiple>
						{movies.map((movie, index) => {
							return (
								<option
									value={movie.title}
									id={movie._id}
									key={index}>
									{movie.title}
								</option>
							);
						})}
					</select>
				</div>
				<button className="uploadButton">Add List</button>
			</form>
		</div>
	);
};

export default AddList;
