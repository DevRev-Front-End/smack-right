import React, { useState } from "react";

import workspaceImg from "../../assets/images/workspace-img.png";
import { get_workspaces_from_user } from "../utils/backend";

const WorkspaceListComponent = (props: any) => {
	const [workspaceList, setWorkspaceList] = useState<any>([]);
	const [activeWorkspace, setActiveWorkspace] = useState<any>();

	const fetchData = async () => {
		setActiveWorkspace(sessionStorage.getItem("workspaceId"));
		const workspaces = await get_workspaces_from_user(props.userId);
		// console.log(workspaces);
		setWorkspaceList(workspaces);
	};

	const handleWorkspaceChange = (workSpaceSelected: any) => {
		sessionStorage.setItem("workspaceId", workSpaceSelected);
		setActiveWorkspace(workSpaceSelected);
		props.setWorkspaceId(workSpaceSelected);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="min-w-[60px] max-w-[60px] text-white flex flex-col justify-start items-center bg-side_nav border-r-[1px] border-border_color">
			{workspaceList.map((workspace: any) => (
				<button
					className={
						workspace.id === activeWorkspace
							? "rounded-xl border-4 border-workspace_module_active_border p-[1px] mt-2"
							: "rounded-xl p-[1px] mt-2"
					}
					onClick={() => handleWorkspaceChange(workspace.id)}
				>
					<img
						src={workspaceImg}
						alt={workspace.name}
						className="h-[30px] w-[30px] rounded-lg object-cover"
						title={workspace.name}
					/>
				</button>
			))}
		</div>
	);
};

export default WorkspaceListComponent;
