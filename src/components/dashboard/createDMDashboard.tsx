import { useState } from "react";

import { get_user_suggestions } from "../utils/backend";

const DmDashboard = () => {
	// States
	const [searchUserResult, setSearchUserResult] = useState<any>();
	const [selectedUser, setSelectedUser] = useState<any>([]);

	// Functions
	function debounceSearchUser(searchUserFunction: any, delay = 500) {
		let timer: any;
		return (...args: any) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				searchUserFunction.apply(args);
			}, delay);
		};
	}

	function selectUser(user: any) {
		let notSelected = selectedUser.reduce((acc: boolean, sUser: any) => {
			if (user.id === sUser.id) acc = acc && false;
			return acc;
		}, true);

		if (notSelected) setSelectedUser([...selectedUser, user]);
	}

	async function searchUserFunction(searchValue: any) {
		if (searchValue !== "") {
			let searchData = await get_user_suggestions(searchValue).then(
				(data:any) => data
			);
			setSearchUserResult(searchData);
		} else {
			setSearchUserResult([]);
		}
	}

	return (
		<span className="flex flex-col gap-[2rem] flex-[1] relative overflow-y-scroll">
			<div className="flex flex-col relative">
				<header
					className="bg-side_nav sticky top-0 p-[0rem_2rem] w-full min-h-[50px] border-b border-border_color w-[100%] flex justify-between items-center"
					id="chat-section-header"
				>
					<div className="flex flex-row items-center gap-[5px]">
						<span>Direct Message</span>
					</div>
				</header>
				<div className="w-full border-b-[1px] border-border_color bg-side_nav flex">
					{selectedUser.length > 0 && (
						<div className="flex items-center justify-end relative">
							{selectedUser.map((user: any, index: number) => {
								return (
									<img
										className={`w-8 h-8 rounded-full ${
											index < selectedUser.length - 1 ? "mr-[-12px]" : ""
										}`}
										key={`selcted-user-${index}`}
										src={user.avatar}
									/>
								);
							})}
						</div>
					)}
					<input
						className="h-[50px] w-full p-[1rem_2rem] bg-side_nav placeholder:text-white/30 focus:outline-none"
						placeholder="To: @someone or somebody@example.com"
						onChange={(e) => {
							debounceSearchUser(() => searchUserFunction(e.target.value))();
						}}
					/>
				</div>
				{searchUserResult && searchUserResult.length > 0 && (
					<div className="absolute top-[100px] w-full left-0 p-[2rem] pt-[0] mt-[-0.4rem]">
						<div className="bg-hover_bg border-[1px] border-border_color rounded-md bg-chat_module_bg">
							{searchUserResult.map((user: any, index: number) => {
								return (
									<button
										onClick={() => {
											selectUser(user);
										}}
										className={`w-full p-[0.9rem_1.5rem] bg- hover:bg-border_color flex gap-[0.7rem] items-center border-border_color ${
											index < searchUserResult.length - 1
												? "border-b-[1px]"
												: ""
										}`}
										key={`search-dm-user-result-${index}`}
									>
										<img
											className="w-8 h-8 rounded-md"
											src={user.avatar}
											alt={user.name}
										/>
										<p>{user.name}</p>
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</span>
	);
};

export { DmDashboard };
