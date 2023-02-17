import React, { useState } from "react";

import Signin from "./Signin";
import Signup from "./Signup";
import SignUpForm from "./SignUpForm";
import SetWorkspace from "./SetWorkspace";

export default function OnBoardingComponent(props: any) {
	const [user, setUser] = useState<any>({
		id: "",
		name: "",
		avatar: "",
		email: "",
		status: "Active",
		timezone: "",
		phoneNumber: "",
		workspace: [],
		directMessages: [],
	});
	const [toggleWorkspaceComponent, setToggleWorkspaceComponent] = useState<boolean>(false);

	return (
		toggleWorkspaceComponent===false?
		<div className="bg-white">
			<Signin
				user={user}
				setUser={setUser}
				setToggleWorkspaceComponent={setToggleWorkspaceComponent}
				/>
			<Signup
				user={user}
				setUser={setUser}
				setToggleWorkspaceComponent={setToggleWorkspaceComponent}
				/>
			<SignUpForm
				user={user}
				setUser={setUser}
				setToggleWorkspaceComponent={setToggleWorkspaceComponent}
			/>
		</div>:
		<div className="bg-white">
			<SetWorkspace
				user={user}
				setUser={setUser}
				setUserId={props.setUserId}
				workspaceId = {props.workspaceId}
				setWorkspaceId={props.setWorkspaceId}
				toggleDashboard={props.toggleDashboard}
				setToggleDashboard={props.setToggleDashboard}
			/>
		</div>
	);
}
