import "./addmovie.scss";
const AddMovie = () => {
	return <div className="addMovieBlock">
		<h2>Add New Movie</h2>
		<form action="#" className="uploadNewMovie">
			<div className="uploadMovieItem">
				<label htmlFor="file">Image</label>
				<input type="file" name="file" id="file" />
			</div>
			<div className="uploadMovieItem">
				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" placeholder="Movie Title" />
			</div>
			<div className="uploadMovieItem">
				<label htmlFor="desc">Description</label>
				<textarea type="text" name="desc" id="desc" placeholder="Movie Description" />
			</div>
			<div className="uploadMovieItem">
				<label htmlFor="year">Year</label>
				<input type="text" name="year" id="year" placeholder="Movie Year" />
			</div>
			<div className="uploadMovieItem">
				<label htmlFor="genre">Genre</label>
				<input type="text" name="genre" id="genre" placeholder="Movie Genre" />
			</div>
			<div className="uploadMovieItem">
				<label htmlFor="limit">Limit</label>
				<input type="text" name="limit" id="limit" placeholder="Movie Limit" />
			</div>
			<div className="uploadMovieItem">
				<label htmlFor="isSeries">Is Series?</label>
				<select name="isSeries" id="isSeries">
					<option value="false">No</option>
					<option value="true">Yes</option>
				</select>
			</div>
			<button className="uploadButton">Upload</button>
		</form>
	</div>;
};

export default AddMovie;
