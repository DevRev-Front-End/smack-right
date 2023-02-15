import { useState } from "react";

import DashBoard from "./components/dashboard";
import OnBoardingComponent from "./components/onBoarding";

function App() {
	const [workspaceId, setWorksapceId] = useState<string>("");
	const [userId, setUserId] = useState<string>("");
	const [toggleDashboard, setToggleDashboard] = useState<boolean>(false)

	return (
		<div>
			{toggleDashboard===false?
				<OnBoardingComponent
					setUserId={setUserId}
					setWorkspaceId={setWorksapceId}
					toggleDashboard = {toggleDashboard}
					setToggleDashboard={setToggleDashboard}
				/>:
				<DashBoard 
					workspaceId={workspaceId}
					userId={userId}
				/>
			}
		</div>
	);
}

export default App;
