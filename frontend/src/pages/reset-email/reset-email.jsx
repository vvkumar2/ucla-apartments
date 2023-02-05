import React from "react";
import Navbar from "../../components/navbar";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";
import "./reset-email.styles.css";

//Creating a client for the supabase database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ResetEmail = () => {
    const [clicked, setClicked] = React.useState(false);

    // Get the emails from the url parameters and split them
    const queryParameters = new URLSearchParams(window.location.search);
    const emails = queryParameters.get("emails").split("?");
    const oldEmail = emails[0];
    const newEmail = emails[1];

    // Update the user's email in the database to the new email
    async function resetToLogin() {
        const { error } = await supabase.from("users").update({ email: newEmail }).eq("email", oldEmail);

        console.log(error);
        setClicked(true);
    }

    // If the user clicks the button, redirect them to the login page
    if (clicked) {
        return <Navigate to={{ pathname: "/login" }} />;
    }

    return (
        <div className="reset-email-section">
            <Navbar />
            <div className="reset-email-container">
                <h1 className="reset-email-header">New Email Confirmed</h1>
                <h1 className="reset-email-to-login" onClick={resetToLogin}>
                    Back to Login Page
                </h1>
            </div>
        </div>
    );
};

export default ResetEmail;
