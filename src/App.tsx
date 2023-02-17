import React, { useState } from "react";

import DashBoard from "./components/dashboard";
import OnBoardingComponent from "./components/onBoarding";
import { add_workspace_to_user } from "./components/utils/backend";
import Loading from "./components/utils/Loading";

function App() {
	const [workspaceId, setWorkspaceId] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>("");
	const [toggleDashboard, setToggleDashboard] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	React.useEffect(() => {
		var query = window.location.search.substring(1);
		let workspace:any = "";
		if(query){
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if(pair[0]==="wid"){
					// console.log("pair",pair[1]);
					workspace = pair[1];
					// setWorkspaceId(wkspaceID);
					// console.log("id",typeof wkspaceID, wkspaceID);
					window.history.replaceState(null, "", window.location.pathname);
					break;
				}
			}
		}
		if (
			sessionStorage.getItem("workspaceId") &&
			sessionStorage.getItem("userId")
		) {
			if(workspace===""){
				workspace=sessionStorage.getItem("workspaceId");
			}else{
				// console.log(workspaceId);
				
				if(workspace!==null&&workspace!=="")
					sessionStorage.setItem("workspaceId",workspace);
				add_workspace_to_user(sessionStorage.getItem("userId"),workspace)

			}
			setUserId(sessionStorage.getItem("userId"));
			setWorkspaceId(workspace);
			setToggleDashboard(true);
		}
		setIsLoading(false);
	}, [workspaceId]);

	return (
		<div className="h-full">
			{isLoading === false ? (
				toggleDashboard === false ? (
					<OnBoardingComponent
						setUserId={setUserId}
						workspaceId={workspaceId}
						setWorkspaceId={setWorkspaceId}
						toggleDashboard={toggleDashboard}
						setToggleDashboard={setToggleDashboard}
					/>
				) : (
					<DashBoard
						workspaceId={workspaceId}
						userId={userId}
						setWorkspaceId={setWorkspaceId}
					/>
				)
			) : (
				<Loading />
			)}
		</div>
	);
}

export default App;
