import AddList from "../../components/AddList/AddList";
import ListList from "../../components/ListList/ListList";
import "./list.scss";
import { useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

const List = () => {
	const [newLists, setNewLists] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);

	const handleNewLists = (newList) => {
		setNewLists(() => [newList]);
	};

	const handleDeleteList = (id) => {
		const config = {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		};
		try {
			setFetchingData(true);
			axios.delete(`https://api.rufftv.com/api/lists/find/${id}`, config);
			setNewLists((prevLists) =>
				prevLists.filter((list) => list._id !== id)
			);
			setFetchingData(false);
		} catch (err) {
			console.log(err.response.data);
			setFetchingData(false);
		}
	};

	if (fetchingData) {
		return <Loading />;
	}

	return (
		<div className="pageContainer">
			<ListList
				onListDelete={handleDeleteList}
				setNewLists={handleNewLists}
				newLists={newLists}
			/>
			<AddList onNewListAdded={handleNewLists} />
		</div>
	);
};

export default List;
