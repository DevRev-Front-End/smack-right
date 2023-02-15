// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD8k7fv3CpavD_hU_Qq52epB1ZG4uH-DuQ",
	authDomain: "smack-application.firebaseapp.com",
	databaseURL: "https://smack-application-default-rtdb.firebaseio.com",
	projectId: "smack-application",
	storageBucket: "smack-application.appspot.com",
	messagingSenderId: "87070541511",
	appId: "1:87070541511:web:36b159f0d18b84aee8e0e2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
