import React, { useState } from "react";
import Popup from "../../components/popup-component/popup-component";
import Navbar from "../navbar/navbar";
import './login.styles.css'
import { createClient } from '@supabase/supabase-js'
import useUserContext from "../../context/user.context";
import { Navigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const Login = () => {
    const {login} = useUserContext()

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");

    const [isSignedIn, setIsSignedIn] = React.useState(false);


    function changeEmail(event) {
        setEmail(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    async function LoginHandler(event) {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })
        if (error) {
            setError("Try again: " + error.message)
        }
        else {
            setIsSignedIn(true)
            login(email, "", "")
            setError("")  
        }
    }

    async function onClickReset ()  {
        if (email === "") {
            setError("To reset password, first enter your email above")
        }
        else {
            const { data, error } = await supabase.auth.resetPasswordForEmail(
                String(email),
                { redirectTo: "http://localhost:3000/reset-password" }
            )
            setError("Email sent!")
        }
    }

    if (isSignedIn) {
        return <Navigate to={{ pathname: "/profile" }} />;
    }

    function createAccountPopUp() {
        setIsOpen(!isOpen)
    }

    return (
    <div className="login-section">
        <Navbar />
        <div className="login-container">
            <div className="login-text">
                <h1>Website Name</h1>
                <h2>Helping students find their perfect home.</h2>
            </div>
            <div className="login-form-container">
                <form className="login-form" onSubmit={LoginHandler}>
                    <input
                        className="login-username"
                        type="text"
                        placeholder="Email"
                        onChange={changeEmail}
                        value={email}
                    />

                    <input
                        className="login-password"
                        type="password"
                        placeholder="Password"
                        onChange={changePassword}
                        value={password}
                    />
                    <input
                        type="submit"
                        className="submit-button"
                        value="Log In"
                    ></input>
                    <p className="forgot-password-button" onClick={onClickReset}>Forgot Password?</p>
                    {error!=="" && <p style={{ marginTop: "15px", color: "#FF6961", fontWeight: "bold"}}>{error}</p>}
                </form>
                <button 
                    className="create-account-button"
                    type="button" 
                    onClick={createAccountPopUp}
                >
                    Create New Account
                </button>
            </div>
        </div>
        {isOpen && <Popup handleClose={createAccountPopUp}
        />}
    </div>
  );
};

export default Login;
