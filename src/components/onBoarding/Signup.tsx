import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { TfiWorld } from 'react-icons/tfi';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";
import {User} from "../../types/index";

import logoFull from "../../assets/logos/logo-full.svg";

type prop = {
    user:any,
    setUser:React.Dispatch<React.SetStateAction<any>>
}

const Signup = (props:prop) => {

    const authWithGoogle = () =>{
        console.log("In auth");
        console.log("In auth with google")
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then(async (result:any) => {
                const credential:any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);

                const user = result.user;
                console.log(user);

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    console.log("Go to Workspace",docSnap.data());
                    props.setUser(docSnap.data());
                    handleSignUpNavigation();
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
                    console.log("Go to Form", userDetails);
                    
                    handleSignUp();
                }

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                
                const email = error.customData.email;
                console.log(email);

                const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    const authWithGithub = () =>{
        console.log("In auth");
        handleSignUp();
    }

    const handleSignUp = () =>{
        const signup_form_component = document.getElementById("signup_form_component");
        signup_form_component?.classList.toggle("hidden");
        signup_form_component?.classList.toggle("flex");
        const signup_component = document.getElementById("signup_component");
        signup_component?.classList.toggle("hidden");
        signup_component?.classList.toggle("flex");
    }

    const handleOnLogin = () =>{
        // props.setOnLogin(!props.onlogin);
        const signup_component = document.getElementById("signup_component");
        signup_component?.classList.toggle("hidden");
        signup_component?.classList.toggle("flex");
        const signin_component = document.getElementById("signin_component");
        signin_component?.classList.toggle("hidden");
        signin_component?.classList.toggle("flex");
    }

    const handleSignUpNavigation = () =>{
        const setWorkspace_component = document.getElementById("setWorkspace_component");
        setWorkspace_component?.classList.toggle("hidden");
        setWorkspace_component?.classList.toggle("flex");
        console.log(setWorkspace_component);
        
        const signup_component = document.getElementById("signup_component");
        signup_component?.classList.toggle("hidden");
        signup_component?.classList.toggle("flex");
    }

    return (
        <div id="signup_component" className="h-screen w-screen flex-col items-center justify-between font-inter hidden">
            <div className="logo"><img src={logoFull} alt="Smack Logo" className="h-16" /></div>
            {/* <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-3">Sign in to Smack</h1>
            </div> */}
            <div className="auth flex flex-col justify-center items-center font-bold">
                <button 
                    className="text-google p-2 border-2 border-google rounded-md flex justify-center items-center w-[350px] hover:shadow-md" 
                    onClick={()=>authWithGoogle()}>
                        <FcGoogle className="mr-2 text-xl"/> 
                        Continue With Google
                </button>
                <button 
                    className="text-github p-2 border-2 border-github rounded-md flex justify-center items-center w-[350px] mt-5 hover:shadow-md" 
                    onClick={()=>authWithGithub()}>
                        <FaGithub className="mr-2 text-xl"/> 
                        Continue With Github
                </button>
            </div>
            <div className="footer py-10 text-faded_login">
                <div className="flex flex-col justify-center items-center">
                    <div>Already using Slack?</div>
                    <div><button className="text-auth_links text-bold" onClick={()=>handleOnLogin()}>Sign in to existing workspace</button></div>
                </div>
                <div className="mt-10 flex w-[350px] justify-between text-sm">
                    <a href="#">Privacy & Terms</a>
                    <a href="#">Contact Us</a>
                    <a href="#" className="flex justify-center items-center"><TfiWorld className="mr-2"/>Contact Us</a>
                </div>
            </div>
        </div>
    )
}

export default Signup