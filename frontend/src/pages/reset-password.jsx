import React, { useState } from "react";
import Navbar from "../components/navbar";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";

import FormInput from "../components/form-input";

// Creating a client for the supabase database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ResetPassword = () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    function changeConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    // Update the user's password in the database to the new password
    async function ResetHandler(event) {
        if (confirmPassword !== password) {
            toast.error("Passwords do not match!");
        } else {
            const { data, error } = await supabase.auth.updateUser({
                password: confirmPassword,
            });

            if (data) {
                toast.success("Password reset successful!");
            }
            if (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="reset-section">
            <Navbar />
            <div className="h-screen flex justify-center items-center">
                <form onSubmit={ResetHandler} className="flex flex-col items-center bg-white rounded-xl p-10 shadow-standard gap-6 w-[550px]">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <div className="w-full flex flex-col items-center gap-3">
                        <FormInput placeholder="New Password" value={password} onChange={changePassword} />
                        <FormInput placeholder="Confirm New Password" value={confirmPassword} onChange={changeConfirmPassword} password />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <button className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 rounded-md text-white font-bold" type="submit">
                            Reset
                        </button>
                        <h1 className="text-md text-gray-400 pointer hover:underline cursor-pointer text-center">
                            <Link to="/login">Back to Login Page</Link>
                        </h1>
                    </div>
                </form>
            </div>
            <ToastContainer hideProgressBar={true} />
            <Footer />
        </div>
    );
};

export default ResetPassword;
