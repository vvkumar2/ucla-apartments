import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterPopup from "../components/register-popup";
import Navbar from "../components/navbar";
import FormInput from "../components/form-input";

import useUserContext from "../context/user.context";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

// Creating a new Supabase client using the URL and anon key from the environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This is the Login page component that renders the login form and allows user to login to their account.
const Login = () => {
    const { login } = useUserContext();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    function changeEmail(event) {
        setEmail(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    // This function is called when the user clicks the login button. It calls the Supabase auth API to login the user.
    async function LoginHandler(event) {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            toast.error(error.message);
        } else {
            setIsSignedIn(true);
            login(email, "", "");
        }
    }

    // This function is called when the user clicks the forgot password button. It calls the Supabase auth API to send a password reset email to the user.
    async function handleForgotPasswordClick() {
        if (email === "") {
            toast.error("To reset your password, first enter your email address.");
        } else {
            // await supabase.auth.resetPasswordForEmail(String(email), { redirectTo: "http://localhost:3000/reset-password" });
            toast.success("Check your email for a password reset link!");
        }
    }

    if (isSignedIn) {
        return <Navigate to={{ pathname: "/profile" }} />;
    }

    // This function is called when the user clicks the create account button. It opens the create account popup.
    function createAccountPopUp() {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Navbar />
            <div className="h-screen flex justify-center items-center">
                <form onSubmit={LoginHandler} className="flex flex-col items-center bg-white rounded-xl p-10 shadow-standard gap-6 w-[550px]">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <div className="w-full flex flex-col items-center gap-3">
                        <FormInput placeholder="Email" value={email} onChange={changeEmail} />
                        <FormInput placeholder="Password" value={password} onChange={changePassword} password />
                    </div>
                    <div className="flex justify-end w-full">
                        <span className="text-blue-700 cursor-pointer" onClick={handleForgotPasswordClick}>
                            Forgot password?
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <button className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 rounded-md text-white font-bold" type="submit">
                            Login
                        </button>
                        <span className="text-md text-gray-400 pointer hover:underline cursor-pointer text-center" onClick={createAccountPopUp}>
                            Create a new account
                        </span>
                    </div>
                </form>
                {isOpen && <RegisterPopup handleClose={createAccountPopUp} />}
                <ToastContainer hideProgressBar={true} />
            </div>
        </div>
    );
};

export default Login;
