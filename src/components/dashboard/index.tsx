import React from "react";
import { BiPhoneCall, BiChevronDown } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { BsFillLockFill, BsHash } from "react-icons/bs";
import {
	BsCaretDownFill,
	BsCaretRightFill,
	BsShieldLock,
} from "react-icons/bs";

import { Workspace } from "../../types";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ChatModule from "../chatModule";
import { DmDashboard } from "./createDMDashboard";
import WorkspaceListComponent from "../workspaces";

export default function DashBoard(props: any) {
	// States
	const [workspace, setWorkspace] = React.useState<any>({
		id: "",
		name: "",
		magicLink: "",
		admins: [],
		channels: [],
		members: [],
	});
	const [user, setUser] = React.useState<any>();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [chatData, setChatData] = React.useState<any>();
	const [isChannelVisible, setIsChannelVisible] =
		React.useState<boolean>(false);
	const [isDirectMessageVisible, setIsDirectMessageVisible] =
		React.useState<boolean>(false);
	const [selectedChat, setSelectedChat] = React.useState<any>({
		name: "general",
		isPrivate: false,
		id: "sVblA0J0WXMePBS3Chy9",
	});
	const [showCreateDmDashboard, setShowCreateDmDashboard] =
		React.useState<boolean>(false);

	const fetchData = async () => {
		setIsLoading(true);
		const workSpaceRes = await getDoc(
			doc(db, "workspace-collection", props.workspaceId)
		);
		const userResponse = await getDoc(doc(db, "users", props.userId));
		setUser(userResponse.data());
		setIsLoading(false);
		setWorkspace(workSpaceRes.data());
	};

	React.useEffect(() => {
		fetchData();
	}, [props.workspaceId, props.userId]);
	const fetchChanelData = async (id: string) => {
		const unsub = onSnapshot(doc(db, "channels", id), (doc) => {
			console.log("Current data: ", doc.data());
			setChatData(doc.data());
		});
	};

	function showAddDMForm() {}

	function channelOnClick(channel: any) {
		setShowCreateDmDashboard(false);
		setSelectedChat(channel);
		fetchChanelData(channel.id);
	}

	React.useEffect(() => {
		fetchChanelData(selectedChat.id);
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className="h-full bg-black text-text_color ">
			<header className="h-[60px] w-[100%] bg-dark_header flex items-center border-b border-border_color ">
				<span className=" w-[100%] flex items-center justify-center">
					<span className="material-symbols-outlined text-[1.3rem] mr-[20px] text-white">
						schedule
					</span>
					<input
						placeholder="Search..."
						className="w-[40%] h-[30px] rounded-md bg-[#3E3D42] text-sm pl-4  "
					/>
				</span>
				<span className="absolute right-0  mr-2">
					<div className="flex flex-row items-center gap-4">
						<span className="material-symbols-outlined text-[1.5rem] text-white">
							help
						</span>
						<span>
							{user && user.avatar && (
								<img
									className="w-[30px] h-[30px] object-fit rounded-full"
									src={user.avatar}
								/>
							)}
						</span>
					</div>
				</span>
			</header>
			<section className="flex bg-chat_section_color h-[calc(100%-60px)]">
				<WorkspaceListComponent
					workspaceId={props.workspaceId}
					userId={props.userId}
					setWorkspaceId={props.setWorksapceId}
				/>
				<span className="flex flex-[0.2] bg-side_nav min-w-[250px] border-r border-border_color flex-col ">
					<div
						id="workspace-name-container"
						className="h-[50px] w-[100%] flex justify-between items-center px-3 border-b border-border_color"
					>
						<div className="flex flex-row items-center ">
							<span className="text-l font-bold ">{workspace.name}</span>
							<BiChevronDown className="text-2xl font-bold " />
						</div>
						<span className="material-symbols-outlined">add_circle</span>
					</div>
					<div id="channels-container">
						<div
							id="channel-title"
							className="mt-2"
						>
							<div className=" px-3 py-1">
								<div className="mt-[1rem] flex flex-row items-center gap-2">
									<span
										className=" p-[2px] cursor-pointer rounded hover:bg-hover_color "
										onClick={() => setIsChannelVisible(!isChannelVisible)}
									>
										{isChannelVisible ? (
											<BsCaretDownFill />
										) : (
											<BsCaretRightFill />
										)}
									</span>
									<span className="hover:bg-hover_color px-2 rounded cursor-pointer text-sm font-bold flex flex-row items-center">
										Channels
									</span>
								</div>
							</div>
						</div>
						{/* channel list  */}
						{isChannelVisible &&
							workspace.channels.map((channel: any, ind: number) => {
								return (
									<div
										id="channel-title"
										className="mt-2 cursor-pointer  "
										key={ind}
									>
										<div className=" px-3">
											<div
												className="flex flex-row items-center gap-2 py-1 hover:bg-hover_color rounded-md "
												onClick={() => {
													channelOnClick(channel);
												}}
											>
												<span className=" p-[2px]  rounded ">
													{channel.isPrivate ? (
														<BsFillLockFill className="text-sm" />
													) : (
														<BsHash className="text-xl" />
													)}
												</span>
												<span className="px-2 rounded  text-sm  ">
													{channel.name}
												</span>
											</div>
										</div>
									</div>
								);
							})}
					</div>
					<div id="direct-message-container">
						<div
							id="direct-message-title"
							className="mt-2"
						>
							<div className=" px-3 py-1">
								<div className="mt-[1rem] flex flex-row items-center gap-2">
									<span
										className=" p-[2px] cursor-pointer rounded hover:bg-hover_color"
										onClick={() =>
											setIsDirectMessageVisible(!isDirectMessageVisible)
										}
									>
										{isDirectMessageVisible ? (
											<BsCaretDownFill />
										) : (
											<BsCaretRightFill />
										)}
									</span>
									<span className="px-2 rounded cursor-pointer text-sm font-bold flex flex-row items-center justify-between w-full">
										Direct Messages{" "}
										<button
											onClick={() => {
												setShowCreateDmDashboard(!showCreateDmDashboard);
											}}
											className="flex flex-row items-center ml-[10px]"
										>
											<span className="material-symbols-outlined text-[20px]">
												add
											</span>
										</button>
									</span>
								</div>
							</div>
						</div>
					</div>
				</span>
				{/* Chat section */}
				{showCreateDmDashboard === true ? (
					<DmDashboard />
				) : (
					<span className="flex flex-col gap-[2rem] flex-[1] justify-between relative overflow-y-scroll">
						<header
							className="bg-side_nav sticky top-0 p-[0rem_2rem] w-full min-h-[50px] border-b border-border_color w-[100%] flex justify-between items-center"
							id="chat-section-header"
						>
							<div className="flex flex-row items-center gap-[5px]">
								<span>{selectedChat.name}</span>
								<BiChevronDown />
							</div>
							<span>
								<BiPhoneCall />
							</span>
						</header>
						{chatData && (
							<ChatModule
								userId={props.userId}
								channelId={selectedChat.id}
								conversations={chatData.conversations}
							/>
						)}
					</span>
				)}
			</section>
		</div>
	);
}
