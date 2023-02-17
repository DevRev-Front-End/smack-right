import React, { useEffect, useRef, useState } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { doc, setDoc } from "firebase/firestore"; 

import {User} from "../../types/index";
import {db} from "../../firebaseConfig";

import logoFull from "../../assets/logos/logo-full.svg";
import { useQuery } from 'react-query';
import Loading from '../utils/Loading';
import { add_workspace_to_user } from '../utils/backend';

type prop = {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	setToggleWorkspaceComponent:React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm = (props:prop) => {

    const phoneNumberInput:any = useRef();
    // const timeZoneInput:any = useRef();

    const [timeZone, setTimeZone] = useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [filteredTimeZones, setFilteredTimeZones] = useState<any>([]);
    const [timeZoneInput, setTimeZoneInput] = useState<string>("");

    let timeZones:any = []


    async function fetchTimeZones(){
        setIsLoading(true);
        await fetch(`http://worldtimeapi.org/api/timezone`)
        .then((response)=>response.json())
        .then((data) => {
            setTimeZone(data)
            // timeZones= data;
            // console.log(timeZones);
            setIsLoading(false);
        });
        setIsLoading(false);
    }

    const handleSignUp = async () =>{
        let phoneNumber = props.user.phoneNumber;
        if(phoneNumber===""||phoneNumber==null){
            phoneNumber = phoneNumberInput.current.value;
        }
        let userTemp = props.user
        userTemp.phoneNumber =phoneNumber;
        userTemp.timezone = timeZoneInput;
        userTemp.workspace.push("0gl9PbsAOFYcnIeNzUwy");
        props.setUser(userTemp);

        await setDoc(doc(db, "users", props.user.id), props.user);
        handleSignUpNavigation();
    }

    const handleSignUpNavigation = () =>{
        // const setWorkspace_component = document.getElementById("setWorkspace_component");
        // setWorkspace_component?.classList.toggle("hidden");
        // setWorkspace_component?.classList.toggle("flex");
        
        // const signup_form_component = document.getElementById("signup_form_component");
        // signup_form_component?.classList.toggle("hidden");
        // signup_form_component?.classList.toggle("flex");
        props.setToggleWorkspaceComponent(true);
    }

    const handleTimeZoneChange = () => (e:React.ChangeEvent<HTMLInputElement>)=> {
        let value = e.currentTarget.value;
        
        if(value.length>0){
            timeZones = timeZone.filter((timeZone: any) => {
                if(timeZone.toLowerCase().includes(value.toLowerCase()))return timeZone;
            })
        }else{
            timeZones=[]
        }
        setTimeZoneInput(value);
        setFilteredTimeZones(timeZones);
    }

    const selectTimeZone = (timeZone:string) =>{
        setTimeZoneInput(timeZone)
        setFilteredTimeZones([]);
    }

    React.useEffect(()=>{
        fetchTimeZones();
    },[])

    if(isLoading){
        return <Loading />
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
                <input type="text" name="timezone" id="signup_timezone" placeholder="timezone" className="w-[350px] border border-[#bbbabb] p-2 rounded-md" onChange={handleTimeZoneChange()} value={timeZoneInput}/>
                {filteredTimeZones.length>0?
                    <div className="w-[350px] max-h-[120px] border border-black overflow-y-scroll">
                        {filteredTimeZones.map((timeZone:string) =>
                            <div className="p-2 w-full cursor-pointer hover:bg-gray-300" onClick={()=>selectTimeZone(timeZone)}>{timeZone}</div>
                        )}
                    </div>
                    :""}
                <button className="w-[350px] rounded-md bg-purple_dark p-2 text-white font-bold hover:bg-purple mt-5" onClick={()=>handleSignUp()}>Sign up</button>
            </div>

            <div className="footer pb-10 text-faded_login">
                <div className="mt-10 flex w-[350px] justify-between text-sm">
                    <span className="cursor-pointer">Privacy & Terms</span>
                    <span className="cursor-pointer">Contact Us</span>
                    <span className="flex justify-center items-center cursor-pointer"><TfiWorld className="mr-2"/>Contact Us</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm