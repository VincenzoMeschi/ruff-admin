import "./adduser.scss";
import { useState } from "react";



const AddUser = () => {
	const [formData, setFormData] = useState({
		file: null,
		username: "",
		email: "",
		password: "",
		isAdmin: false,
	});


	const handleSubmit = (e) => {
		e.preventDefault();
	}


	return (
		<div className="addUserBlock">
			<h2>Add New User</h2>
			<form action="#" className="uploadNewUser">
				<div className="uploadUserItem">
					<label htmlFor="file">Image</label>
					<input type="file" name="file" id="file" />
				</div>
				<div className="uploadUserItem">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						placeholder="User Name"
					/>
				</div>
				<div className="uploadUserItem">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="User Email"
					/>
				</div>
				<div className="uploadUserItem">
					<label htmlFor="password">Password</label>
					<input
						type="text"
						name="password"
						id="password"
						placeholder="User Password"
					/>
				</div>
				<div className="uploadUserItem">
					<label htmlFor="isAdmin">Is Admin?</label>
					<select name="isAdmin" id="isAdmin">
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
