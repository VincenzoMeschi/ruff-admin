import { useState } from "react";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./user.scss";
import axios from "axios";
import Loading from "../Loading/Loading";

const User = () => {
	const [newUsers, setNewUsers] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);

	if (fetchingData) {
		return <Loading />;
	}

	const handleNewUsers = (newUser) => {
		setNewUsers(() => [newUser]);
	};

	const handleDeleteUser = async (id) => {
		const config = {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		};
		try {
			setFetchingData(true);
			const user = await axios.get(
				`https://api.rufftv.com/api/users/find/${id}`,
				config
			);
			const userImgUrl = user.data.profilePic;

			await axios.delete(
				`https://api.rufftv.com/api/users/${id}`,
				config
			);
			setNewUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== id)
			);

			if (userImgUrl.includes("d34me5uwzdrtz6")) {
				// Delete User image from S3
				const userImgPathIndex = userImgUrl.lastIndexOf("/");
				const deleteUsersImgURL = await axios.get(
					`https://api.rufftv.com/api/auth/s3/delete/profile_images/${userImgUrl.substr(
						userImgPathIndex + 1
					)}`,
					{
						headers: {
							authorization:
								window.localStorage.getItem("authorization"),
						},
					}
				);

				await axios.delete(deleteUsersImgURL, {
					headers: {
						"Content-Type": "application/json",
						"authorization":
							window.localStorage.getItem("authorization"),
					},
				});
			}
			setFetchingData(false);
			alert(`User ${id} Deleted!`);
		} catch (err) {
			setFetchingData(false);
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
