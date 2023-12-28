import axios from "axios";

export const authLogin = async (email, password) => {
	const bodyParams = {
		email: email,
		password: password,
	};

	const baseURL = "https://api.rufftv.com/api/auth/login";

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
	window.location.href = "/login";
};

export const authGetCurrentUserInfo = async () => {
	try {
		const response = await axios.get("https://api.rufftv.com/api/auth", {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		});

		// deconstruct password from response
		const { password, ...data } = response.data;

		return data;
	} catch (error) {
		console.log(error);
		return false;
	}
};
