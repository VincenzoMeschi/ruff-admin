import { useState } from "react";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./user.scss";
import axios from "axios";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Loading from "../Loading/Loading";

const User = () => {
	const [newUsers, setNewUsers] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);

	const extractPath = (url, folderName) => {
		const domain = "https://firebasestorage.googleapis.com/v0/b/";
		const queryParamsIndex = url.indexOf("?");
		const bucketPathIndex = url.indexOf("/o/");

		if (
			url.startsWith(domain) &&
			queryParamsIndex !== -1 &&
			bucketPathIndex !== -1
		) {
			const bucketName = url.slice(domain.length, bucketPathIndex);
			let fileName = decodeURIComponent(
				url.slice(bucketPathIndex + 3, queryParamsIndex)
			);

			// Ensure 'movies/' is only added once
			const folderPath = `${folderName}/`;
			if (!fileName.startsWith(folderPath)) {
				fileName = folderPath + fileName;
			}

			return `gs://${bucketName}/${fileName}`;
		} else {
			throw new Error("Invalid Firebase Storage URL");
		}
	};

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
				`http://localhost:8080/api/users/find/${id}`,
				config
			);
			const userImgUrl = user.data.profilePic;

			await axios.delete(`http://localhost:8080/api/users/${id}`, config);
			setNewUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== id)
			);

			if (userImgUrl.includes("firebasestorage")) {
				const storage = getStorage();
				const userRef = ref(
					storage,
					extractPath(userImgUrl, "user_images")
				);

				deleteObject(userRef)
					.then(() => {
						console.log("User Image Deleted");
					})
					.catch((err) => {
						console.log(err);
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
