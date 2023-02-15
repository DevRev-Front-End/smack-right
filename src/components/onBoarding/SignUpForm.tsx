import React, { useRef } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { doc, setDoc } from "firebase/firestore"; 

import {User} from "../../types/index";
import {db} from "../../firebaseConfig";

import logoFull from "../../assets/logos/logo-full.svg";

type prop = {
    user:User,
    setUser:React.Dispatch<React.SetStateAction<User>>
}

const SignUpForm = (props:prop) => {

    // const user = props.user;
    const phoneNumberInput:any = useRef();
    const timeZoneInput:any = useRef();

    const handleSignUp = async () =>{
        let phoneNumber = props.user.phoneNumber;
        if(phoneNumber===""||phoneNumber==null){
            phoneNumber = phoneNumberInput.current.value;
        }
        let timezone = timeZoneInput.current.value;
        console.log(phoneNumber, timezone);
        props.user.phoneNumber =phoneNumber;
        props.user.timezone = timezone;
        props.setUser(props.user)
        console.log(props.user);

        await setDoc(doc(db, "users", props.user.id), props.user);
        
        handleSignUpNavigation();
    }

    const handleSignUpNavigation = () =>{
        const setWorkspace_component = document.getElementById("setWorkspace_component");
        setWorkspace_component?.classList.toggle("hidden");
        setWorkspace_component?.classList.toggle("flex");
        console.log(setWorkspace_component);
        
        const signup_form_component = document.getElementById("signup_form_component");
        signup_form_component?.classList.toggle("hidden");
        signup_form_component?.classList.toggle("flex");
    }

    return (
        <div id="signup_form_component" className="h-screen w-screen flex-col items-center justify-between font-inter hidden">
            <div className="logo flex justify-center items-center relative w-full">
                <img src={logoFull} alt="Smack Logo" className="h-16" />
            </div>

            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-3">Add details for Sign up</h1>
                {/* <p className='text-light_text_login'>We suggest using the <strong>email address you use at work</strong></p> */}
            </div>

            <div className="email-auth flex flex-col">
                {(props.user.phoneNumber===""||props.user.phoneNumber==null)?<input type="text" name="phoneNumber" id="signup_phoneNumber" placeholder="work-phone-number" ref={phoneNumberInput} className="w-[350px] border border-[#bbbabb] p-2 rounded-md mb-5" />:""}
                <input type="text" name="timezone" id="signup_timezone" placeholder="timezone" className="w-[350px] border border-[#bbbabb] p-2 rounded-md mb-5" ref={timeZoneInput} />
                <button className="w-[350px] rounded-md bg-purple_dark p-2 text-white font-bold hover:bg-purple" onClick={()=>handleSignUp()}>Sign up</button>
            </div>

            <div className="footer pb-10 text-faded_login">
                <div className="mt-10 flex w-[350px] justify-between text-sm">
                    <a href="#">Privacy & Terms</a>
                    <a href="#">Contact Us</a>
                    <a href="#" className="flex justify-center items-center"><TfiWorld className="mr-2"/>Contact Us</a>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm