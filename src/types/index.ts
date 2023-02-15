export interface Message {
	id: string;
	dateOfCreation: string;
	message: string;
	authorId: string;
	reactions: Array<Reaction>;
	threads: Array<Message>;
}

export interface UserDirectMessage {
	id: string;
	name: string;
	profile: string;
}
export interface User {
	id: string;
	name: string;
	avatar: string;
	email: string;
	status: string;
	timezone: string;
	phoneNumber: string;
	workspace: Array<string>;
	directMessages: Array<UserDirectMessage>;
}

export interface Workspace {
	id: string;
	name: string;
	magicLink: string;
	admins: Array<string>;
	channels: Array<Channel>;
	members: Array<string>;
}

export interface Reaction {
	id: string;
	reactionType: string;
	authorId: string;
}

export interface Channel {
	isPrivate: boolean;
	id: string;
	name: string;
	conversation: Array<Message>;
	dateOfCreation: string;
}

export interface UserWorkspaceData {
	workspaceId: string;
	channelId: Array<string>;
	dms: Array<Dms>;
}

export interface Dms {
	visible: boolean;
	receiverId: string;
	messages: Array<Message>;
}
