import { db } from "../../firebaseConfig";
import {
	doc,
	updateDoc,
	arrayUnion,
	addDoc,
	collection,
	query,
	where,
	getDocs,
	getDoc,
} from "firebase/firestore";

// function creates a new Channel
export const create_channel = async (
	workspaceId: string,
	isPrivate: boolean,
	name: string,
	usersEmail: string[]
) => {
	const channel_ref = collection(db, "channels");
	const user_ref = collection(db, "users");

	const get_user_ids = query(user_ref, where("email", "in", usersEmail));
	const querySnapshot = await getDocs(get_user_ids);

	let userIds: string[] = [];
	querySnapshot.forEach((doc) => {
		userIds.push(doc.id);
	});

	const channel_initial_data = {
		conversations: [],
		users: userIds,
	};

	//  initialling channel in channel Table
	const res = await addDoc(channel_ref, channel_initial_data);

	//  updating channel in respective workspace table
	const wrokspace_ref = doc(db, "workspace-collection", workspaceId);
	const workspace_chennel_data = {
		id: res.id,
		isPrivate: isPrivate,
		name: name,
	};
	await updateDoc(wrokspace_ref, {
		channels: arrayUnion(workspace_chennel_data),
	});
};

// functions accept channels Id and returns the respctive users Details
export const get_user_details_in_channel = async (channelId: string) => {
	const docRef = doc(db, "channels", channelId);
	const docSnap = await getDoc(docRef);
	let user_data: any = [];
	if (docSnap.exists()) {
		// getting all usersId in the channel table
		let usersIds = docSnap.data().users;
		console.log(usersIds);
		const user_ref = collection(db, "users");

		const get_user_ids = query(user_ref, where("id", "in", usersIds));
		// getting all users Details using userId in
		const querySnapshot = await getDocs(get_user_ids);

		querySnapshot.forEach((doc) => {
			user_data.push({
				avatar: doc.data().avatar,
				name: doc.data().name,
				status: doc.data().status,
			});
		});

		return user_data;
	} else {
		console.log("No such document!");
	}
};

// function allow users to send messages in smack channel
export const send_message_in_channel = async (
	channelId: string,
	userId: string,
	messageText: string
) => {
	const channel_collection = doc(db, "channels", channelId);

	let date = new Date();
	const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
		.getHours()
		.toString()
		.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
		.getSeconds()
		.toString()
		.padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;

	const messageData = {
		authorId: userId,
		dateOfCreation: formattedDate,
		message: messageText,
		reactions: [],
		threads: [],
	};

	try {
		const res = await updateDoc(channel_collection, {
			conversations: arrayUnion(messageData),
		});
		console.log("message sent successfully!");
	} catch (err) {
		console.error(err, "error in addDirectMessage");
	}
};

// function creates direct message
export const create_direct_message = async (user1: string, user2: string) => {
	const dms_ref = collection(db, "dms");
	const dms_initial_data = {
		conversations: [],
		members: [user1, user2],
	};
};
