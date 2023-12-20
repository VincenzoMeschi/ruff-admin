import { useState } from "react";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./user.scss";
import axios from "axios";

const User = () => {
	const [newUsers, setNewUsers] = useState([]);

	const handleNewUsers = (newUser) => {
		setNewUsers(() => [newUser]);
	};

	const handleDeleteUser = (id) => {
		try {
			axios.delete(`http://localhost:8080/api/users/${id}`, {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			});
			setNewUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== id)
			);
			alert(`User ${id} Deleted!`);
		} catch (err) {
			console.log(err.response.data);
		}
	};

	return (
		<div className="pageContainer">
			<UserList
				newUsers={newUsers}
				onUserDelete={handleDeleteUser}
				setNewUsers={handleNewUsers}
			/>
			<AddUser onNewUserAdded={handleNewUsers} />
		</div>
	);
};

export default User;
