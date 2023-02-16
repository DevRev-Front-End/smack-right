import React, { useState } from "react";
import JoditEditor from "jodit-react";
import { send_message_in_channel } from "../utils/backend";

interface EditorProps {
	channelId: string;
	userId: string;
}

const Editor: React.FC<EditorProps> = ({ channelId, userId }) => {
	var messageValue = "";

	function setMessage() {
		send_message_in_channel(channelId, userId, messageValue);
	}

	const handleContentChange = (newContent: string) => {
		messageValue = newContent;
	};

	return (
		<div className="p-[1rem] pt-0 sticky bottom-0 bg-chat_module_bg">
			<JoditEditor
				value={""}
				config={{
					readonly: false,
					toolbarButtonSize: "small",
					statusbar: false,
				}}
				onChange={handleContentChange}
			/>
			<button
				className="absolute right-[1.5rem] bottom-[1.5rem]"
				onClick={() => {
					setMessage();
				}}
			>
				<span className="material-symbols-outlined">send</span>
			</button>
		</div>
	);
};

export default Editor;
