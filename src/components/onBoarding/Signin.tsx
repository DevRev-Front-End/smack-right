import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../firebaseConfig";
import { User } from "../../types/index";

import logoFull from "../../assets/logos/logo-full.svg";

type prop = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};

const Signin = (props: prop) => {
	const authWithGoogle = async () => {
		console.log("In auth with google");
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then((result: any) => {
				const credential: any = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;

				const user = result.user;
				let userDetails: User = {
					id: user.uid,
					name: user.displayName,
					avatar: user.photoURL,
					email: user.email,
					status: "Active",
					timezone: "",
					phoneNumber: user.phoneNumber,
					workspace: [],
					directMessages: [],
				};
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);

				const email = error.customData.email;
				console.log(email);

				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	};

	const authWithGithub = () => {
		console.log("In auth with github");
	};

	const authWithEmail = () => {
		console.log("In auth with email");
	};

	const handleOnLogin = () => {
		const signup_component = document.getElementById("signup_component");
		signup_component?.classList.toggle("hidden");
		signup_component?.classList.toggle("flex");
		const signin_component = document.getElementById("signin_component");
		signin_component?.classList.toggle("hidden");
		signin_component?.classList.toggle("flex");
		// props.setOnLogin(!props.onlogin);
	};

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
					<a href="#">Privacy & Terms</a>
					<a href="#">Contact Us</a>
					<a
						href="#"
						className="flex justify-center items-center"
					>
						<TfiWorld className="mr-2" />
						Contact Us
					</a>
				</div>
			</div>
		</div>
	);
};

export default Signin;
