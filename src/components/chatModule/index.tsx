import React, { useState, useEffect } from "react";

import { Message } from "../../types";

import Editor from "./editor";
import SingleMessage from "./singleMessage";

type ChatModuleType = { messageData: any };

export default function ChatModule(props: any) {
	const [currentDate, setCurrentDate] = useState("");

	useEffect(() => {
		console.log("Props: ", props.conversations[0].dateOfCreation);
		if (props.conversations[0].dateOfCreation) {
			let currentDate = new Date(
				props.conversations[0].dateOfCreation
			).toLocaleDateString();

			setCurrentDate(currentDate);
		}
	}, []);

	return (
		<div className="w-full">
			{props.conversations.map((message: any, index: number) => {
				return (
					<SingleMessage
						key={index}
						messageIndex={index}
						messageData={message}
						currentDate={currentDate}
						setCurrentDate={setCurrentDate}
					/>
				);
			})}
			<Editor
				channelId={props.channelId}
				userId={props.userId}
			/>
		</div>
	);
}
