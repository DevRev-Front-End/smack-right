import React, { useState } from "react";
import { useQuery } from "react-query";

import DashBoard from "./components/dashboard";
import OnBoardingComponent from "./components/onBoarding";
import Loading from "./components/utils/Loading";

function App() {
	const [workspaceId, setWorksapceId] = useState<string | null>("");
	const [userId, setUserId] = useState<string | null>("");
	const [toggleDashboard, setToggleDashboard] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	React.useEffect(() => {
		var query = window.location.search.substring(1);
        console.log(query)
		if(query){
			console.log("Searching params");
			
			var vars = query.split("&");
			console.log(vars)
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				console.log(pair)
				if(pair[0]==="wid"){
					setWorksapceId(pair[1]);
					break;
				}
			}
		}
		if (
			sessionStorage.getItem("workspaceId") &&
			sessionStorage.getItem("userId")
		) {
			if(workspaceId===""){
				setWorksapceId(sessionStorage.getItem("workspaceId"));
			}
			setUserId(sessionStorage.getItem("userId"));
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
						workspaceId = {workspaceId}
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
				<Loading />
			)}
		</div>
	);
}

export default App;
