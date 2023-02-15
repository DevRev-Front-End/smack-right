import React, { useState } from "react";

import Signin from "./Signin";
import Signup from "./Signup";
import SignUpForm from "./SignUpForm";
import { User } from "../../types/index";
import SetWorkspace from "./SetWorkspace";

export default function OnBoardingComponent(props: any) {
	const [onLogin, setOnLogin] = useState<boolean>(true);
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

	return (
		<React.Fragment>
			{/* {onLogin===true?:} */}
			<Signin
				user={user}
				setUser={setUser}
			/>
			<Signup
				user={user}
				setUser={setUser}
			/>
			<SignUpForm
				user={user}
				setUser={setUser}
			/>
			<SetWorkspace
				user={user}
				setUser={setUser}
				setUserId={props.setUserId}
				setWorkspaceId={props.setWorkspaceId}
			/>
		</React.Fragment>
	);
}
