import UserListItem from "../UserListItem/UserListItem";
import "./userlist.scss";
// import users from "../../data/userlist";
import { useState, useEffect } from "react";
import axios from "axios";
import UserEdit from "../UserEdit/UserEdit";
import Loading from "../../pages/Loading/Loading";

const baseURL = "http://localhost:8080/api/users";

const config = {
	headers: {
		authorization: window.localStorage.getItem("authorization"),
	},
};

const UserList = (props) => {
	const [users, setUsers] = useState(null);
	const [deletedUser, setDeletedUser] = useState(null);
	const [editedUser, setEditedUser] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [ready, setReady] = useState(false);
	const [updatedUserInfo, setUpdatedUserInfo] = useState(null);
	const [fetchingData, setFetchingData] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			try {
				setFetchingData(true);
				const res = await axios.get(baseURL, config);
				setUsers(res.data);
				setFetchingData(false);
			} catch (err) {
				console.log(err.response.data);
				setFetchingData(false);
			}
		};
		getUsers();
	}, []);

	// append props to users
	useEffect(() => {
		if (props.newUsers) {
			setUsers((prevUsers) => [
				...(prevUsers ?? []),
				...(props.newUsers ?? []),
			]);
		}
	}, [props.newUsers]);

	// remove deleted user from users
	useEffect(() => {
		if (deletedUser) {
			setUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== deletedUser)
			);
		}
	}, [deletedUser]);

	// update edited user in users
	useEffect(() => {
		if (updatedUserInfo) {
			setUsers((prevUsers) =>
				prevUsers.map((user) => {
					if (user._id === updatedUserInfo._id) {
						return updatedUserInfo;
					} else {
						return user;
					}
				})
			);
		}
	}, [updatedUserInfo]);

	if (fetchingData) {
		return <Loading />;
	}

	return (
		<div className="userList">
			<h2>Listed Users</h2>
			<ul>
				{users ? (
					users.map((users) => (
						<UserListItem
							key={users._id + "0"}
							id={users._id}
							img={users.profilePic}
							username={users.username}
							onUserDelete={props.onUserDelete}
							setDeletedUser={setDeletedUser}
							setShowEdit={setShowEdit}
							setReady={setReady}
							setEditedUser={setEditedUser}
							updatedUserInfo={updatedUserInfo}
						/>
					))
				) : (
					<h3>Add some users to get started!</h3>
				)}
			</ul>
			<UserEdit
				show={showEdit}
				setShowEdit={setShowEdit}
				ready={ready}
				editedUser={editedUser}
				setReady={setReady}
				setUpdatedUserInfo={setUpdatedUserInfo}
			/>
		</div>
	);
};

export default UserList;
