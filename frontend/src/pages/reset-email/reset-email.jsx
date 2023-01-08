import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { createClient } from '@supabase/supabase-js'
import { Navigate } from "react-router-dom";

import "./reset-email.styles.css"

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ResetEmail = () => {    
    const queryParameters = new URLSearchParams(window.location.search)

    const emails = queryParameters.get("emails").split("?")
    const oldEmail = emails[0]
    const newEmail = emails[1]

    const [clicked, setClicked] = React.useState(false)

    async function resetToLogin () {
        const { error } = await supabase
            .from('users')
            .update({email: newEmail})
            .eq('email', oldEmail);
        
        console.log(error)
        setClicked(true)
    }

    if (clicked) {
        return <Navigate to={{ pathname: "/login" }} />;
    }

    return (
        <div className="reset-email-section">
            <Navbar />
            <div className="reset-email-container">
                <h1 className="reset-email-header">New Email Confirmed</h1>
                <h1 className="reset-email-to-login" onClick={resetToLogin}>Back to Login Page</h1>
            </div>
        </div>
    );
};

export default ResetEmail;

