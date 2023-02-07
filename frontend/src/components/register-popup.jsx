import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";

import { createClient } from "@supabase/supabase-js";
import useUserContext from "../context/user.context";
import { Navigate } from "react-router-dom";

import FormInput from "./form-input";

// Creating a client for Supabase using the URL and anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RegisterPopup = ({ handleClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const { login } = useUserContext();

    // function to handle the registration of a new user
    const Register = async (event) => {
        event.preventDefault();

        if (firstName === "" || lastName === "") {
            toast.error("Please enter first and last name");
        } else if (email === "") {
            toast.error("Please enter an email address");
        } else if (password !== confirmPassword) {
            toast.error("Password fields do not match");
        } else {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
            } else {
                console.log(data);
                login(email, firstName, lastName);
                setIsSignedIn(true);
            }
        }
    };

    // function to handle the login of an existing user
    if (isSignedIn) {
        return <Navigate to={{ pathname: "/profile" }} />;
    }

    function changeFirstName(event) {
        setFirstName(event.target.value);
    }

    function changeLastName(event) {
        setLastName(event.target.value);
    }

    function changeEmail(event) {
        setEmail(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    function changeConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }

    return (
        <div className="fixed bg-slate-300 bg-opacity-50 w-screen h-screen top-0 left-0 flex justify-center items-center">
            <form
                onSubmit={Register}
                className="relative w-[550px] min-h-[500px] max-h-[800px] bg-white rounded-xl shadow-standard p-10 flex flex-col gap-8"
            >
                <div className="absolute top-4 right-5 cursor-pointer" onClick={handleClose}>
                    <FontAwesomeIcon icon={faX} />
                </div>
                <h1 className="text-2xl font-bold">Create an account</h1>
                <div className="w-full flex flex-col items-center gap-3">
                    <div className="flex w-full justify-between">
                        <FormInput placeholder="First Name" value={firstName} onChange={changeFirstName} width={"50%"} />
                        <FormInput placeholder="Last Name" value={lastName} onChange={changeLastName} width={"50%"} />
                    </div>
                    <FormInput placeholder="Email" value={email} onChange={changeEmail} />
                    <FormInput placeholder="Password" value={password} onChange={changePassword} password />
                    <FormInput placeholder="Confirm Password" value={confirmPassword} onChange={changeConfirmPassword} password />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <button className="w-full h-[50px] bg-blue-500 rounded-md text-white font-bold" type="submit">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPopup;
