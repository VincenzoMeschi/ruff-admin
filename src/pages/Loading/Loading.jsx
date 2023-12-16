import "./loading.scss";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
	return (
		<Box className="loadingWrapper" sx={{ display: "flex" }}>
			<CircularProgress className="loadingIcon"/>
		</Box>
	);
};

export default Loading;
