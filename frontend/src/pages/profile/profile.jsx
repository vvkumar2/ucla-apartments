import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import useUserContext from "../../context/user.context";
import { createClient } from '@supabase/supabase-js'
import { Navigate } from "react-router-dom";
import './profile.styles.css'

// Creating a client for the supabase database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Profile page component that displays user information
const Profile = () => {
    const [firstName, setFirstName] = useState(useUserContext().firstName);
    const [lastName, setLastName] = useState(useUserContext().lastName);
    const [email] = useState(useUserContext().email);
    const [dateRegistered, setDateRegistered] = useState("");
    const [changingEmail, setChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("")
    const [error, setError] = useState("");
    const { login, loggedIn, logout } = useUserContext()


    function emailChangeHandler (event) {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setNewEmail(searchFieldString);
    }

    // Function that handles the reset email button
    async function onClickResetEmail ()  {
        setError("")

        if (newEmail === "") {
            setError("There was an error initiating email change: reload page and try again.")
        }
        else {
            const { error } = await supabase.auth.updateUser(
                { email: String(newEmail) },
                {
                    redirectTo: "http://localhost:3000/reset-email"
                }
            )
            if (error) {
                setError(error)
            }
            else {
                setError("Confirmation email sent to new email address! Must confirm email or else you will not be able to sign in again.")
            }
        }
    }

    // Function that handles the reset password button
    async function onClickResetPassword ()  {
        setChangingEmail(false)
        setError("")
        if (email === "") {
            setError("There was an error initiating password change: reload page and try again.")
        }
        else {
            const { error } = await supabase.auth.resetPasswordForEmail(
                String(email),
                { redirectTo: "http://localhost:3000/reset-password" }
            )
            if (error) {
                setError(error)
            }
            else {
                setError("Email sent! Follow link in email to continue.")
            }
        }
        console.log(error)
    }

    // On page load, fetch the user's name and other info from the database and set the state
    useEffect(() => {
        async function fetchName (event) {
            if (firstName === "" && lastName === "" && loggedIn) {
                const { data, error } = await supabase
                    .from('users')
                    .select('first_name, last_name, time_registered')
                    .eq('email', email);
            
                if (error) {
                    console.log(error)
                    setFirstName("")
                    setLastName("")
                }
                else {
                    console.log(data)
                    setFirstName(data[0].first_name)
                    setLastName(data[0].last_name)
                    
                    const time_registered = data[0].time_registered.split("-")
                    const year_registered = time_registered[0]
                    const month_registered_number = time_registered[1]

                    const date = new Date();
                    date.setMonth(month_registered_number - 1);
                    const month_registered_name = date.toLocaleString('en-US', { month: 'long' });


                    setDateRegistered(month_registered_name + " " + year_registered)
                    console.log(dateRegistered)
                    login(email, firstName, lastName)
                }
            }
        }
            fetchName()
    }, [dateRegistered, email, firstName, lastName, loggedIn, login])

    // If the user is not logged in, redirect to the login page
    if (!loggedIn) {
        return <Navigate to={{ pathname: "/login" }} />;
    }

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-content-container">
                <div className="profile-header-container">
                    <div className="profile-first-row">
                        <h1 className="profile-name">{firstName} {lastName}</h1>
                        <div className="profile-logout" onClick={() => {logout(); supabase.auth.signOut();}}>Logout</div>
                    </div>
                    <div className="profile-second-row">
                        <h2 className="profile-email-registered">{email}</h2>
                        { dateRegistered!=="" && <h2 className="profile-date-registered">Member since: {dateRegistered}</h2>}
                    </div>
                </div>
                <div className="profile-info-change">
                    <h2 className="profile-change-email" onClick={() => {setChangingEmail(!changingEmail); setError("");}}>Change Email</h2>
                    <h2 className="profile-change-password" onClick={onClickResetPassword}>Change Password</h2>
                </div>
                {changingEmail && 
                    <div className="email-box">
                        <input
                            className="enter-email-box"
                            type="email"
                            placeholder="Enter New Email"
                            onChange={emailChangeHandler}
                        />
                        <div className="submit-email-box" onClick={onClickResetEmail}>Submit</div>
                    </div>
                }
                {error && <p style={{ marginBottom: "30px", color: "#FF6961", fontWeight: "bold"}}>{String(error)}</p>}
            </div>
        </div>
    );
};

export default Profile;

