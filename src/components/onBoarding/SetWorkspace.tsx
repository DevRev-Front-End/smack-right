import React, { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebaseConfig";

import logoFull from "../../assets/logos/logo-full.svg";
import workspaceImg from "../../assets/images/workspace-img.png";
import { User } from "../../types";
import Loading from "../utils/Loading";

type prop = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	setUserId: React.Dispatch<React.SetStateAction<string>>;
	workspaceId:string,
	setWorkspaceId: React.Dispatch<React.SetStateAction<string>>;
	toggleDashboard: boolean;
	setToggleDashboard: React.Dispatch<React.SetStateAction<boolean>>;
};

const SetWorkspace = (props: prop) => {
	const [workspaceId, setWorkspaceId] = useState<string>(
		"0gl9PbsAOFYcnIeNzUwy"
	);
	
	const [workspace, setWorkspace] = React.useState<any>({
		id: "",
		name: "",
		magicLink: "",
		admins: [],
		channels: [],
		members: [],
	});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const fetchData = async () => {
		setIsLoading(true);
		const workSpaceRes = await getDoc(
			doc(db, "workspace-collection", workspaceId)
		);

		setIsLoading(false);
		setWorkspace(workSpaceRes.data());
	};

	function navigateToDashboard() {
		props.setUserId(props.user.id);
		props.setWorkspaceId(workspaceId);
		sessionStorage.setItem("workspaceId",workspaceId);
		sessionStorage.setItem("userId",props.user.id);
		props.setToggleDashboard(!props.toggleDashboard);
	}

	React.useEffect(() => {
		fetchData();
	}, [props.user]);

	// if (isLoading) return <Loading />;

	return (
		<div
			id="setWorkspace_component"
			className="w-screen h-screen text-red justify-between flex-col font-inter items-center hidden"
		>
			<div className="logo flex justify-center items-center relative w-full">
				<img
					src={logoFull}
					alt="Smack Logo"
					className="h-16"
				/>
			</div>

			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold mb-3">
					<span className="text-purple_dark">Welcome!</span> Stay hydrated!
				</h1>
				<p className="text-light_text_login">
					Choose a workspace below to get back to working with your team.
				</p>
			</div>

			<div className="card w-2/4 max-w-[90%] flex flex-col justify-center items-center border border-border_login rounded shadow-lg">
				<div className="header border-b border-border_login p-4 w-full text-sm">
					Workspaces for <strong>{props.user.email}</strong>
				</div>
				<div className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-hover_login hover:text-auth_links" onClick={navigateToDashboard}>
					<img
						src={workspaceImg}
						alt="Workspace"
						className="h-12"
					/>
					<div className="p-2 px-3 flex-grow font-bold">{workspace.name}</div>
					<span>
						<AiOutlineArrowRight className="font-bold text-2xl hover:text-auth_links" />
					</span>
				</div>
			</div>

			<div className="footer pb-10 text-faded_login">
				<div className="mt-10 flex w-[350px] justify-between text-sm">
					<span className="cursor-pointer">Privacy & Terms</span>
					<span className="cursor-pointer">Contact Us</span>
					<span
						className="flex justify-center items-center cursor-pointer"
					>
						<TfiWorld className="mr-2" />
						Contact Us
					</span>
				</div>
			</div>
		</div>
	);
};

export default SetWorkspace;
