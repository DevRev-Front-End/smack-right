import React, { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { collection, query, where,getDocs, doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";
import { User } from "../../types/index";

import logoFull from "../../assets/logos/logo-full.svg";

type prop = {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	setToggleWorkspaceComponent:React.Dispatch<React.SetStateAction<boolean>>;
};

const Signin = (props: prop) => {

	const emailInput:any = useRef();

	const authWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then(async(result: any) => {

				const user = result.user;
				
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    props.setUser(docSnap.data());
                    handleNavigation();
                }else{
                    let userDetails:User = {
                        id: user.uid,
                        name: user.displayName,
                        avatar: user.photoURL,
                        email: user.email,
                        status: "Active",
                        timezone: "",
                        phoneNumber: user.phoneNumber,
                        workspace: [],
                        directMessages:[]
                    };
                    props.setUser(userDetails);
                    
                    handleNavToForm();
                }
			})
			.catch((error) => {
				// const errorCode = error.code;
				const errorMessage = error.message;

				const email = error.customData.email;

				// const credential = GoogleAuthProvider.credentialFromError(error);
			});
	};

	const authWithGithub = () => {
		const provider = new GithubAuthProvider();

		signInWithPopup(auth, provider)
		.then(async (result) => {

			const user = result.user;
				
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);
			
			if (docSnap.exists()) {
				props.setUser(docSnap.data());
				handleNavigation();
			}else{
				let userDetails:any = {
					id: user.uid,
					name: user.displayName,
					avatar: user.photoURL,
					email: user.email,
					status: "Active",
					timezone: "",
					phoneNumber: user.phoneNumber,
					workspace: [],
					directMessages:[]
				};
				props.setUser(userDetails);
				
				handleNavToForm();
			}
		}).catch((error) => {
			const errorMessage = error.message;
		});
	};

	const authWithEmail = async () => {
		const email = emailInput.current.value;
		const usersRef = collection(db, "users");
		const user = query(usersRef, where("email", "==", email));
		const querySnapshot = await getDocs(user);
		let users:any =[];
		querySnapshot.forEach((doc) => {
			users.push(doc.data());
		});
		if(users.length > 0){
			props.setUser(users[0]);
			handleNavigation();
		}
	};

	const handleOnLogin = () => {
		const signup_component = document.getElementById("signup_component");
		signup_component?.classList.toggle("hidden");
		signup_component?.classList.toggle("flex");
		const signin_component = document.getElementById("signin_component");
		signin_component?.classList.toggle("hidden");
		signin_component?.classList.toggle("flex");
	};

	const handleNavToForm = () =>{
		const signup_form_component = document.getElementById("signup_form_component");
		signup_form_component?.classList.toggle("hidden");
		signup_form_component?.classList.toggle("flex");
		const signin_component = document.getElementById("signin_component");
		signin_component?.classList.toggle("hidden");
		signin_component?.classList.toggle("flex");
	}

	const handleNavigation = () =>{
		// const setWorkspace_component = document.getElementById("setWorkspace_component");
		// setWorkspace_component?.classList.toggle("hidden");
		// setWorkspace_component?.classList.toggle("flex");
		// console.log(setWorkspace_component);
		props.setToggleWorkspaceComponent(true);
		// const signin_component = document.getElementById("signin_component");
		// signin_component?.classList.toggle("hidden");
		// signin_component?.classList.toggle("flex");
	}

	return (
		<div
			id="signin_component"
			className="h-screen w-screen flex flex-col items-center justify-between font-inter"
		>
			<div className="logo flex justify-center items-center relative w-full">
				<img
					src={logoFull}
					alt="Smack Logo"
					className="h-16"
				/>
				<div className="signup absolute right-5 flex flex-col items-end text-xs text-faded_login">
					<div>New to Smack?</div>
					<div>
						<button
							className="text-auth_links text-bold"
							onClick={() => handleOnLogin()}
						>
							Create an account
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold mb-3">Sign in to Smack</h1>
				<p className="text-light_text_login">
					We suggest using the <strong>email address you use at work</strong>
				</p>
			</div>

			<div className="email-auth flex flex-col">
				<input
					type="text"
					name="email"
					id="email"
					ref={emailInput}
					placeholder="name@work-email.com"
					className="w-[350px] border border-border_login p-2 rounded-md mb-5"
				/>
				<button
					className="w-[350px] rounded-md bg-purple_dark p-2 text-white font-bold hover:bg-purple"
					onClick={() => authWithEmail()}
				>
					Sign In With Email
				</button>
			</div>

			<div className="w-[350px] flex items-center">
				<hr className="flex-grow" />
				<span className="px-3">OR</span>
				<hr className="flex-grow" />
			</div>

			<div className="auth flex flex-col justify-center items-center font-bold">
				<button
					className="text-google p-2 border-2 border-google rounded-md flex justify-center items-center w-[350px] hover:shadow-md"
					onClick={() => authWithGoogle()}
				>
					<FcGoogle className="mr-2 text-xl" />
					Continue With Google
				</button>
				<button
					className="text-github p-2 border-2 border-github rounded-md flex justify-center items-center w-[350px] hover:shadow-md mt-5"
					onClick={() => authWithGithub()}
				>
					<FaGithub className="mr-2 text-xl" />
					Continue With Github
				</button>
			</div>

			<div className="footer pb-10 text-faded_login">
				<div className="mt-10 flex w-[350px] justify-between text-sm">
					<span className="cursor-pointer">Privacy & Terms</span>
					<span className="cursor-pointer">Contact Us</span>
					<span
						className="flex justify-center items-center cursor-pointer"
					>
						<TfiWorld className="mr-2" />
						Contact Us
					</span>
				</div>
			</div>
		</div>
	);
};

export default Signin;
