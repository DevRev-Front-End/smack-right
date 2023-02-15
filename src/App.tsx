import React, { useState } from "react";

import DashBoard from "./components/dashboard";
import OnBoardingComponent from "./components/onBoarding";

function App() {
	const [workspaceId, setWorksapceId] = useState<string | null>("");
	const [userId, setUserId] = useState<string | null>("");
	const [toggleDashboard, setToggleDashboard] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	React.useEffect(() => {
		if (
			sessionStorage.getItem("workspaceId") &&
			sessionStorage.getItem("userId")
		) {
			setWorksapceId(sessionStorage.getItem("workspaceId"));
			setUserId(sessionStorage.getItem("userId"));
			setToggleDashboard(true);
		}
		setIsLoading(false);
	}, []);

	return (
		<div className="h-full">
			{isLoading === false ? (
				toggleDashboard === false ? (
					<OnBoardingComponent
						setUserId={setUserId}
						setWorkspaceId={setWorksapceId}
						toggleDashboard={toggleDashboard}
						setToggleDashboard={setToggleDashboard}
					/>
				) : (
					<DashBoard
						workspaceId={workspaceId}
						userId={userId}
					/>
				)
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default App;
