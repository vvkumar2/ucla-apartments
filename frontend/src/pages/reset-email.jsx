import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";

//Creating a client for the supabase database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ResetEmail = () => {
    // Get the emails from the url parameters and split them
    const queryParameters = new URLSearchParams(window.location.search);
    const emails = queryParameters.get("emails").split("?");
    const oldEmail = emails[0];
    const newEmail = emails[1];

    const [ranOnce, setRanOnce] = React.useState(false);

    // Update the user's email in the database to the new email
    useEffect(() => {
        resetToLogin();
    }, []);

    async function resetToLogin() {
        const { error } = await supabase.from("users").update({ email: newEmail }).eq("email", oldEmail);
        console.log(error);
        if (error) {
            toast.error(error.message);
        }
        else {
            toast.success("Email successfully updated!");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="h-screen flex flex-col gap-8 justify-center items-center">
                <h1 className="text-2xl font-bold">New Email Confirmed</h1>
                <h1 className="text-md text-gray-400 pointer hover:underline cursor-pointer text-center" onClick={() => { return <Navigate to={{ pathname: "/login" }} /> } }>Back to Login Page</h1>
            </div>
            <ToastContainer hideProgressBar={true} />
            <Footer />
        </div>
    );
};

export default ResetEmail;
