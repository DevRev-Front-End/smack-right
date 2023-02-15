import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

import { Message, User } from "../../types";
import { db } from "../../firebaseConfig";

type SingleMessageProps = {
	messageData: Message;
	currentDate: string;
	setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
};
export default function SingleMessage(props: any) {
	const { messageData, currentDate, setCurrentDate } = props;

	const [user, setUser] = useState<any>();
	const [isDateChanged, setIsDateChanged] = useState<boolean>(false);

	const fetchData = async (userId: string) => {
		const userResponse = await getDoc(doc(db, "users", userId));
		setUser(userResponse.data());
	};

	useEffect(() => {
		let userid = messageData.authorId;

		fetchData(userid);
		// setUser({
		// 	id: "123",
		// 	name: "John Doe",
		// 	avatar:
		// 		"https://i.redd.it/snoovatar/avatars/ca477838-4540-4a51-a168-04c2fbeb18e0.png",
		// 	email: "johndoe@example.com",
		// 	status: "active",
		// 	timezone: "America/Los_Angeles",
		// 	phoneNumber: "+1 (555) 123-4567",
		// 	workspace: ["workspace1", "workspace2"],
		// });
	}, []);

	return (
		<>
			{
				//isDateChanged === true && (
				// 		<div className="w-full relative flex flex-col jusity-center height-[100px]">
				// 			<span className="rounded-lg border-[1px] border-chat_module_border"></span>
				// 			<span className="absolute w-full height-[1px] bg-chat_module_border "></span>
				// 		</div>
				// 	)
			}
			<div className="w-full flex gap-[0.5rem] p-[0.5rem_2rem] bg-chat_module_bg hover:bg-chat_module_hover_bg">
				<div className="w-[3rem] h-[3rem] rounded-sm flex justify-center items-center bg-chat_module_hover_bg overflow-hidden text-chat_module_text_1 text-xl">
					<img
						className="w-[3rem] h-[3rem] object-cover"
						src={user?.avatar}
						alt={user?.name}
					/>
				</div>
				<div>
					<div className="flex gap-[1rem] items-end">
						<span className="text-chat_module_text_1 font-bold text-[15px] hover:underline hover:underline-offset-2 hover:cursor-pointer">
							{user?.name}
						</span>
						<span className="text-chat_module_text_2 text-[12px] hover:underline hover:underline-offset-2">
							{new Date(messageData.dateOfCreation).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</div>
					<div className="text-chat_module_text_1 text-[15px]">
						{messageData.message}
					</div>
				</div>
			</div>
		</>
	);
}
