import { useState } from "react";

import DashBoard from "./components/dashboard";
import OnBoardingComponent from "./components/onBoarding";

function App() {
	const [workspaceId, setWorksapceId] = useState<string>("");
	const [userId, setUserId] = useState<string>("");

	return (
		<div>
			<OnBoardingComponent
				setUserId={setUserId}
				setWorkspaceId={setWorksapceId}
			/>
			<DashBoard />
		</div>
	);
}

export default App;
