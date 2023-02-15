import { db } from "../../firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

// Add a new document with a generated id
export const addDirectMessage = async (
  channelId: string,
  userId: string,
  messageText: string
) => {
  const channel_collection = doc(db, "channels", channelId);

  const messageData = {
    authorId: userId,
    dateOfCreation: new Date(),
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


// creating a new Channel
export const createChannel = async (
  workspaceId: string,
  isPrivate: boolean,
  name: string
) => {
  const channel_initial_data = {
    conversations: [],
    users: [],
  };

  //  initial channel in chat Table
  const res = await addDoc(collection(db, "channels"), channel_initial_data);

  const washingtonRef = doc(db, "workspace-collection", workspaceId);

  const workspace_chennel_data = {
    id: res.id,
    isPrivate: isPrivate,
    name: name,
  };

  await updateDoc(washingtonRef, {
    channels: arrayUnion(workspace_chennel_data),
  });
};
