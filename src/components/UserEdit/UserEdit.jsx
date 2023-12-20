import "./userEdit.scss";
import { useEffect, useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
	deleteObject,
} from "firebase/storage";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const UserEdit = (props) => {
	const [formData, setFormData] = useState({
		profilePic: "",
		username: "",
		email: "",
		password: "",
		isAdmin: false,
	});
	const [fetchingData, setFetchingData] = useState(false);
	const [originalData, setOriginalData] = useState("");

	useEffect(() => {
		const apiCall = () => {
			setFetchingData(true);
			const baseURL =
				"http://localhost:8080/api/users/find/" + props.editedUser;
			const config = {
				headers: {
					authorization: localStorage.getItem("authorization"),
				},
			};
			try {
				axios
					.get(baseURL, config)
					.then((res) => {
						const fetchedData = {
							profilePic: res.data.profilePic,
							username: res.data.username,
							email: res.data.email,
							password: res.data.password,
							isAdmin: res.data.isAdmin,
						};
						setFormData(fetchedData);
						setOriginalData(fetchedData);
					})
					.then(() => setFetchingData(false));
			} catch (err) {
				setFetchingData(false);
				console.log("YOU CANT DO THAT");
			}
		};

		if (props.ready) {
			apiCall();
		}
	}, [props.editedUser, props.ready]);

	if (!props.show) {
		return null;
	}

	if (fetchingData) {
		return <Loading />;
	}

	const extractImagePath = (url) => {
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

			// Ensure 'user_images/' is only added once
			const folderPath = "user_images/";
			if (!fileName.startsWith(folderPath)) {
				fileName = folderPath + fileName;
			}

			return `gs://${bucketName}/${fileName}`;
		} else {
			throw new Error("Invalid Firebase Storage URL");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFetchingData(true);
		const statelessFormData = {};

		Object.keys(formData).forEach((key) => {
			if (formData[key] !== originalData[key]) {
				statelessFormData[key] = formData[key];
			}
		});

		const apiCall = async (data) => {
			const baseURL =
				"http://localhost:8080/api/users/" + props.editedUser;
			const config = {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			};
			console.log(data);
			try {
				axios.put(baseURL, data, config).then((res) => {
					props.setUpdatedUserInfo(res.data);
				});
				setFetchingData(false);
				alert("User Updated!");
			} catch (err) {
				setFetchingData(false);
				console.log("Error during API call: " + err);
			}
			return;
		};

		const storage = getStorage();
		if (formData.profilePic instanceof File) {
			// Get old profile pic and delete from storage
			if (!originalData.profilePic.includes("https://ui-avatars.com")) {
				const imgRef = ref(
					storage,
					extractImagePath(originalData.profilePic)
				);

				deleteObject(imgRef)
					.then(() => {
						console.log("Deleted old profile pic");
					})
					.catch((err) => {
						console.log(err);
					});
			}

			// Upload new profile pic
			const newFileName = `${
				formData.username
			}_${Date.now()}.${formData.profilePic.name.split(".").pop()}`;
			const file = formData.profilePic;
			const storageRef = ref(storage, `user_images/${newFileName}`);
			uploadBytes(storageRef, file)
				.then(() => {
					getDownloadURL(storageRef).then((url) => {
						statelessFormData.profilePic = url;
						apiCall(statelessFormData);
					});
				})
				.catch((err) => console.log(err));
		} else {
			apiCall(statelessFormData);
		}
	};

	const handleFile = (e) => {
		let file = e.target.files[0];
		const fileType = file.type;
		const fileSize = file.size;
		const validTypes = ["image/png", "image/jpg", "image/jpeg"];
		const validSize = 2000000;

		if (validTypes.includes(fileType) && fileSize < validSize) {
			setFormData({
				...formData,
				profilePic: file,
			});
		} else {
			alert("File must be png, jpg, or jpeg and under 2MB");
		}
	};

	const handleClose = () => {
		props.setShowEdit(false);

		setFormData({
			profilePic: "",
			username: "",
			email: "",
			password: "",
			isAdmin: false,
		});
		props.setReady(false);
	};

	return (
		<div className="userEditBG">
			<div className="editUserBlock">
				<div className="headerContainer">
					<h2>Edit User</h2>
					<div className="closeButton">
						<button onClick={handleClose}>X</button>
					</div>
				</div>
				<form
					className="uploadEditUser"
					onSubmit={handleSubmit}
					encType="multipart/form-data">
					<div className="uploadUserItem">
						<label htmlFor="file">Change Image</label>
						<input
							type="file"
							name="file"
							id="file"
							onChange={handleFile}
						/>
					</div>
					<div className="uploadUserItem">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="User Name"
							value={formData.username}
							onChange={(e) =>
								setFormData({
									...formData,
									username: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadUserItem">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="User Email"
							value={formData.email}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadUserItem">
						<label htmlFor="password">Password</label>
						<input
							type="text"
							name="password"
							id="password"
							placeholder="User Password"
							value={formData.password}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
						/>
					</div>
					<div className="uploadUserItem">
						<label htmlFor="isAdmin">Is Admin?</label>
						<select
							name="isAdmin"
							id="isAdmin"
							value={formData.isAdmin}
							onChange={(e) =>
								setFormData({
									...formData,
									isAdmin: e.target.value,
								})
							}>
							<option value="false">No</option>
							<option value="true">Yes</option>
						</select>
					</div>
					<button className="uploadButton">Submit Changes</button>
				</form>
			</div>
		</div>
	);
};

export default UserEdit;
