import UserListItem from "../UserListItem/UserListItem";
import "./userlist.scss";
// import users from "../../data/userlist";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/api/users";

const config = {
	headers: {
		authorization: window.localStorage.getItem("authorization"),
	},
};

const UserList = () => {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await axios.get(baseURL, config);
				setUsers(res.data);
			} catch (err) {
				console.log(err.response.data);
			}
		};
		getUsers();
	}, []);

	return (
		<div className="userList">
			<h2>Listed Users</h2>
			<ul>
				{users ? (
					users.map((users) => (
						<UserListItem
							key={users._id}
							img={users.profilePic}
							username={users.username}
						/>
					))
				) : (
					<h3>Add some users to get started!</h3>
				)}
			</ul>
		</div>
	);
};

export default UserList;
