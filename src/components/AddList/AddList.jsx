import "./addlist.scss";
import movies from "../../data/movielist";

// const ListSchema = new mongoose.Schema(
// 	{
// 		title: { type: String, required: true, unique: true },
// 		type: { type: String },
// 		genere: { type: String },
// 		content: { type: Array },
// 	},
// 	{ timestamps: true }
// );

const AddList = () => {
	const generes = [
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

	return (
		<div className="addListBlock">
			<h2>Add New List</h2>
			<form action="#" className="uploadNewList">
				<div className="uploadListItem">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="List Title"
					/>
				</div>
				<div className="uploadListItem">
					<label htmlFor="type">Type</label>
					<select name="type" id="type">
						<option value="movie">Movie</option>
						<option value="series">Series</option>
					</select>
				</div>
				<div className="uploadListItem">
					<label htmlFor="genre">Genre</label>
					<select name="genre" id="genre">
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
					<select name="content" id="content" multiple>
						{movies.map((movie, index) => {
							return (
								<option value={movie.title} key={index}>
									{movie.title}
								</option>
							);
						})}
					</select>
					<button className="uploadButton">Add List</button>
				</div>
			</form>
		</div>
	);
};

export default AddList;
