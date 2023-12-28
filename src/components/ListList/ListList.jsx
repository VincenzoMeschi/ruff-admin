import "./listlist.scss";
import ListListItem from "../ListListItem/ListListItem";
// import listdata from "../../data/listdata";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import ListEdit from "../ListEdit/ListEdit";

const baseURL = "https://api.rufftv.com/api/lists";

const config = {
	headers: {
		authorization: window.localStorage.getItem("authorization"),
	},
};

const ListList = (props) => {
	const [lists, setLists] = useState(null);
	const [allMovies, setAllMovies] = useState(null);
	const [fetchingData, setFetchingData] = useState(false);

	const [deletedList, setDeletedList] = useState(null);
	const [editedList, setEditedList] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [ready, setReady] = useState(false);
	const [updatedListInfo, setUpdatedListInfo] = useState(null);

	// Get Lists and update state
	useEffect(() => {
		const getLists = async () => {
			try {
				const res = await axios.get(baseURL, config);
				const sortedLists = res.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				setLists(sortedLists);
				setFetchingData(false);
			} catch (err) {
				setFetchingData(false);
				console.log(err.response.data);
			}
		};

		const getAllMovies = async () => {
			try {
				setFetchingData(true);
				const res = await axios.get(
					"https://api.rufftv.com/api/movies",
					config
				);
				setAllMovies(res.data);
			} catch (err) {
				setFetchingData(false);
				console.log(err.response.data);
			}
		};
		getAllMovies().then(() => {
			getLists();
		});
	}, []);

	// append props to lists
	useEffect(() => {
		if (props.newLists) {
			setLists((prevLists) => [
				...(props.newLists ?? []),
				...(prevLists ?? []),
			]);
		}
	}, [props.newLists]);

	// remove deleted list from lists
	useEffect(() => {
		if (deletedList) {
			setLists((prevLists) =>
				prevLists.filter((list) => list._id !== deletedList)
			);
		}
	}, [deletedList]);

	// update edited list in lists
	useEffect(() => {
		if (updatedListInfo) {
			setLists((prevLists) =>
				prevLists.map((list) => {
					if (list._id === updatedListInfo._id) {
						return updatedListInfo;
					}
					return list;
				})
			);
		}
	}, [updatedListInfo]);

	if (fetchingData) {
		return <Loading />;
	}

	return (
		<div className="listList">
			<h2>Listed Lists</h2>
			<ul>
				{lists ? (
					lists.map((list) => {
						let movieList = [];
						list.content.map((movieId) => {
							return allMovies.map((movie) => {
								if (movie._id === movieId) {
									return movieList.push(movie);
								}
								return null;
							});
						});
						return (
							<ListListItem
								key={list._id + "0"}
								id={list._id}
								listtitle={list.title}
								movieList={movieList}
								onListDelete={props.onListDelete}
								setDeletedList={setDeletedList}
								setShowEdit={setShowEdit}
								setReady={setReady}
								setEditedList={setEditedList}
							/>
						);
					})
				) : (
					<h3>Add some lists to get started!</h3>
				)}
			</ul>
			<ListEdit
				show={showEdit}
				setShowEdit={setShowEdit}
				ready={ready}
				editedList={editedList}
				setReady={setReady}
				setUpdatedListInfo={setUpdatedListInfo}
			/>
		</div>
	);
};

export default ListList;
