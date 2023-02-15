import { db } from "../../firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

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
    console.log("message successfully!");
  } catch (err) {
    console.error(err, "error in addDirectMessage");
  }
};
