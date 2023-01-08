import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { createClient } from '@supabase/supabase-js'
import { Link } from "react-router-dom";

import "./reset-password.styles.css"

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ResetPassword = () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = useState('');


    function changeConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    async function ResetHandler (event) {
        if (confirmPassword !== password) {
            setError("Password fields do not match")
        }
        else {
            const { data, error } = await supabase.auth.updateUser({
                password: confirmPassword,
            })
    
            if (data) {
                setError("Password updated successfully!")
            }
            if (error) {
                setError("There was an error updating your password.")
            }
        }
    }

    
    return (
        <div className="reset-section">
            <Navbar />
            <div className="reset-container">
                <div className="reset-form-container">
                    <div className="reset-box-top">
                        <h1>Reset Password</h1>
                    </div>
                    <div className="reset-form">
                    <input
                        className="reset-password"
                        type="password"
                        placeholder="New Password"
                        onChange={changePassword}
                        value={password}
                    />

                    <input
                        className="reset-conf-password"
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={changeConfirmPassword}
                        value={confirmPassword}
                    />
                    </div>
                <button
                    type="submit"
                    className="submit-button-reset"
                    onClick={ResetHandler}
                >Reset</button>
                {error!=="" && <p style={{marginTop: "5%", color: "#FF6961"}}>{error}</p>}
                <h1 className="reset-to-login"><Link to="/login">Back to Login Page</Link></h1>
                </div>
            </div>
            
        </div>
    );
};

export default ResetPassword;

