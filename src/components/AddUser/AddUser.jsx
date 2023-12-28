import "./adduser.scss";
import { useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";

const AddUser = (props) => {
	const [formData, setFormData] = useState({
		profilePic: "",
		username: "",
		email: "",
		password: "",
		isAdmin: false,
	});

	const [fetchingData, setFetchingData] = useState(false);

	const baseURL = "https://api.rufftv.com/api/users/admin/create/user";

	const generateImage = (name) => {
		return (
			"https://ui-avatars.com/api/?size=250&background=random&name=" +
			name
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFetchingData(true);
		const statelessFormData = { ...formData };

		const apiCall = async (data) => {
			const config = {
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			};
			console.log(data);
			try {
				const res = await axios.post(baseURL, data, config);
				setFormData({
					profilePic: "",
					username: "",
					email: "",
					password: "",
					isAdmin: false,
				});
				alert("User Added!");
				setFetchingData(false);
				return res;
			} catch (err) {
				setFetchingData(false);
				console.log("Error during API call: " + err);
			}
		};

		if (formData.profilePic instanceof File) {
			// Get Secure URL from Server
			const uploadURL = await axios.get(
				`https://api.rufftv.com/api/auth/s3/url/profile_images/${
					statelessFormData.username
				}.${statelessFormData.profilePic.type.split("/")[1]}`
			);
			// PUT image to S3
			await axios
				.put(uploadURL, statelessFormData.profilePic, {
					headers: {
						"Content-Type": statelessFormData.profilePic.type,
						"authorization":
							window.localStorage.getItem("authorization"),
					},
				})
				.then(() => {
					// POST new Image CDN URL to server
					statelessFormData.profilePic = `https://d34me5uwzdrtz6.cloudfront.net/profile_images/${
						statelessFormData.username
					}.${statelessFormData.profilePic.type.split("/")[1]}`;
				});

			await apiCall(statelessFormData);
		} else {
			statelessFormData.profilePic = generateImage(
				statelessFormData.username
			);
			await apiCall(statelessFormData);
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
