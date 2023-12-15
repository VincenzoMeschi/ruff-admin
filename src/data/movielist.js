const batman = {
	Search: [
		{
			imdbID: "tt0096895",
			Title: "Batman",
			Year: "1989",
			Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_.jpg",
		},
		{
			imdbID: "tt0468569",
			Title: "The Dark Knight",
			Year: "2008",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt2975590",
			Title: "Batman v Superman: Dawn of Justice",
			Year: "2016",
			Poster: "https://ia.media-imdb.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt1345836",
			Title: "The Dark Knight Rises",
			Year: "2012",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0372784",
			Title: "Batman Begins",
			Year: "2005",
			Poster: "https://ia.media-imdb.com/images/M/MV5BYzc4ODgyZmYtMGFkZC00NGQyLWJiMDItMmFmNjJiZjcxYzVmXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt4116284",
			Title: "The LEGO Batman Movie",
			Year: "2017",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0112462",
			Title: "Batman Forever",
			Year: "1995",
			Poster: "https://ia.media-imdb.com/images/M/MV5BNWY3M2I0YzItNzA1ZS00MzE3LThlYTEtMTg2YjNiOTYzODQ1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0118688",
			Title: "Batman & Robin",
			Year: "1997",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0103776",
			Title: "Batman Returns",
			Year: "1992",
			Poster: "https://ia.media-imdb.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
	],
};

const starWars = {
	Search: [
		{
			imdbID: "tt0076759",
			Title: "Star Wars",
			Year: "1977",
			Poster: "https://ia.media-imdb.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt2527336",
			Title: "Star Wars: The Last Jedi",
			Year: "2017",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt2488496",
			Title: "Star Wars: The Force Awakens",
			Year: "2015",
			Poster: "https://ia.media-imdb.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0120915",
			Title: "Star Wars: Episode I - The Phantom Menace",
			Year: "1999",
			Poster: "https://ia.media-imdb.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt1185834",
			Title: "Star Wars: The Clone Wars",
			Year: "2008",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMTI1MDIwMTczOV5BMl5BanBnXkFtZTcwNTI4MDE3MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0080684",
			Title: "Star Wars: Episode V - The Empire Strikes Back",
			Year: "1980",
			Poster: "https://ia.media-imdb.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0121766",
			Title: "Star Wars: Episode III - Revenge of the Sith",
			Year: "2005",
			Poster: "https://ia.media-imdb.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_UY268_CR9,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0086190",
			Title: "Star Wars: Episode VI - Return of the Jedi",
			Year: "1983",
			Poster: "https://ia.media-imdb.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt0121765",
			Title: "Star Wars: Episode II - Attack of the Clones",
			Year: "2002",
			Poster: "https://ia.media-imdb.com/images/M/MV5BOWNkZmVjODAtNTFlYy00NTQwLWJhY2UtMmFmZTkyOWJmZjZiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY268_CR10,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt2275656",
			Title: "Star Wars: Threads of Destiny",
			Year: "2014",
			Poster: "https://ia.media-imdb.com/images/M/MV5BMTkwMzM2NDQ1Nl5BMl5BanBnXkFtZTgwMzAyODExMTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt6438108",
			Title: "Star Wars: Lost Horizons",
			Year: "2018",
			Poster: "https://ia.media-imdb.com/images/M/MV5BZWM3NGRkMTgtNzBmZi00YTQxLWI2NGYtOTExOTg5YWNiYWZhXkEyXkFqcGdeQXVyNzE1MTI0NjY@._V1_UY268_CR52,0,182,268_AL_.jpg",
		},
		{
			imdbID: "tt2076340",
			Title: "Star Wars: Star Warriors ",
			Year: "2007",
			Poster: "https://ia.media-imdb.com/images/M/MV5BYjUxN2EwNTEtZjEwYy00YmZiLTg4MDUtZmIxMzQ3MGZlYWU5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzAwODkyODg@._V1_UY268_CR82,0,182,268_AL_.jpg",
		},
	],
};
const batmanMovies = batman.Search.map((movie) => ({
	_id: movie.imdbID,
	title: movie.Title,
	year: movie.Year,
	img: movie.Poster,
	imgTitle: movie.Title,
	imgSm: movie.Poster, // Assuming smaller image URL is same as Poster
	trailer: "", // Placeholder as data is not available in provided object
	video: "", // Placeholder as data is not available in provided object
	limit: "", // Placeholder as data is not available in provided object
	genre: "Action", // Example genre, adjust as needed
	isSeries: false, // Assuming these are movies
}));

const starWarsMovies = starWars.Search.map((movie) => ({
	_id: movie.imdbID,
	title: movie.Title,
	year: movie.Year,
	img: movie.Poster,
	imgTitle: movie.Title,
	imgSm: movie.Poster, // Assuming smaller image URL is same as Poster
	trailer: "", // Placeholder as data is not available in provided object
	video: "", // Placeholder as data is not available in provided object
	limit: "", // Placeholder as data is not available in provided object
	genre: "Sci-Fi", // Example genre, adjust as needed
	isSeries: false, // Assuming these are movies
}));

// Combine both arrays if needed
const combinedMovies = [...batmanMovies, ...starWarsMovies];

export default combinedMovies;
