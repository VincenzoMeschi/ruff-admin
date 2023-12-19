import "./adduser.scss";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const AddUser = () => {
	const [formData, setFormData] = useState({
		profilePic: "",
		username: "",
		email: "",
		password: "",
		isAdmin: false,
	});

	const generateImage = (name) => {
		return (
			"https://ui-avatars.com/api/?size=250&background=random&name=" +
			name
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const statelessFormData = { ...formData };

		const apiCall = async (data) => {
			const baseURL = "http://localhost:8080/api/users/admin/create/user";

			const config = {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			};
			console.log(data);
			try {
				const res = await axios.post(baseURL, data, config);
				console.log(res);
				setFormData({
					profilePic: "",
					username: "",
					email: "",
					password: "",
					isAdmin: false,
				});
				alert("User Added!");
			} catch (err) {
				console.log("Error during API call: " + err);
			}
		};

		if (formData.profilePic instanceof File) {
			const file = formData.profilePic;
			const storage = getStorage();
			const storageRef = ref(storage, file.name);

			uploadBytes(storageRef, file)
				.then(() => {
					getDownloadURL(storageRef).then((url) => {
						statelessFormData.profilePic = url;
						return apiCall(statelessFormData);
					});
				})
				.catch((err) =>
					console.log("OLIVIASDASKLHNFLASUHFLAHSF" + err)
				);
		} else {
			statelessFormData.profilePic = generateImage(statelessFormData.username);
			apiCall(statelessFormData)
				.then(
					setFormData({
						profilePic: "",
						username: "",
						email: "",
						password: "",
						isAdmin: false,
					})
				)
				.then(alert("User Added!"))
				.catch((err) => console.log(err));
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

	return (
		<div className="addUserBlock">
			<h2>Add New User</h2>
			<form
				className="uploadNewUser"
				onSubmit={handleSubmit}
				encType="multipart/form-data">
				<div className="uploadUserItem">
					<label htmlFor="file">
						Image <span>optional</span>
					</label>
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
						required
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
							setFormData({ ...formData, email: e.target.value })
						}
						required
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
						required
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
						}
						required>
						<option value="false">No</option>
						<option value="true">Yes</option>
					</select>
				</div>
				<button className="uploadButton">Add User</button>
			</form>
		</div>
	);
};

export default AddUser;
