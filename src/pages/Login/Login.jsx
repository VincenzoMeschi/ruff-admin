import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import { authLogin } from "../../auth/auth";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}>
			{"Copyright © "}
			<Link color="inherit" href="https://watchruff.com">
				Ruff
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const defaultTheme = createTheme();

export default function SignIn() {
	const [incorrectLogin, setIncorrectLogin] = useState(false);
	const [countAttempts, setCountAttemps] = useState(0);
	const [resMessage, setResMessage] = useState("");

	useEffect(() => {
		if (countAttempts > 0) {
			setTimeout(() => {
				setIncorrectLogin(false);
			}, 15000);
		}
		// clear password field & focus it
		document.getElementById("password").value = "";
		document.getElementById("password").focus();
	}, [countAttempts]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const handleCorrectLogin = (res) => {
			if (res.data.isAdmin) {
				setIncorrectLogin(false);
				window.localStorage.setItem(
					"authorization",
					"Bearer " + res.data.accessToken
				);
				window.localStorage.setItem("userId", res.data._id);
				window.location.href = "/";
			} else {
				handleIncorrectLogin({
					response: { data: "You are not an admin!" },
				});
			}
		};
		const handleIncorrectLogin = (err) => {
			setIncorrectLogin(true);
			setCountAttemps(countAttempts + 1);
			setResMessage(err.response.data);
		};

		// Check email and password in database
		authLogin(data.get("email"), data.get("password"))
			.then(handleCorrectLogin)
			.catch(handleIncorrectLogin);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Collapse in={incorrectLogin}>
							<Alert id="incorrectPassword" severity="error">
								{resMessage}{" "}
								<strong>
									{"Attempts: (" + countAttempts + ")"}
								</strong>
							</Alert>
						</Collapse>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
