import React, { useState } from "react";
import './register-popup-component.styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { createClient } from '@supabase/supabase-js'
import useUserContext from "../../context/user.context";
import { Navigate } from "react-router-dom";

// Creating a client for Supabase using the URL and anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)


const RegisterPopup = ({handleClose}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [err, setError] = useState('');
    const { login } = useUserContext();


    // function to handle the registration of a new user
    const Register = async (event) => {
        event.preventDefault();
        if (firstName==="" || lastName==="") {
            setError("Please enter first and last name")
        }
        else if (password!==confirmPassword) {
            setError("Password fields do not match")
        }
        else {
            const { data, error } = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                    options: {
                        data: {
                            first_name: firstName,
                            last_name: lastName
                        },
                    },
                });

            if (error) {
                setError(error.message)
            }
            else {
                console.log(data)
                setError("")
                login(email, firstName, lastName)
                setIsSignedIn(true)

            }
        }
    }

    // function to handle the login of an existing user
    if (isSignedIn) {
        return <Navigate to={{ pathname: "/profile" }} />;
    }

    // functions to set the state of the input fields
    function changeFirstName(event) {
        setFirstName(event.target.value)
    }

    function changeLastName(event) {
        setLastName(event.target.value)
    }

    function changeEmail(event) {
        setEmail(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    function changeConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }

  return (
    <div className="popup-box-container">
      <div className="popup-box">
        <div className="popup-box-top">
            <h1>Sign Up</h1>
            <div className="popup-close-icon" onClick={handleClose}><FontAwesomeIcon icon={faX} /></div>
        </div>
        <form className="register-form" onSubmit={Register}>
            <div className="register-name-email-form">
                <div className="register-name-form">
                    <input
                        className="register-first-name"
                        type="text"
                        placeholder="First Name"
                        onChange={changeFirstName}
                        value={firstName}
                    />
                    <input
                        className="register-last-name"
                        type="text"
                        placeholder="Last Name"
                        onChange={changeLastName}
                        value={lastName}
                    />
                </div>
                <input
                    className="register-email"
                    type="text"
                    placeholder="Email"
                    onChange={changeEmail}
                    value={email}
                />
            </div>
            <div className="register-user-password-form">
                <input
                    className="register-password"
                    type="password"
                    placeholder="Password"
                    onChange={changePassword}
                    value={password}
                />
                <input
                    className="register-confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={changeConfirmPassword}
                    value={confirmPassword}
                />
            </div>
            <p style={{paddingBottom: "30px", color: "#FF6961"}}>{err}</p>
            <input
                type="submit"
                className="register-submit-button"
                value="Create Account"
            />
        </form>
      </div>
    </div>
  );
};
 
export default RegisterPopup;