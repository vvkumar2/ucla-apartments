import React, { useState } from "react";
import RegisterPopup from "../../components/register-popup-component/register-popup-component";
import Navbar from "../navbar/navbar";
import useUserContext from "../../context/user.context";
import { createClient } from '@supabase/supabase-js'
import { Navigate } from "react-router-dom";
import './login.styles.css'

// Creating a new Supabase client using the URL and anon key from the environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// This is the Login page component that renders the login form and allows user to login to their account.
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

    // This function is called when the user clicks the login button. It calls the Supabase auth API to login the user.
    async function LoginHandler(event) {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
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

    // This function is called when the user clicks the forgot password button. It calls the Supabase auth API to send a password reset email to the user.
    async function onClickReset ()  {
        if (email === "") {
            setError("To reset password, first enter your email above")
        }
        else {
            await supabase.auth.resetPasswordForEmail(
                String(email),
                { redirectTo: "http://localhost:3000/reset-password" }
            )
            setError("Email sent!")
        }
    }

    if (isSignedIn) {
        return <Navigate to={{ pathname: "/profile" }} />;
    }

    // This function is called when the user clicks the create account button. It opens the create account popup.
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
        {isOpen && <RegisterPopup handleClose={createAccountPopUp}
        />}
    </div>
  );
};

export default Login;
