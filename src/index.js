import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyDYWUx1qFR8eQHA44qDM4NpmknSppzow3M",
	authDomain: "ruff-3fe3b.firebaseapp.com",
	projectId: "ruff-3fe3b",
	storageBucket: "ruff-3fe3b.appspot.com",
	messagingSenderId: "146168459992",
	appId: "1:146168459992:web:3f181a6fc7afcb138c1dad",
	measurementId: "G-W6VSLGH8VJ",
};

try {
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	console.log("TRIED");
} catch (error) {
	console.log("FIREBASE: " + error);
}

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
