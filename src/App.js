import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";

import "./App.scss";
import User from "./pages/User/User";
import Movie from "./pages/Movie/Movie";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";

function App() {
	return (
		<div className="App">
			<Router basename="/admin">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<User />} />
						<Route path="/users" element={<User />} />
						<Route path="/movies" element={<Movie />} />
						<Route path="/lists" element={<List />} />
					</Route>
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
