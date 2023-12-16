import axios from "axios";

export const authLogin = async (email, password) => {
	const bodyParams = {
		email: email,
		password: password,
	};

	const baseURL = "http://localhost:8080/api/auth/login";

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(baseURL, bodyParams, config);

	return res;
};

export const authLogout = () => {
	window.localStorage.removeItem("authorization");
	window.location.href = "/admin/login";
};

export const authCheck = async () => {
	try {
		console.log("TRIED");
		const response = await axios.get("http://localhost:8080/api/auth", {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		});           

		return response.status === 200;
	} catch (error) {
		console.log(error);
		return false;
	}
};
